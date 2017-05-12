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

    ext.verify_acc = function(username, password) {
        var url = '//bankos.cf/api/v1?t=verify&u=' + username + '&p=' + password + '&callback=?';
        $.getJSON(url, function(data) {
            document.cookie = "BOS_MSG12=" + data.msg;
            console.log(document.cookie);
        });
        if (getCookie('BOS_MSG12') != "") {
            if (getCookie('BOS_MSG12') === 'Verified!') {
                return true;
                document.cookie = "BOS_MSG12=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            } else {
                return false;
                document.cookie = "BOS_MSG12=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
        } else {
            return false;
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
