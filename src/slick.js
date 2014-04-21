/*
 * Slick!
 *
 *  - powerfull serveless blog engine. High modular and light. 
 * You can have your blog running with only 3-steps configuration and no need 
 * for server-side code whatsoever. slick!! 
 */

var slick = (function () {
	
	//vars
	var cache = {};
	var routeURL ='';
	var plugins = {};
	var allEntriesMetadata ='';

	function init() {

		getRoute();

		//init all plugins & attach to slick
		for(var i=0; arguments.length>i; i++) {
			var nameNewPlugin = arguments[i];
			var newPlugin = new window[nameNewPlugin];
			//init cache
			cache[nameNewPlugin] = {};
			//add plugin
			plugins[nameNewPlugin] = newPlugin;

		}

		return {
			run: function() {
				var pluginName = arguments[0];
				var pluginArgs = arguments[1];
				var action = pluginArgs['action'];
				
				var f_init = window['slick']['plugins'][pluginName]['init'];
				var f_execute = window['slick']['plugins'][pluginName][action];

				//init and execute
				f_init(pluginArgs, f_execute);

				return this;
			} 
		}
	};


	function getRoute(){
		if (window.location.hash == '') {
			return;
		}
		var url = window.location.href.split("#")[0];
		var hash = window.location.href.split("#")[1];
		slick.routeURL = hash;
		if (window.history.pushState) {
			//pushState supported --> remove # from address
			window.history.pushState('','',url);
		}
	};


	function addToDOM(argsFromPlugin) {
		var data = argsFromPlugin[0];
		var templatePath = argsFromPlugin[1];
		var appendHandler = argsFromPlugin[2];

		getWrapperFromTemplate(templatePath, 
			function(wrapper) {	
				var finalContent ="";
				data.forEach(
					function(entry) {
						finalContent = finalContent.concat(wrapper);
						for (var key in entry) {
							finalContent = finalContent.replace("{{"+key+"}}", entry[key]);
						}
					});				
				appendData(appendHandler, finalContent);
			});

	};

	function appendData(appendHandler, data) {
		$(appendHandler).children().remove();
		$(appendHandler).append(data).hide().fadeIn(500);
	};

	function getWrapperFromTemplate(templatePath, callback) {
		var file = '';
		$.ajax({
			type: 'GET',
			url: "templates/"+templatePath,
			success: function (wrapper) {
				callback(wrapper);
			}
		});
	};



	//interface definition
	return {
		init: init,

		routeURL: routeURL,
		cache: cache,
		plugins: plugins,
		
		addToDOM: addToDOM
	};

})();