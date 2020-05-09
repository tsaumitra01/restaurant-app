// Comment Routes  
// =========================================================================

var express    = require('express'),
    router     = express.Router({mergeParams: true}),
    Dish       = require('../models/dish'),
    Comment    = require('../models/comment');

// Displaying the comment form
router.get("/dishes/:id/comments/new", isLoggedin ,  function(req, res){
    Dish.findById(req.params.id, function(err, dish){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {dish : dish});
        }
    });
});

// Adding comment and redirecting
router.post("/dishes/:id/comments", function(req, res){
    Dish.findById(req.params.id, function(err, dish){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    dish.comments.push(comment);
                    dish.save();
                    res.redirect("/dishes/" + dish._id);
                }
            });
        }
    });
});

function isLoggedin(req, res, next)
{
    if(req.isAuthenticated()){
        // console.log(req.user);
        // console.log(req.user.userType);
        return next();
    }
    res.redirect("/login");
}

module.exports = router;