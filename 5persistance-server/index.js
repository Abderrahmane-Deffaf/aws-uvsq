

const express = require('express' ) ; 
const bodyParser = require('body-parser') ; 
const cookieParser = require('cookie-parser') ;
const { usersListHandler } = require('./handlers/users-list-handler') ;
const session = require('express-session') ;
require('express-async-errors') ;
const nunjucks = require("nunjucks"); 
const {signInHandler, signInPostHandler} = require('./handlers/sign-in-handler') ;
const {loginHandler} = require('./handlers/login-in-hanlder') ;
const {rootHanlder} = require('./handlers/root-hanlder') ;
const {logoutHanlder} = require('./handlers/logout-handler') ;

const app = express() ;
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
  }),
);

nunjucks.configure('views', {
  express: app, 
  autoescape: true, 
  noCache: true,
}); 

app.use(bodyParser.urlencoded({ extended: true })) ;
app.use(cookieParser()) ;
app.set('views', './views') ;


app.get('/signin', signInHandler) ; 
app.post("/signin", signInPostHandler);
app.get('/users-list', usersListHandler);
app.post('/logout',  logoutHanlder)
app.post('/', loginHandler);
app.get('/', rootHanlder ) ;


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000 ') ;
})