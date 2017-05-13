var sc = document.createElement("script");
sc.setAttribute("src", "https://cloudboost.io/js-sdk/cloudboost.js");
document.body.appendChild(sc);
CB.CloudApp.init('ojzmkthcnnsn', '5c58312b-fcea-4173-9644-3870217903f2');
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

	ext.grab = function (u, p, callback) {
		var query = new CB.CloudQuery("info");
		query.equalTo('username', u);
		query.equalTo('password', p);
		query.greaterThan('age', 10);
		query.find({
			success: function (list) {
				return true;
			},
			error: function (error) {
				return false;
			}
		});
	};
	// Block and block menu descriptions
	var descriptor = {
		blocks: [
			['R', 'Verify %s %s', 'grab'],
		],
		url: 'https://bankos.cf'
	};


	// Register the extension
	ScratchExtensions.register('BOS API', descriptor, ext);
})({});
