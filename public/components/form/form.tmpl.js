;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['form/form.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var data=__fest_context;__fest_buf+=("<form><div class=\"divform\">");try{__fest_attrs[0]=__fest_escapeHTML(data.titleClass)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<h1 class=\"" + __fest_attrs[0] + "\">");try{__fest_buf+=(__fest_escapeHTML(data.title))}catch(e){__fest_log_error(e.message + "4");}__fest_buf+=("</h1><div>");var i,field,__fest_to0,__fest_iterator0;try{__fest_iterator0=data.fields || [];__fest_to0=__fest_iterator0.length;}catch(e){__fest_iterator0=[];__fest_to0=0;__fest_log_error(e.message);}for(i=0;i<__fest_to0;i++){field=__fest_iterator0[i];try{__fest_attrs[0]=__fest_escapeHTML(field.class)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<div class=\"" + __fest_attrs[0] + "\">");try{__fest_attrs[0]=__fest_escapeHTML(field.type)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}try{__fest_attrs[1]=__fest_escapeHTML(field.name)}catch(e){__fest_attrs[1]=""; __fest_log_error(e.message);}try{__fest_attrs[2]=__fest_escapeHTML(field.placeholder)}catch(e){__fest_attrs[2]=""; __fest_log_error(e.message);}try{__fest_attrs[3]=__fest_escapeHTML(field.maxlength)}catch(e){__fest_attrs[3]=""; __fest_log_error(e.message);}try{__fest_attrs[4]=__fest_escapeHTML(field.minlength)}catch(e){__fest_attrs[4]=""; __fest_log_error(e.message);}try{__fest_attrs[5]=__fest_escapeHTML(field.required)}catch(e){__fest_attrs[5]=""; __fest_log_error(e.message);}__fest_buf+=("<input type=\"" + __fest_attrs[0] + "\" name=\"" + __fest_attrs[1] + "\" placeholder=\"" + __fest_attrs[2] + "\" maxlength=\"" + __fest_attrs[3] + "\" minlength=\"" + __fest_attrs[4] + "\" required=\"" + __fest_attrs[5] + "\"/></div>");}__fest_buf+=("</div>");var i,field,__fest_to1,__fest_iterator1;try{__fest_iterator1=data.controls || [];__fest_to1=__fest_iterator1.length;}catch(e){__fest_iterator1=[];__fest_to1=0;__fest_log_error(e.message);}for(i=0;i<__fest_to1;i++){field=__fest_iterator1[i];try{__fest_attrs[0]=__fest_escapeHTML(field.class)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<button class=\"" + __fest_attrs[0] + "\">");try{__fest_buf+=(__fest_escapeHTML(field.text))}catch(e){__fest_log_error(e.message + "16");}__fest_buf+=("</button>");}__fest_buf+=("</div></form>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();