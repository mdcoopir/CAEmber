import Ember from 'ember';

export default Ember.Route.extend({
  casession: Ember.inject.service(),
  model() {
   return Ember.RSVP.hash({
     posts: this.store.query('post', {
       filter: {
         id: this.get('casession').currentUser.id
       }
     }),
     user: this.store.findRecord('user', this.get('casession').currentUser.id),
   });
 }
});
