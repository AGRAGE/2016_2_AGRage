(function () {
	'use strict';

	class Cookie {


		constructor ( name, value, exp_y, exp_m, exp_d, path, domain, secure )
		{
		  var cookie_string = name + "=" + escape ( value );
		 
		  if ( exp_y )
		  {
		    var expires = new Date ( exp_y, exp_m, exp_d );
		    cookie_string += "; expires=" + expires.toGMTString();
		  }
		 
		  if ( path )
		        cookie_string += "; path=" + escape ( path );
		 
		  if ( domain )
		        cookie_string += "; domain=" + escape ( domain );
		  
		  if ( secure )
		        cookie_string += "; secure";

		  document.cookie = cookie_string;
		}


		get_cookie ( cookie_name )
		{
		  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
		 
		  if ( results )
		    return ( unescape ( results[2] ) );
		  else
		    return null;
		}


	}

	window.Cookie = Cookie
})();


