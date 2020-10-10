chrome.browserAction.onClicked.addListener(function(tab) {
	console.log("onClicked");
	chrome.tabs.sendMessage(tab.id, {mess: "SENDTO_VIRTUOSE_HOME_CLIPPER"});
});

chrome.runtime.onMessage.addListener(function(request,sender,callback) {

	if (request.msg == "SENDTO_VIRTUOSE_HOME_CLIPPER"){
		console.log("SENDTO_VIRTUOSE_HOME_CLIPPER message");
		console.log(request.pageURL);
		sentToVirtuosa(request.pageURL, request.pageHTML);	
			
			
	}	
});

function sentToVirtuosa(pageURL, pageHTML){
			
	 var requestUrl = 'https://5ugcbzwoa1.execute-api.us-east-2.amazonaws.com/default/debugPrintJson';
			 
	var request = new XMLHttpRequest();
	request.open("POST", requestUrl, true);
	request.setRequestHeader("Content-Type", "application/json");

	request.onload = function () {
		console.log("request.status=" + request.status);
		if (request.status != 200) {
			alert("Virtuosa Home Clipper" + request.status + " " + request.statusText);
		} 
		else
			alert("Virtuosa Home Clipper. Added!")
	}

	request.onerror = function () {
		alert("Virtuosa Home Clipper. Request failed");
	};		

	var postobj = {};
	postobj.url = pageURL; //encodeURI
	postobj.html = pageHTML;
	//postobj.html = '<html lang="ru"><head><meta charset="utf-8" /><title>Документ без названия</title></head><body>Контент</body></html>';
	//postobj.url = "https://www.yahoo.com"
	//postobj.html = '<HTML><HEAD><TITLE>Sample page</TITLE></HEAD><BODY>Sample</BODY></HTML>';
	postobj.version = "20201008b";
	var postbody = JSON.stringify(postobj);
	console.log(postbody);
			
	request.send(postbody);	
}