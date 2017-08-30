import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ebene/ebene-map', 'Integration | Component | ebene/ebene map', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ebene/ebene-map}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ebene/ebene-map}}
      template block text
    {{/ebene/ebene-map}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
