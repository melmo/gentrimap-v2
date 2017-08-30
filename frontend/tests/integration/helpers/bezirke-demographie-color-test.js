
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bezirke-demographie-color', 'helper:bezirke-demographie-color', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{bezirke-demographie-color inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

