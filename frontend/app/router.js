import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('maps');
  //this.route('bezirk');

  this.route('bezirk', function() {
    this.route('demographie');
  });
});

export default Router;
