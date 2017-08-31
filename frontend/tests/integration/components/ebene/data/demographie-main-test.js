import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ebene/data/demographie-main', 'Integration | Component | ebene/data/demographie main', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ebene/data/demographie-main}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ebene/data/demographie-main}}
      template block text
    {{/ebene/data/demographie-main}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
