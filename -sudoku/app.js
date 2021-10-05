const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup');
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))
const isLoggedIn = (req,res,next) => {
  if (req.user) {
    Logged = 'logout';
    next();
  } else {
    Logged = 'google';
    next();
  }
}
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

var PopUp = {message: 'Hello', display: 'none', color: 'rgb(118, 228, 118)'}
var Logged = 'google';

app.get('/', isLoggedIn, (req, res) => {res.render('index', {popUp: PopUp, logged: Logged})});
app.get('/failed', (req, res) => res.send('Failed login'));
app.get('/good', (req, res) => {
  PopUp.message = `Welcome ${req.user.displayName}`;
  PopUp.display = 'block';
  PopUp.color = 'rgb(118, 228, 118)';
  res.redirect('/');
});

app.get('/google',
        passport.authenticate('google',
                              {scope: ['email','profile']}
));

app.get('/google/callback',
        passport.authenticate( 'google',
                              {failureRedirect: '/failed'}),
        function(req, res) {
          res.redirect('/good');
        }
);

app.get('/logout', (req,res) => {
  PopUp.message = 'Goodbye!';
  PopUp.display = 'block';
  PopUp.color = 'rgb(241, 85, 85)';
  req.session = null;
  req.logout();
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})