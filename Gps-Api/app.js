var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//Instancio el servidor
var app = express();

// set up the template engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

//set assets folder as public
app.use(express.static(path.join(__dirname,'./assets')));

//------------------------------------------------------------------------------

var session = require('express-session');

//session-related stuff
var sess = {
 secret: '9AkBSmkKNvoTFAdWh01YDVVS1gPocsMLg9eqcpu-9IbDYvy4o5hM9B-awLcsXU3t',
 cookie: {},
 resave: false,
 saveUninitialized: true
};

if (app.get('env') === 'production') {
 sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

//-----------------------------------------------------------------------------------
var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');

//passport-auth0
var strategy = new Auth0Strategy({
  domain: 'yepes.auth0.com',
  clientID: '10Cp5KmJ6KbOxwkD546WGbcLUG0H98Du',
  clientSecret: '9AkBSmkKNvoTFAdWh01YDVVS1gPocsMLg9eqcpu-9IbDYvy4o5hM9B-awLcsXU3t', // Replace this with the client secret for your app
  callbackURL: 'http://localhost:3000/callback'
 },
 function(accessToken, refreshToken, extraParams, profile, done) {
   // accessToken is the token to call Auth0 API (not needed in the most cases)
   // extraParams.id_token has the JSON Web Token
   // profile has all the information from the user
   return done(null, profile);
 }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());
//------------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  //------------------------------------------------------------------------------
    var indexRouter = require('./routes/index');
    var authRouter = require('./routes/auth');

    //..
    //..

    app.use('/', indexRouter);
    //..
    app.use('/', authRouter);
    //..
  //----------------------------------------------------------------------------------    
  // app.js

// Look up session to know if user is logged in 
app.use(function(req, res, next) {
    res.locals.loggedIn = false;
    if (req.session.passport && typeof req.session.passport.user != 'undefined') {
      res.locals.loggedIn = true;
    }
    next();
  });
  
  // the auth router should be loaded after the function definition
  app.use('/', indexRouter);
  //..
  app.use('/', authRouter);
  //..
  //----------------------------------------------------------------------------------------

//Cargar rutas
var userRoutes = require('./routes/user');
var routeRoutes = require('./routes/route');
var indexRoutes = require('./routes/index');

//Middleware que se ejecuta antes de ejecutar el codigo y recibe los parametros y los transforma en este caso en formato json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//Configurar cabeceras Http
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
});

//Rutas base
app.use('/api', userRoutes);
app.use('/api', routeRoutes);
app.use('', indexRoutes);

//Para poder utilizar este archivo dentro de otros
module.exports = app;