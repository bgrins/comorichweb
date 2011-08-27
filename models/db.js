var mongoose = require('mongoose');

var _db = null;
module.exports = {
    init: function(path) {
        if (!module.exports._db){
            console.log('connecting to MONGO via ' + path);
            module.exports._db = mongoose.connect(path);
        }

        return module.exports._db;        
    }
}
