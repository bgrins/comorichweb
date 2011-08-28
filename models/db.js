var mongoose = require('mongoose');

var _db = null;
module.exports = {
    init: function(url) {
        if (!module.exports._db){
            console.log('connecting to MONGO via ' + url);
            module.exports._db = mongoose.connect(url);

        }

        return module.exports._db;        
    }
}
