/*
 * Object
 */

 var Slick = {
 	setRepo: function(repo) {
 		this.gitRepo = repo;
 	},
 	setUser: function(user) {
 		this.gitUser = user;
 	},

 	setPlugins: function(plugins) {
 		this.plugins = plugins;
 	},

 	setEnv: function() {
 		this.setUser(arguments[0]);
 		this.setRepo(arguments[1]);
 		this.setPlugins(Array.prototype.slice.call(arguments, 2));

 		getAllEntriesMetadataToCache(function() {
 			asyncExecuter(Slick.plugins);
 		});
 	}
 };


 function asyncExecuter(listPlugins) {
 	for(var i=0; i<listPlugins.length; i++) {
 		actualPlugin = listPlugins[i];
 		var pluginName = actualPlugin["pluginName"];
 		var pluginArgs=getArgsPlugin(actualPlugin);
		//execute plugin with its arguments

		window[[pluginName]](pluginArgs, addToDOM);

	}
};

function getArgsPlugin(pluginObject) {
	args = [];
	var index = "pluginName";
	for(var key in pluginObject) {
		if(index=="pluginName") {
			index="pluginArgs";
			continue;
		};
		args.push(pluginObject[key]);
	}
	return args;
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

}


function appendData(appendHandler, data) {
	$(appendHandler).children().remove();
	$(appendHandler).append(data).hide().fadeIn(500);
}

function getWrapperFromTemplate(templatePath, callback) {
	var file = '';
	$.ajax({
		type: 'GET',
		url: "templates/"+templatePath,
		success: function (wrapper) {
			callback(wrapper);
		}
	});
}
