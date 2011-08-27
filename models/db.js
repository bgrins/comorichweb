var mongoose = require('mongoose');

var _db = null;
module.exports = {
    init: function(server, dbname) {
        if (!module.exports._db){
            var path = 'mongodb://' + server + '/' + dbname;
            console.log('connecting to MONGO via ' + path);
            module.exports._db = mongoose.connect(path);
        }

        return module.exports._db;        
    }
}
