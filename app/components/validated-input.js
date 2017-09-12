import Ember from 'ember';

export default Ember.Component.extend({
  hasFocus: false,
  actions: {
    validateProperty(changeset, property){
      this.set('hasFocus', false);
      return changeset.validate(property);
    },
    setFocus() {
      this.set('hasFocus', true);
    }
  }
});
