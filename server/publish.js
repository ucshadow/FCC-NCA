import { GoingOut } from '../imports/api/userStatus'


Meteor.publish('goingOut', function dbPublish() {
  return GoingOut.find();
});