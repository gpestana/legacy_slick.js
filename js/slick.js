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

 	setAllEntriesMetadata: function(metadata) {
 		this.allEntriesMetadata = metadata;
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

 		var pluginArgs = [];
 		var pluginName = listPlugins["pluginName"];
 		var listArgs = Array.prototype.slice.call(listPlugins, 1)[0];

 		console.log(pluginName);
 		console.log(listArgs);
		/*
		for(var key in listPlugins) {
			pluginArgs.push(listPlugins[key]);
		}*/


		window[listPlugins[i]["pluginName"]](pluginArgs);
	}
};


function getAllEntriesMetadataToCache(callback) {
	data = [];
	var user = Slick.gitUser;
	var repo = Slick.gitRepo;
	
	getResourceGithub(user+"/"+repo+"/contents", 
		function(rawData) {  		
			for(var i = 0; i<rawData.length; i++) {
				var newEntry = new Object();
				metadata = rawData[i].name.split("@");
				data.push([metadata[0], metadata[1]]);
			}
			this.allEntriesMetadata_cache = data;
			Slick.setAllEntriesMetadata(allEntriesMetadata_cache);
			callback();
		});	
};


function test(args) {
	console.log("args: ");
	console.log(args);
}


/*

			function _getAllEntriesMetadataToCache(user, repo, callback) {
				data = [];
				getResourceGithub(user+"/"+repo+"/contents", 
					function(rawData) {  		
						for(var i = 0; i<rawData.length; i++) {
							var newEntry = new Object();
							metadata = rawData[i].name.split("@");
							data.push([metadata[0], metadata[1]]);
						}
						this.allEntriesMetadata_cache = data;
						console.log(Slick.setAllEntriesMetadata(allEntriesMetadata_cache));
						callback();
					});	
			};


			function _getSingleEntryGithub(user, repo, entry_name, callback) {
				getResourceGithub(user+"/"+repo+"/contents/"+entry_name, 
					function(rawData) {
						metadata = rawData.name.split("@");
						content = decodeContent(rawData.content);
						data = [[metadata[0], metadata[1], content]];

						callback(data);
					}); 
			}


			return {
				getGithubUser: getGithubUser,
				getGithubRepo: getGithubRepo,
				getAllEntriesMetadata: getAllEntriesMetadata,
				setAllEntriesMetadata: setAllEntriesMetadata,
				setEnv: setEnv
			}

		})();


*/
/*Native Plugins*/

function fetchAllEntriesMetadata() {

	appendHandler = arguments[0]['appendHandler'];
	templatePath = arguments[0]['templatePath'];

	console.log(Slick.getAllEntriesMetadata());

	fetchTemplate(templatePath, function(wrapper) {
		addToDOM(Slick.getAllEntriesMetadata(), appendHandler, wrapper);
	});
}

function fetchSingleEntry(entry_name, appendHandler, templatePath) {
 			//get Next and Previous post
 			_getSingleEntryGithub(this.user, this.repo, entry_name, function(data) {
 				fetchTemplate(templatePath, function(wrapper) {
 					addToDOM([data], appendHandler, wrapper);
 				});
 			});	
 		}


/*
 * Support functions
 */

 function getResourceGithub(path, callback) {
 	var github_url = "https://api.github.com/repos/"
 	$.get(github_url+path, function (data) {
 		callback(data);
 		return data;
 	});	
 }

 function decodeContent(codedContet) {
 	return atob(codedContet.replace(/\s/g, ''));
 }

 function addToDOM(data, appendHandler, wrapper) {
 	orderedData = data.reverse();
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

