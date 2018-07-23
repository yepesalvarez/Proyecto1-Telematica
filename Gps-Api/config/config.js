var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'test';

var config = {
  development: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'gps'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/gpsDB'
  },

  test: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'gps'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo-server/articulosem-test'
  },

  production: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'gps'
    },
    port: process.env.PORT || 3000,
    //db: 'mongodb://emontoya:*******@ds163397.mlab.com:63397/emontoya'
  }
};

module.exports = config[env];
