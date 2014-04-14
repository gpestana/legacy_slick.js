/*
 * GitHub blog - slick.js plugin
 *
 *  - Fetches and shows blog posts stored in github. slick! 
 */


function getAllEntriesMetadataToCache(callback) {
	data = [];
	var user = Slick.gitUser;
	var repo = Slick.gitRepo;
	
	getResourceGithub(user+"/"+repo+"/contents", 
		function(rawData) {  		
			for(var i = 0; i<rawData.length; i++) {
				var newEntry = new Object();
				metadata = rawData[i].name.split("@");
				newEntry['date'] = metadata[0];
				newEntry['title'] = metadata[1];
				data.push(newEntry);
			}
			this.allEntriesMetadata_cache = data;
			Slick.allEntriesMetadata = allEntriesMetadata_cache;
			callback();
		});	
};


function fetchAllEntriesMetadata(args, callback) {
	var appendHandler = args[0];
	var templatePath = args[1];
	var allEntries = Slick.allEntriesMetadata;

	callback([allEntries, templatePath, appendHandler]);

}

function fetchSingleEntry(args, callback) {
			var entryName = args[0];
			var appendHandler = args[1];
			var templatePath = args[2];

			//for getNext and getPrevious entry
			Slick.currentEntry = entryName;

 			getResourceGithub(Slick.gitUser+"/"+Slick.gitRepo+"/contents/"+
 				entryName, function(rawData) {
 					data = {};
 					metadata = rawData.name.split("@");
 					content = decodeContent(rawData.content);

 					data['date'] = metadata[0];
 					data['title'] = metadata[1];
 					data['content'] = content;

 					//go back to framework -- addToDom
 					callback([[data], templatePath, appendHandler]);
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


function getPreviousAndNextEntry(callback) {
	var allEntriesMetadata = Slick.allEntriesMetadata;
	var nextEntry ="ola"
	var previousEntry ="adeus";
	
	for (var i=0; i<allEntriesMetadata.length; i++) {
		var fullName = allEntriesMetadata[i]['date']+'@'+allEntriesMetadata[i]['title'];
		if (Slick.currentEntry == fullName) {
			nextEntry = allEntriesMetadata[i-1];
			previousEntry = allEntriesMetadata[i+1];
		}
	}

	callback(nextEntry, previousEntry);
}

function nextPost() {
	getPreviousAndNextEntry(
		function(nextEntry, previousEntry) {
			console.log("nextEntry");
			console.log(nextEntry);
	});
}

function lastPost() {
	getPreviousAndNextEntry(
		function(nextEntry, previousEntry) {
			console.log("previousEntry");
			console.log(previousEntry);

			Slick.setEnv(
			"gpestana","blog-posts",
			{pluginName: "fetchSingleEntry", 
			entryTitle: previousEntry['date']+'@'+previousEntry['title'], 
			appendHandler:".oneEntry", 
			templatePath:"singleEntry.html"});
	});
}
