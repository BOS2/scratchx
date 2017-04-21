(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.verify_acc = function(username, password) {
        var url = '//api.bos2.cf/?type=verify&username=' + username + '&password=' + password + '&callback=?';
        $.getJSON(url, function(data) {
            success: readData(data)
        });

        function readData(data) {
            if (data.success) {
                return true;
            } else {
                return false;
            }
        }
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['b', 'Check credentials %s %s', 'verify_acc', 'Username', 'Password'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('BOS2', descriptor, ext);
})({});
