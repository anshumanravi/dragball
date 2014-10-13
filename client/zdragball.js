balls = new Mongo.Collection("balls");

Session.setDefault('dropcount',0);
Session.setDefault('totalball',0);


// client: subscribe to the count for the current room
Tracker.autorun(function () {
  Meteor.subscribe("balls");
  var dropballs = balls.find({dropped: '1'});
  var totalballs = balls.find({});
  Session.set('totalball', totalballs.count());
  Session.set('dropcount', dropballs.count());
});


Template.balls.balls = function () {
  return balls.find({dropped: { $ne: '1' }}, {sort: {seq: -1}, limit: 10});
};



Template.ball.rendered = function () {
  $( ".circle-ball" ).draggable({
  		containment : 'window',
  		cursor      : 'crosshair',
  		opacity     : '0.35',
  		start       : function(event,ui){
  			 $('#droppable').animate({
  			 	width:'110px',
  			 	height:'110px',
  			 	'border-radius':'55px',
  			 	'line-height':'110px'
  			 },100);
  		},

  		stop        : function(event,ui){
  			 $('#droppable').animate({
  			 	width:'96px',
  			 	height:'96px',
  			 	'border-radius':'48px',
  			 	'line-height':'96px'
  			 },100);
  		},

  });

  
};




Template.circle.rendered = function(){
	$( "#droppable" ).droppable({
      drop: function( event, ui ) {

          var ballid = ui.draggable.attr('mongoid');
			    ui.draggable.remove();
          Meteor.call('dropball', ballid, function (error, result) { console.log(result); } );

       		

       		Session.set('dropcount',dropcount);

       		
       		Session.set('progress',progress);



      }
	});
}







Template.progress.helpers({
	progress  : function(){
    var dropcount = Session.get('dropcount');
    var totalball = Session.get('totalball');
    var progress = (dropcount/totalball)*100;
		return progress;
	},
	dropcount : function(){
		return Session.get('dropcount');
	},
	totalball : function(){
		return Session.get('totalball');
	}

}); 


Template.reset.events = {
  'click #resetall': function(){
    Meteor.call('resetball');
  }
}



