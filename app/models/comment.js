import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  message: DS.attr('string'),
  post: DS.belongsTo("post"),
  parent: DS.belongsTo('comment', {inverse: 'comments'}),
  comments: DS.hasMany('comment', {inverse: 'parent'}),
  numSubComments: Ember.computed('comments.@each.numComments', function() {
    return this.get('comments').map((comment) => {
      return (parseInt(comment.get('numComments')) || 0);
    });
  }),
  numComments: Ember.computed('comments.@each', function() {
    return this.get('comments').content.length + (parseInt(this.get('numSubComments')) || 0);
  })
});
