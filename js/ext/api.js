function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}
function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}
(function (ext) {

	// Cleanup function when the extension is unloaded
	ext._shutdown = function () {};

	// Status reporting code
	// Use this to report missing hardware, plugin or unsupported browser
	ext._getStatus = function () {
		return {
			status: 2,
			msg: 'Ready'
		};
	};
	
	ext.check = function (u, p, callback) {
		postAjax("https://api.bankos.cf/v1/check.php?u="+u+"&p="+p, {user:u, pass:p}, function (data) {
			var json = JSON.parse(data);
			console.log(json.hi);
			callback(json.hi);
		});
	};
	
	// Block and block menu descriptions
	var descriptor = {
		blocks: [
			['R', 'Verify %s %s', 'check'],
		],
		url: 'https://bos.cf'
	};

	// Register the extension
	ScratchExtensions.register('BOS API', descriptor, ext);
})({});
