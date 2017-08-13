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
	
	ext.check = function (u, p) {
		getAjax(u, function (data) {
			json = JSON.parse(data);
			console.log(json.hi);
		});
		while(json == '' || json == 0 || json == undefined){};
		return json.hi;
	};
	
	// Block and block menu descriptions
	var descriptor = {
		blocks: [
			['r', 'Verify %s %s', 'check'],
		],
		url: 'https://bos.cf'
	};

	// Register the extension
	ScratchExtensions.register('BOS API', descriptor, ext);
})({});
