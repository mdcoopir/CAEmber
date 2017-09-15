import Ember from 'ember';

export default Ember.Component.extend({
  isEditting: false,
  actions: {
    addComment(comment, parent) {
      this.sendAction('addComment', comment, parent);
    },
    toggleIsEditting(){
        this.toggleProperty('isEditting');
    },
  }
});
