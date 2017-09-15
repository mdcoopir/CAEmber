import Ember from 'ember';

export default Ember.Route.extend({
  model(param) {
    return Ember.RSVP.hash({
      post: this.store.findRecord('post', param.post_id),
      members: this.store.findAll('member')
    });
  }
});
