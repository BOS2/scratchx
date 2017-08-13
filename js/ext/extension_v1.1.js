ScratchExtensions.loadExternalJS("http://savaka2.github.io/scratch-extensions/hash.js");
ScratchExtensions.loadExternalJS("http://savaka2.github.io/scratch-extensions-directory/extensions/StringExt.js");
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.my_first_block = function() {
        return "false";
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['r', 'my first block', 'my_first_block'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('My first extension', descriptor, ext);
})({});
