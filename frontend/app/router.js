import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about',{path: '/about'});
  this.route('maps');

  this.route('bezirk', function() {
  	this.route('demographie', { path: '/demographie/:id' });
    this.route('demographie');

  });
  this.route('ebene', { path: '/ebene' });

  this.route('ebene', { path: '/ebene/:ebene_id' }, function() {
    this.route('data/demographie', { path: '/demographie/:demographie_id' });
    this.route('data/demographie', { path: '/demographie/' });
    
  });

  
});

export default Router;
