console.log("Virtuosa Home Clipper CONTENT LOADED");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

		if (request.mess == "SENDTO_VIRTUOSE_HOME_CLIPPER"){
			console.log("SENDTO_VIRTUOSE_HOME_CLIPPER");
			console.log(document.URL);
			chrome.extension.sendMessage({msg: 'SENDTO_VIRTUOSE_HOME_CLIPPER', pageURL: document.URL, pageHTML : document.documentElement.outerHTML});
		}		
		
});	