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
		dist = calcDist(datetime),
		text = (dist < 2) ? op.i18n.min :
			(dist < 45) ? i18n('mins', dist) :
			(dist < 90) ? op.i18n.hour :
			(dist < 1440) ? i18n('hours', dist / 60) :
			(dist < 2880) ? op.i18n.day :
			(dist < 43200) ? i18n('days', dist / 1440) :
			(dist < 86400) ? op.i18n.month :
			(dist < 525960) ? i18n('months', dist / 43200) :
			(dist < 1051199) ? op.i18n.year :
			i18n('years', dist / 525960),

		t = (dist < 45) ? 60000 :
			(dist < 2880) ? 60000 * 60 :
			0;

	if(0 < t && op.autoRefresh) {
		timeout = setTimeout(function() {
			clearTimeout(timeout);
			if($(elem).closest("body").length > 0) {$.relativeTime(elem); }
		}, t);
	}

	$(elem).text(text);

	function i18n(key, dist) {
		return op.i18n[key].replace(/%d/i, Math.floor(dist));
	}
};

$.relativeTime.defaults = {
	attr: 'datetime',
	autoRefresh: true,
	i18n: {
		min: 'a minute ago',
		mins: '%d minutes ago',
		hour: 'an hour ago',
		hours: '%d hours ago',
		day: '1 day ago',
		days: '%d days ago',
		month: '1 month ago',
		months: '%d months ago',
		year: '1 year ago',
		years: '%d years ago'
	}
};

$.fn.relativeTime = function(op) {
	return this.each(function(op) {
		$.relativeTime(this, op);
	});
};

})(jQuery);
