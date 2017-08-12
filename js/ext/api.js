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
		
	};
	// Block and block menu descriptions
	var descriptor = {
		blocks: [
			['R', 'Verify %s %s', 'check'],
		],
		url: 'https://bankos.cf'
	};


	// Register the extension
	ScratchExtensions.register('BOS API', descriptor, ext);
})({});
