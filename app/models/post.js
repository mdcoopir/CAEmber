import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  comments: DS.hasMany('comments'),
  numPostComments: Ember.computed('comments@each', function() {
    return this.get('comments').content.length + (parseInt(this.get('numComments')) || 0);
  }),
  numComments: Ember.computed('comments.@each.numComments', function() {
    return this.get('comments').map((comment) => {
      return (parseInt(comment.get('numComments')) || 0);
    });
  }),

});
