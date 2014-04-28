/*
 * GitHub as database - slick.js plugin
 *
 *  - Fetches and shows blog posts stored in github. slick! 
 */

 var plugin_gitDatabase = function() {

 	function init() {
 		var pluginArgs = arguments[0];
 		var executeCallback = arguments[1];



 		//if routeURL --> fetchSingle blogpostwith that title
 		if (slick.routeURL != '') {
 			console.log("FETCH "+slick.routeURL);
 		} 

 		//cache verification
 		if(!slick.cache.plugin_gitDatabase.allEntriesMetadata) {
 			var user = arguments[0].github.username;
 			var repo  = arguments[0].github.repo;
 			fetchAllEntriesCache(user,repo, function(data) {
 				slick.cache.plugin_gitDatabase.allEntriesMetadata = data;
 				executeCallback(pluginArgs);
 			});

 		} else {
 			executeCallback(pluginArgs);
 		}
 	}

 	function fetchSingleEntry() {

 		console.log('fetchSingleEntry');

 		var user = arguments[0].github.username;
 		var repo  = arguments[0].github.repo;
 		var appendHandler = arguments[0].appendHandler;
 		var templatePath = arguments[0].templatePath;
 		var title = arguments[0]['title'];

 		if (!title) {
 			//get last post
 			var allEntries = slick.cache.plugin_gitDatabase.allEntriesMetadata;
 			var sortedEntries = allEntries.reverse();
 			var title = sortedEntries[0]['date']+'@'+sortedEntries[0]['title'];
 		}	

 		getResourceGithub(user+"/"+repo+"/contents/"+
 			title, function(rawData) {
 				data = {};
 				metadata = rawData.name.split("@");
 				content = decodeContent(rawData.content);

 				data['date'] = metadata[0];
 				data['title'] = metadata[1];
 				data['content'] = content;

 				slick.addToDOM([[data], templatePath, appendHandler]);
 			});


 	};

 	function fetchAllEntries() {
 		var appendHandler = arguments[0].appendHandler;
 		var templatePath = arguments[0].templatePath;
 		var allEntries = slick.cache.plugin_gitDatabase.allEntriesMetadata; 			
 		slick.addToDOM([allEntries, templatePath, appendHandler]);
 	}






 	//Inner scope functions
 	function fetchAllEntriesCache(user, repo, callback) {
 		var data = [];
 		getResourceGithub(user+"/"+repo+"/contents", 
 			function(rawData) {  		
 				for(var i = 0; i<rawData.length; i++) {
 					var newEntry = new Object();
 					metadata = rawData[i].name.split("@");
 					newEntry['date'] = metadata[0];
 					newEntry['title'] = metadata[1];
 					data.push(newEntry);
 				}
 				callback(data);
 			});	
 	}

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




 	//interface
 	return {
 		init: init,
 		fetchSingleEntry: fetchSingleEntry,
 		fetchAllEntries: fetchAllEntries
 	}
 }