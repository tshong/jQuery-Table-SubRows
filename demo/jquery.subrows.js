/***************************************************************************
Copyright (C) <2011> by <@Lava-Falls a.k.a. Matt Lavallee>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*****************************************************************************/

(function ($) {

    $.fn.SubRows = function (options) {

        // Default Settings, can be overridden if an options map is passed in
        var settings = {
            subrowClass: 'lf_subRow'
	   ,iconClass: 'lf_toggle_icon'
	   ,activeClass: 'lf_active'
  	   ,defaultClass: 'lf_default'
	   ,emptyClass: 'lf_empty'
	   ,speed: 'fast'
           ,subRowWrapperClass: 'lf_slide'
        };
		
	var parentClass = 'lf_parentRow';
		
	var methods = {
	    rowsChecked: false
	   ,CheckRows: function(table, settings){
	        table.children("tr").map(function(){
		    if($(this).hasClass(parentClass) == false && $(this).prev("tr").hasClass(parentClass) == false){
		        if($(this).find("td:first").find(methods.jQueryClass(settings.emptyClass)).length == 0)
			    $(this).find("td:first").prepend('<span class="' + settings.iconClass + ' ' + settings.emptyClass + '"></span>');
		    }
		});
		methods.rowsChecked = true;
	    }
	   ,jQueryClass: function(className){
	        return '.' + className;
	    }
	};
		
		
	this.addClass(parentClass);
	var empty = this.find(methods.jQueryClass(settings.emptyClass));
	empty.remove();
		
        return this.each(function () {
            var defaults = settings;
            if (options)
                defaults = $.extend({}, settings, options);
			
            var obj = $(this);
			
	    if(!methods.rowsChecked)
	        methods.CheckRows(obj.closest("tbody"), defaults);
				
	    obj.find("td:first").prepend('<span class="' + defaults.iconClass + ' ' + defaults.defaultClass + '"></span>');
	    obj.next("tr").addClass(defaults.subrowClass);
	    obj.next("tr").find("td:first").wrapInner('<div class="' + defaults.subRowWrapperClass + '" />');
			
            $(this).find(methods.jQueryClass(defaults.iconClass)).bind("click", function () {
                var isCollapsed = $(this).hasClass(defaults.defaultClass);
                if (isCollapsed) {
		    $(this).removeClass(defaults.defaultClass);
		    $(this).addClass(defaults.activeClass);

                    obj.next(methods.jQueryClass(defaults.subrowClass))
		       .css("display", "table-row")
                       .find(methods.jQueryClass(defaults.subRowWrapperClass))
                       .slideToggle(defaults.speed, function () { });
                }
                else {
                    $(this).removeClass(defaults.activeClass);
		    $(this).addClass(defaults.defaultClass);

                    obj.next(methods.jQueryClass(defaults.subrowClass))
                       .find(methods.jQueryClass(defaults.subRowWrapperClass))
                       .slideToggle(defaults.speed, function () {
			    obj.next(methods.jQueryClass(defaults.subrowClass)).css("display", "none");
                       });
                }
            });
        });
    };
})(jQuery);
