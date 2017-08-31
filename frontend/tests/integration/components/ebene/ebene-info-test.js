import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ebene/ebene-info', 'Integration | Component | ebene/ebene info', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ebene/ebene-info}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ebene/ebene-info}}
      template block text
    {{/ebene/ebene-info}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
