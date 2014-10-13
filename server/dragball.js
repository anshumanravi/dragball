 balls=new Meteor.Collection('balls');
 
 Meteor.publish('balls', function () {
   return balls.find({}, {sort: {seq: -1}, limit: 10});
 });

 


Meteor.methods({

	dropball: function(id){
		balls.update(id,{$set: {'dropped': '1'}})
	},
	resetball: function(){
		balls.update({},{$set: {'dropped': '0'}}, {multi:true});
	}

});