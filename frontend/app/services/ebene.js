import Ember from 'ember';

export default Ember.Service.extend({
	ebeneState: null,

	init() {
	    this._super(...arguments);
	    this.set('ebeneState', Ember.Object.create({
	      	dataSet : null,
	      	dataAttr : null,
	      	year : null,
	      	raum : null
	    }));
	},
	setRaum(raum) {
		this.get('ebeneState').set('raum',raum);
	},
	setDataSet(dataSet) {
		this.get('ebeneState').set('dataSet',dataSet);
	},
	setDataAttr(dataAttr) {
		this.get('ebeneState').set('dataAttr',dataAttr);
	},
	setYear(year) {
		this.get('ebeneState').set('year',year);
	}
});