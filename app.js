var express             = require('express'),
    app                 = express(),
    seedDB              = require("./seeds"),
    bodyParser          = require('body-parser'),
    passport            = require('passport'),
    LocalStrategy       = require('passport-local'),
    User                = require('./models/user');

var commentRoutes       = require('./routes/comments'),
    dishRoutes          = require('./routes/dishes'),
    indexRoutes         = require('./routes/index');

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));

var mongoose         = require("mongoose");
var URI              = "mongodb+srv://st123:st123@cluster1-nwiwi.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
seedDB();

// Passport Configuration
// ======================
app.use(require('express-session')({
    secret : "This is the best ever restaurant",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(commentRoutes);
app.use(dishRoutes);
app.use(indexRoutes);

app.listen(3002, process.env.IP, function(){
    console.log("Restaurant is all yours.... ");
});