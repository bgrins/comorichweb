var settings = {
	'sessionSecret': 'sessionSecret',
    'port': 3000,
    'uri': 'http://localhost:8080', // Without trailing /
    'tempDir': "/tmp/", // with trailing /

	// You can add multiple recipiants for notifo notifications
    'notifoAuth': {
        'username': 'comorichweb',
        'secret': 'xca6fdaefbda59e27c5223c1aa0e9c27e11dd8eea'
    },

    'db': {
        'url': 'mongodb://localhost/sample-app'
    }, 

    'zipExec': __dirname + "/zip.sh",

	// Enter API keys to enable auth services, remove entire object if they aren't used.
    'external': {
		'facebook': {
			appId: '199842220079212',
			appSecret: '3c65d84b0793accabb2dc35015d1a067'
		}
		, 'twitter': {
			consumerKey: 'tlTIDx8CjClK4aBBOEVuA',
			consumerSecret: 'H5mVWHkrZgkVDnohZrqKgro4w8uLgS9atuZo4Nh1g'
		}
		, 'github': {
			appId: 'cf3f3e6a96feb580afbc',
			appSecret: '2157d161835ef3ba8fab9d6678f185abfbf6dc46'
		}
	}
	, 'debug': (process.env.NODE_ENV !== 'production')
};

if (process.env.NODE_ENV == 'production') {
	settings.uri = 'http://slidespot.aaronm67.com';
	settings.port = 83; // Joyent SmartMachine uses process.env.PORT
  	settings.db.url = 'mongodb://test:test@staff.mongohq.com:10035/comorichweb';
	settings.airbrakeApiKey = 'f66c6b1d6342a9ff31c4bf8ab7e73fa2'; // Error logging, Get free API key from https://airbrakeapp.com/account/new/Free
}
module.exports = settings;
