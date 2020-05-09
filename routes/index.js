// Auth Routes
// =========================================================

var express   = require('express'),
    router    = express.Router(),
    User      = require("../models/user"),
    passport  = require('passport');
    const client        = require('../send_sms');

// Register form
router.get("/register", function(req, res){
    res.render("register");
});
// Sign Up Logic
router.post("/register", function(req, res){
    var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password , function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/dishes");
        });
    });
});

// Show login Form
router.get("/login", function(req, res){
    res.render("login");
});
//Handling login logic
router.post("/login", passport.authenticate("local",{
    successRedirect : "/dishes",
    failureRedirect : "/login"
}), function(req, res){
});

// Logout Route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/dishes");
});

// Message
router.get("/sms", function(req, res){
    res.render("sms");
});
router.post("/sms", function(req, res){
    client.messages.create({
        to: "+91" + req.body.number, 
        from: '+15182548818',
        body: 'Thanks for subscribing Cuisilite . Congrats.....!!'
    });
    res.redirect("/dishes");
});

module.exports = router;