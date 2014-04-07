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
				data.push([metadata[0], metadata[1]]);
			}
			this.allEntriesMetadata_cache = data;
			Slick.allEntriesMetadata = allEntriesMetadata_cache;
			callback();
		});	
};


function fetchAllEntriesMetadata() {

	appendHandler = arguments[0]['appendHandler'];
	templatePath = arguments[0]['templatePath'];
	
	/*fetchTemplate(templatePath, function(wrapper) {
		addToDOM(Slick.getAllEntriesMetadata(), appendHandler, wrapper);
	});
		*/
		return [templatePath, appendHandler];
}

function fetchSingleEntry(args, callback) {
			var entryName = args[0];
			var appendHandler = args[1];
			var templatePath = args[2];

			console.log("---fetchSingleEntry");
 			//get Next and Previous post

 			getResourceGithub(Slick.gitUser+"/"+Slick.gitRepo+"/contents/"+
 				entryName, function(rawData) {
 					metadata = rawData.name.split("@");
 					content = decodeContent(rawData.content);
 					data = [[metadata[0], metadata[1], content]]; 					


 					//this is the way data should be returned from source
 					data = {title:'title1', date:'date1', content:'content1'}
 					
 					//go back to framework:
 					callback([data, templatePath, appendHandler]);
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