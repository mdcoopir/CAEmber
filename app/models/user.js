import DS from 'ember-data';
import {hasMany} from 'ember-data/relationships';

export default DS.Model.extend({
  email: DS.attr('string'),
  displayName: DS.attr('string'),
  password: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  altEmail: DS.attr('string'),
  posts: hasMany(),
  remember: DS.attr('string')
});
