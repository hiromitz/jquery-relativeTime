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

'use strict';

function calcDist(from) {
	var date = new Date().setTime(Date.parse(from)),
		sec = ((new Date() - date) / 1000) / 60;
	return Math.floor(sec);
}

$.relativeTime = function(elem, op) {
	op = $.extend({}, true, $.relativeTime.defaults, op);

	var timeout,
		datetime = $(elem).attr(op.attr),
		negdist = calcDist(datetime), //use this to calculate past / future.
		dist = Math.abs(negdist),
		text = (dist < 2) ? op.i18n.min :
			(dist < 45) ? i18n('mins', negdist) :
			(dist < 90) ? op.i18n.hour :
			(dist < 1440) ? i18n('hours', negdist / 60) :
			(dist < 2880) ? op.i18n.day :
			(dist < 43200) ? i18n('days', negdist / 1440) :
			(dist < 86400) ? op.i18n.month :
			(dist < 525960) ? i18n('months', negdist / 43200) :
			(dist < 1051199) ? op.i18n.year :
			i18n('years', negdist / 525960),

		t = (dist < 45) ? 60000 :
			(dist < 2880) ? 60000 * 60 :
			0;

	if(0 < t && op.autoRefresh) {
		timeout = setTimeout(function() {
			clearTimeout(timeout);
			$.relativeTime($(elem));
		}, t);
	}

	$(elem).text(text);

	function i18n(key, negdist) {
		var i18nText = op.i18n[key].replace(/%d/i, Math.floor(Math.abs(negdist)));
		//Different display options if time is in past or future.			
		(negdist < 0) ? i18nText += op.i18n.until : i18nText += op.i18n.ago;
		
		return i18nText;
	}
};

$.relativeTime.defaults = {
	attr: 'datetime',
	autoRefresh: true,
	i18n: {
		ago: ' ago',
		until: ' until',
		min: 'a minute',
		mins: '%d minutes',
		hour: 'an hour',
		hours: '%d hours',
		day: '1 day',
		days: '%d days',
		month: '1 month',
		months: '%d months',
		year: '1 year',
		years: '%d years'
	}
};

$.fn.relativeTime = function(op) {
	return this.each(function(op) {
		$.relativeTime(this, op);
	});
};

})(jQuery);