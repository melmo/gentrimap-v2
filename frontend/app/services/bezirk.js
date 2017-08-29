import Ember from 'ember';

export default Ember.Service.extend({
	bezirkeState: null,

	init() {
		console.log('service init');
	    this._super(...arguments);
	    this.set('bezirkeState', Ember.Object.create({
	      	dataSet : null,
	      	dataAttr : null,
	      	year : null,
	      	bezirk : null
	    }));
	},
	setBezirk(bezirk) {
		this.get('bezirkeState').set('bezirk',bezirk);
	},
	setDataSet(dataSet) {
		this.get('bezirkeState').set('dataSet',dataSet);
	},
	setDataAttr(dataAttr) {
		this.get('bezirkeState').set('dataAttr',dataAttr);
	},
	setYear(year) {
		this.get('bezirkeState').set('year',year);
	}
});
