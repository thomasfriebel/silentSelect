var lb = null;
var gsplits = null
var gLBread = false;
var myDoc;
var inter;

function doSelect(that,values) {
	//does the final selection on a listbox
	that.Data.SelectTexts(values);
}

function hashChanged(hashVal) {
	sSelector = hashVal.substr(1)	//remove #
	var splits = sSelector.split("=") //split by = as in LB01=A;B;C
	gsplits = splits[1].split(";") //split right side by ; as in A;B;C => A, B, C

	var intervalFunc = function() {
		if (gLBread == true) {		//check read flag for true
			doSelect(lb, gsplits)	//call selection method
			gLBread = false;		//set flag back to false 
		} else {					//check for flag was false
			window.setTimeout(intervalFunc,50)	//try again in 50 ms
		}
	}

	if (!lb) {				//no reference to the LB yet?
		gLBread = false;	
		lb = myDoc.GetObject(splits[0], function() {	//get the LB object asynch
			gLBread = true								//set flag when object available
		});
		window.setTimeout(intervalFunc,1)	//set timeout to be asynch as well			
	} else {				//have already the LB obj?
		intervalFunc();		//directly call handler
	}
	
}

Qva.AddDocumentExtension('silentSelect', function() {
	myDoc = Qv.GetCurrentDocument()
	if ("onhashchange" in window) { // event supported?
		window.onhashchange = function () {	//set event handler
			hashChanged(window.location.hash);	//handle event 
		}
	}
	else { // event not supported:
		var storedHash = window.location.hash;
		window.setInterval(function () {
			if (window.location.hash != storedHash) {
				storedHash = window.location.hash;
				hashChanged(storedHash);
			}
		}, 100);
	}	
	if (window.location.hash) {
		//initially handle the hash parameters of the url
		hashChanged(window.location.hash);
	}
	
})
