import DS from 'ember-data';

export default DS.Model.extend({
	year: DS.attr('number'),// string, number, boolean, and date
	bezirk_id: DS.attr('number'),
	e_e: DS.attr('number'),
	e_em: DS.attr('number'),
	e_ew: DS.attr('number'),
	e_u1: DS.attr('number'),
	e_1u6: DS.attr('number'),
	e_6u15: DS.attr('number'),
	e_15u18: DS.attr('number'),
	e_18u25: DS.attr('number'),
	e_25u55: DS.attr('number'),
	e_55u65: DS.attr('number'),
	e_65u80: DS.attr('number'),
	e_80u110: DS.attr('number')
});
