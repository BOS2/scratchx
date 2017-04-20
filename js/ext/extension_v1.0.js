(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.verify_acc = function(username, password, callback) {
        $.ajax({
              url: 'http://api.bos2.cf/?type=verify&username=' + username + '&password=' + password,
              dataType: 'jsonp',
              success: function( weather_data ) {
                  success = weather_data['success'];
                  callback(success);
              }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Check credentials %s %s', 'verify_acc', 'Username', 'Password'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('BOS2', descriptor, ext);
})({});
