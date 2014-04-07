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
		var retObj;
		retObj = window[[pluginName]](pluginArgs);
		console.log(pluginName);
		console.log("retObj in async: ")
		console.log(retObj);
		//addToDOM(retObj);
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



 function addToDOM(data, appendHandler, wrapper) {
 	orderedData = data.reverse();
 	console.log(orderedData);
 	for(var i=0; i<orderedData.length; i++) {
 		replace1 = wrapper.replace('{{date}}', orderedData[i][0]);
 		replace2 = replace1.replace('{{title}}', orderedData[i][1]);
 		final_res = replace2.replace('{{content}}', orderedData[i][2]);
 		$(appendHandler).append(final_res);
 	}
 }


 function fetchTemplate(templatePath, addToDOMcallback) {
 	var file = '';
 	$.ajax({
 		type: 'GET',
 		url: "templates/"+templatePath,
 		success: function (wrapper) {
 			addToDOMcallback(wrapper);   
 		}
 	});
 }

