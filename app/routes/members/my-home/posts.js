import Ember from 'ember';

export default Ember.Route.extend({
  casession: Ember.inject.service(),
  openNewPost: true,

  model() {
    return this.store.query('post', {
        filter: {
          user: this.get('casession.currentUser.id')
        }
      })

    //   this.get('casession.account').then(function(causer) {
    // }).catch((error)=> {
    //   return error;
    // })

  }
});
