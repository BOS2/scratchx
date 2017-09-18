function getAjax(url, success) {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
	};
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send();
	return xhr;
}

function postAjax(url, data, success) {
	var params = typeof data == 'string' ? data : Object.keys(data).map(function(k) {
		return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
	}).join('&');

	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xhr.open('POST', url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState > 3 && xhr.status == 200) {
			success(xhr.responseText);
		}
	};
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(params);
	return xhr;
}

var caeser = function(str, num) {
	num = Number(num);
	if (num < 0) {
		return caeser(str, num + 26);
	}
	var returnVar = "";

	for (var x = 0; x < str.length; x++) {
		var v = str[x];
		if (v.match(/[a-z]/i)) {
			var code = str.charCodeAt(x);

			if ((code >= 65) && (code <= 90)) {
				v = String.fromCharCode(((code - 65 + num) % 26) + 65);
			} else if ((code >= 97) && (code <= 122)) {
				v = String.fromCharCode(((code - 97 + num) % 26) + 97);
			}
		}
		returnVar += v;
	}

	return returnVar;
};

(function(ext) {

	// Cleanup function when the extension is unloaded
	ext._shutdown = function() {};

	// Status reporting code
	// Use this to report missing hardware, plugin or unsupported browser
	ext._getStatus = function() {
		return {
			status: 2,
			msg: 'Ready'
		};
	};

	ext.check = function(u, p, callback) {
		postAjax("https://api.bankos.cf/v1/check.php", {
			user: u,
			pass: p
		}, function(data) {
			var json = JSON.parse(data);
			console.log(json.success);
			callback(json.success);
		});
	};

	ext.create = function(u, p, callback) {
		postAjax("https://api.bankos.cf/v1/create.php", {
			user: u,
			pass: p
		}, function(data) {
			var json = JSON.parse(data);
			console.log(json.success);
			callback(json.success);
		});
	}

	ext.randSess = function(i, ii, iii) {
		return caeser(i+ii, iii.length);
	}

	// Block and block menu descriptions
	var descriptor = {
		blocks: [
			['R', 'Verify %s %s', 'check'],
			['R', 'Create %s %s', 'create'],
			['r', 'Create Session Key %s $s %s', 'randSess'],
		],
		url: 'https://bos.cf'
	};

	// Register the extension
	ScratchExtensions.register('BOS API', descriptor, ext);
})({});
