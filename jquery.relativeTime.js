/**
 * Relative Time - Plugin for jQuery
 * make time as relative
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Depends:
 *   jquery.js
 * 
 * Author: hiromitz ( http://github.com/hiromitz )
 * 
 */
;(function($) {

Number.prototype.floor = function() {
	return Math.floor(this);
};

$.fn.relativeTime = function(op) {
	
	op = $.extend({}, true, {
		attr: 'datetime',
		autoRefresh: true,
		i18n: {
			min: 'a minute ago',
			mins: ' minutes ago',
			hour: 'an hour ago',
			hours: ' hors ago',
			day: '1 day ago',
			days: ' days ago',
			month: '1 month ago',
			months: ' months ago',
			year: '1 year ago',
			years: ' years ago'
		}
	}, op);
	
	return this.each(function() {
		relativeTime(this);
	});
	
	function relativeTime(elem) {
		var timeout,
			datetime = $(elem).attr(op.attr),
			dist = calcDist(datetime),
			text = (dist < 2) ? op.i18n.min :
				(dist < 45) ? dist + op.i18n.mins :
				(dist < 90) ? op.i18n.hour :
				(dist < 1440) ? (dist / 60).floor() + op.i18n.hours :
				(dist < 2880) ? op.i18n.day :
				(dist < 43200) ? (dist / 1440).floor() + op.i18n.days :
				(dist < 86400) ? op.i18n.month :
				(dist < 525960) ? (dist / 43200).floor() + op.i18n.months :
				(dist < 1051199) ? op.i18n.year :
				(dist / 525960).floor() + op.i18n.years,
			
			t = (dist < 45) ? 60000 :
				(dist < 2880) ? 60000 * 60 :
				0;
		
		if(0 < t && op.autoRefresh) {
			timeout = setTimeout(function() {
				clearTimeout(timeout);
				relativeTime(elem);
			}, t);
		}
		
		$(elem).text(text);
	}
	
	function calcDist(from) {
		var date = new Date;
		date.setTime(Date.parse(from));
		
		var sec = ((new Date - date) / 1000) / 60;
		return sec.floor();
	}
	
	
};

})(jQuery);