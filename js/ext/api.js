(function(ext) {
    
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    ext.grab = function(u, p, callback){
		$.getJSON('http://crossorigin.me/http://bankos.cf/api/v1/?t=verify&u=' + u + '&p=' + p, function(json){
			console.log(json);
		  callback(json.msg);
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
