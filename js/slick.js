/*
 * Object
 */

 var Slick = (
 	function() {
 		var user;
 		var repo;
 		//Is this cache system working ? Test!
 		var allEntriesMetadata_cache;

 		function _getAllEntriesGithub(user, repo, callback) {
 			data = [];
 			getResourceGithub(user+"/"+repo+"/contents", 
 				function(rawData) {  		
 					for(var i = 0; i<rawData.length; i++) {
 						var newEntry = new Object();
 						metadata = rawData[i].name.split("@");
 						data.push([metadata[0], metadata[1]]);
 					}
 					callback(data);
 				});
 		}

 		function _getSingleEntryGithub(user, repo, entry_name, callback) {
 			getResourceGithub(user+"/"+repo+"/contents/"+entry_name, 
 				function(rawData) {
 					metadata = rawData.name.split("@");
 					content = decodeContent(rawData.content);
 					data = [[metadata[0], metadata[1], content]];
 						
 					callback(data);
 				}); 
 		}


 		function setGithubConfigs(user, repo) {
 			this.user = user;
 			this.repo = repo;			
 		}

 		function fetchAllEntriesMetadata(appendHandler, templatePath) {
 			if (typeof(this.allEntriesMetadata_cache) == 'undefined') {
 				_getAllEntriesGithub(this.user,this.repo, function(data) {
 					this.allEntriesMetadata_cache = data;
 					fetchTemplate(templatePath, function(wrapper) {
 						addToDOM(data, appendHandler, wrapper);
 					});
 			});	
 			} else {
 				fetchTemplate(templatePath, function(wrapper) {
 					addToDOM(data, appendHandler, wrapper);
 			});
 		}
 	}

 	function fetchSingleEntry(entry_name, appendHandler, templatePath) {
 		_getSingleEntryGithub(this.user, this.repo, entry_name, function(data) {
 			fetchTemplate(templatePath, function(wrapper) {
 				addToDOM([data], appendHandler, wrapper);
 			});
 		});	
 	}

 	return {
 		setGithubConfigs: setGithubConfigs,
 		fetchSingleEntry: fetchSingleEntry,
 		fetchAllEntriesMetadata: fetchAllEntriesMetadata
 	}

 })();


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

