(function() {
	'use strict';

	class Cookie {


		constructor(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
			var cookie_string = name + "=" + escape(value);

			if (exp_y) {
				var expires = new Date(exp_y, exp_m, exp_d);
				cookie_string += ";expires=" + expires.toGMTString();
			}

			if (path)
				cookie_string += ";path=" + escape(path);

			if (domain)
				cookie_string += ";domain=" + escape(domain);

			if (secure)
				cookie_string += ";secure";
			console.log(cookie_string);
			document.cookie = cookie_string;
			console.log(document.cookie);
		}

		setCookie(name, value, options) {
			options = options || {};

			var expires = options.expires;

			if (typeof expires == "number" && expires) {
				var d = new Date();
				d.setTime(d.getTime() + expires * 1000);
				expires = options.expires = d;
			}
			if (expires && expires.toUTCString) {
				options.expires = expires.toUTCString();
			}

			value = encodeURIComponent(value);

			var updatedCookie = name + "=" + value;

			for (var propName in options) {
				updatedCookie += "; " + propName;
				var propValue = options[propName];
				if (propValue !== true) {
					updatedCookie += "=" + propValue;
				}
			}

			document.cookie = updatedCookie;
		}

		deleteCookie() {
		  this.setCookie(window.cookieName, "", {
		    expires: -1
		  })
		}

		get_cookie(cookie_name) {
			var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

			if (results)
				return (unescape(results[2]));
			else
				return null;
		}


	}

	window.Cookie = Cookie
})();
