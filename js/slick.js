var user = "gpestana"
var repo = "blog-posts"

/*
 * Object
 */

var Slick = (
	function() {
		var user;
		var repo;

		var allEntriesMetadata_cache;

		function setGithubConfigs(user, repo) {
			this.user = user;
			this.repo = repo;
			
		}

		function fecthAllEntriesMetadataDB() {
			console.log("fecthAllEntriesMetadataDB");
		}

		function fetchSingleEntryDB() {
			console.log("fetchSingleEntryDB");	
		}

		function fetchSingleEntry() {
			console.log("fetchSingleEntry");	
		}

		function fetchAllEntriesMetadata() {
			console.log("fetchAllEntriesMetadata");	
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

 function getAllEntriesMetadata(appendHandler, wrapper) {
 	data = [];
 	getResourceGithub(user+"/"+repo+"/contents", function(rawData) {  		
 		for(var i = 0; i<rawData.length; i++) {
 			var newEntry = new Object();
 			metadata = rawData[i].name.split("@");
 			
 			//patch to remove
 			if (typeof(metadata[1]) == 'undefined') {
 				metadata[1] = 'undefined';
 			}
 			
 			data.push([metadata[0], metadata[1]]);
 			//add to html
 		}
 		console.log(data);
 		addToDOM(data, appendHandler, wrapper);
 	});
 }


 function getEntryByName(entry_name, appendHandler, wrapper) {
 	getResourceGithub(user+"/"+repo+"/contents/"+entry_name, function(rawData) {
 		metadata = rawData.name.split("@");
 		content = decodeContent(rawData.content);
 		data = [metadata[0], metadata[1], content];

 		addToDOM([data], appendHandler, wrapper);
 	}); 
 }



 function testAPI(postTitle, templatePath ) {
 	console.log(postTitle);

 	template('templates/'+templatePath);
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
 	console.log(data)
 	for(var i=0; i<data.length; i++) {
 		replace1 = wrapper.replace('{{date}}', data[i][0]);
 		replace2 = replace1.replace('{{title}}', data[i][1]);
 		final_res = replace2.replace('{{content}}', data[i][2]);
 		$(appendHandler).append(final_res);
 	}
 }


 function template(templatePath) {
 	var file = '';
 	$.ajax({
 		type: 'GET',
 		url: templatePath,
 		success: function (file_html) {
        // pass the data to the var
        var file = file_html;

        // success
        $('.oneEntry').append(file);   
    }
});
 }

