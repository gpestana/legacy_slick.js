/*
 *Scafolding plugin
 */


 var plugin_ = function(){

 	function init(a) {
 		console.log("init plugin_");
 		console.log(a);
 	};

 	function doAlert() {
 		alert("plugin_");
 	};

 	return {
 		init: init,
 		doAlert: doAlert
 	}
 }