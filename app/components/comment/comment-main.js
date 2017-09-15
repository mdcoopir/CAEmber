import Ember from 'ember';

export default Ember.Component.extend({
  isAdding: false,
  actions: {
    toggleAdding() {
      this.toggleProperty('isAdding');
    },
    addComment(comment, post) {
      this.sendAction('addComment', comment, post);
    }
  }
});
