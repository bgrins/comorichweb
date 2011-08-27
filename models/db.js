var mongoose = require('mongoose');

var _db = null;
module.exports = {
    init: function(host, name) {
        if (!module.exports._db){
            console.log('connecting to MONGO via ' + host + " " + name);
            module.exports._db = mongoose.connect(host, name);

        }

        return module.exports._db;        
    }
}
