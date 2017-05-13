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

    function fnv32a(str) {
        var FNV1_32A_INIT = 0x811c9dc5;
        var hval = FNV1_32A_INIT;
        for (var i = 0; i < str.length; ++i) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        return hval >>> 0;
    }
    
    ext.hash = function (key) {
        alert(fnv32a(key));
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Hash %s', 'hash', 'Key'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('BOS2', descriptor, ext);
})({});
