import { GoingOut } from '../imports/api/userStatus'
import { Mongo } from 'meteor/mongo';


Meteor.methods({

  'goingOut.addMe'(user_, locationName) {

    let user = Meteor.users.findOne({_id: user_});
    if(user.username) {
      user = user.username;
    }
    else if(user.services.github.username) {
      user = user.services.github.username
    }

    let x = GoingOut.findOne({location: locationName});
    if(x) {
      let index = x.here.indexOf(user);
      let current = x.here;
      if(x.here.indexOf(user) >= 0){
        current.splice(index, 1);
        GoingOut.update(x._id, {
          $set: {here: current}
        });
        return false;
      } else {
        current.push(user);
        GoingOut.update(x._id, {
          $set: {here: current}
        });
        return true;
      }
    } else {
      GoingOut.insert({location: locationName, here: [user]})
    }
  },

  'changeName'() {
    let u = Meteor.users.findOne({_id: Meteor.userId()});
    if(u.services.github) {
      return u.services.github.username
    }
    return null;
  },

  'amI'(user_, locationName) {

    let user = Meteor.users.findOne({_id: user_});
    if(user.username) {
      user = user.username;
    }
    else if(user.services.github.username) {
      user = user.services.github.username
    }

    let x = GoingOut.findOne({location: locationName});
    if(x) {
      let c = x.here;
      return c.indexOf(user) >= 0;
    } else {
      return false
    }


  }

});