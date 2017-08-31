import Ember from 'ember';
import Demographie from '../../../models/data/demographie';

export default Ember.Route.extend({
	model(params, transition) {
		return Ember.RSVP.hash({
	      ebene: this.modelFor('ebene'),
	      data : this.get('store').query('data/demographie',{path : 'ebene/' + transition.params.ebene.ebene_id + '/demographie/' + (params.demographie_id !== undefined ? params.demographie_id : '') }),
	      dataKey : this.get('store').queryRecord('key',{path : 'ebene/' + transition.params.ebene.ebene_id + '/demographie-key'}),
	      dataModel : Demographie
	     // dataMeta : min and max for year/property/ebene plus min and max year
	    });
	}
});
