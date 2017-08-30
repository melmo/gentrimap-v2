import Ember from 'ember';

export function bezirkeDemographieColor(params/*, hash*/) {
	let color = 'rgb(255,255,' + parseInt(Math.random() * 255) +')';
	console.log(color);
  return {color : color};
}

export default Ember.Helper.helper(bezirkeDemographieColor);
