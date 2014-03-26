/*
 * Object
 */

 var Slick = (
 	function() {
 		var user;
 		var repo;
 		//Is this cache system working ? Test!
 		var allEntriesMetadata_cache;


 		function setGithubConfigs(user, repo) {
 			this.user = user;
 			this.repo = repo;			
 		}

 		function fecthAllEntriesMetadataDB(user, repo, callback) {
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

 		function fetchSingleEntryDB(user, repo, entry_name, callback) {
 			getResourceGithub(user+"/"+repo+"/contents/"+entry_name, 
 				function(rawData) {
 					metadata = rawData.name.split("@");
 					content = decodeContent(rawData.content);
 					data = [metadata[0], metadata[1], content];
 						
 					callback(data);
 				}); 
 		}

 		function fetchAllEntriesMetadata(appendHandler, templatePath) {
 			if (typeof(this.allEntriesMetadata_cache) == 'undefined') {
 				fecthAllEntriesMetadataDB(this.user,this.repo, function(data) {
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
 		fetchSingleEntryDB(this.user, this.repo, entry_name, function(data) {
 			fetchTemplate(templatePath, function(wrapper) {
 				addToDOM(data, appendHandler, wrapper);
 			});
 		});	
 	}


 	function populateTemplate() {
 		console.log("populateTemplate")
 	}

 	return {
 		setGithubConfigs: setGithubConfigs,
 		fetchSingleEntry: fetchSingleEntry,
 		fetchAllEntriesMetadata: fetchAllEntriesMetadata
 	}

 })();








/*
 * Interface --> REFACTOR!
 */


 function getEntryByName(entry_name, appendHandler, wrapper) {
 	getResourceGithub(user+"/"+repo+"/contents/"+entry_name, function(rawData) {
 		metadata = rawData.name.split("@");
 		content = decodeContent(rawData.content);
 		data = [metadata[0], metadata[1], content];
 		addToDOM([data], appendHandler, wrapper);
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
 	console.log("addToDOM");
 	console.log(appendHandler)
 	console.log(wrapper);
 	console.log(data);

 	for(var i=0; i<data.length; i++) {
 		replace1 = wrapper.replace('{{date}}', data[i][0]);
 		replace2 = replace1.replace('{{title}}', data[i][1]);
 		final_res = replace2.replace('{{content}}', data[i][2]);
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

