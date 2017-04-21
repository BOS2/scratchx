(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.verify_acc = function(username, password) {
        $.ajax({
              url: 'http://api.bos2.cf/?type=verify&username=' + username + '&password=' + password,
              dataType: 'json',
              success: function( result ) {
                  success = result['success'];
                  return success;
              }
        });
    };
    ext.test = function() {
        return 'oats';
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Check credentials %s %s', 'test', 'Username', 'Password'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('BOS2', descriptor, ext);
})({});
