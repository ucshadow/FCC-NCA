import { Mongo } from 'meteor/mongo';

export const GoingOut = new Mongo.Collection('goingOut');


if(Meteor.isServer) {

  function resetDatabaseAtMidNight() {
  Meteor.setInterval(function() {
    let now = new Date().getHours();
    if(now > 23) {
      GoingOut.remove({});
    }
  }, 1000 * 60 * 60)
}

resetDatabaseAtMidNight();
}