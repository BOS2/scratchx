(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    ext.verify_acc = function(username, password, callback) {
        var url = '//api.bos2.cf/?type=verify&username=' + username + '&password=' + password + '&callback=?';
        $.getJSON(url, function(data) {
            document.cookie = "BOS_MSG12=" + data.msg;
        });
        if (getCookie('BOS_MSG12') != 'Verified') {
            return false;
            document.cookie = "BOS_MSG12=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else {
            return true;
            document.cookie = "BOS_MSG12=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
