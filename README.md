# Relative Time: a plugin for jQuery

jquery-relativeTime is a small lightweight jQuery plugin makes times easy to convert as relative like twitter, facebook (e.g. "6 minutes ago").

## Usage


```html
<script src="jquery.min.js"></script>
<script src="jquery.relativeTime.js"></script>
<script type="text/javascript">
   $(function() {
     $("time.relative").relativeTime();
   });
</script>

...

<time class="relative" datetime="Wed, 09 Aug 2013 01:23:45 GMT">Wed, 09 Aug 2013</time>
```

## Options

Default options

```javascript
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
```

* `attr` – The attribute name string.
* `autoRefresh` – true/false if set true, text will refresh.
* `i18n` - translation options

## License

* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses
