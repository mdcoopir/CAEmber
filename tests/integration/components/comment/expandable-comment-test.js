import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('comment/expandable-comment', 'Integration | Component | comment/expandable comment', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{comment/expandable-comment}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#comment/expandable-comment}}
      template block text
    {{/comment/expandable-comment}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
