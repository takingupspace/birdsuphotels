document.getElementById('myId').innerHTML=listCookies()
	function listCookies() {
	if(!document.cookie){
		return '[No active login session]';
	}else{
	    var theCookies = document.cookie.split(';');
		var aString = '';
		for (var i = 1 ; i <= theCookies.length; i++) {
		aString += theCookies[i-1] + "\n";
	}
		return aString;
	}
}