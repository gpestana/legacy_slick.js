/*
 * Object
 */

 var Slick = (
 	function() {
 		var user;
 		var repo;
 		//Is this cache system working ? Test!
 		var allEntriesMetadata_cache;

 		function getGithubUser() {
 			return this.user;
 		}
 		
 		function getGithubRepo() {
 			return this.gitRepo;
 		}
 		
 		function getAllEntriesMetadata() {
 			console.log(this.repo);
 			return allEntriesMetadata_cache; 
 		}

 		function setAllEntriesMetadata(data) {
 			this.allEntriesMetadata_cache = data;
 		}

 		/*New organization*/
 		function setEnv() {
 			gitUser = arguments[0];
 			gitRepo = arguments[1];
 			plugins = Array.prototype.slice.call(arguments, 2);

 			this.user = gitUser;
 			this.repo = gitRepo;

 			_getAllEntriesMetadataToCache(gitUser, gitRepo, function() {
				//trigger async function executer
				_asyncExecuter(plugins);
			});
 		};

 		function _asyncExecuter() {
 			pluginsData = arguments[0];
 			for(var i=0; i<pluginsData.length; i++) {
				//call funcs with params
				console.log(pluginsData[i]);
				pluginsData[0]['plugin'](pluginsData.shift());
			}}


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

