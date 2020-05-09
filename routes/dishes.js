
var express = require('express'),
    Dish    = require('../models/dish'),
    router  = express.Router();

router.get("/", function(req, res){
    res.render("landing");
}); 
router.get("/timings", function(req, res){
    res.render("timing");
});
router.get("/contacts", function(req, res){
    res.render("contacts");
});

// Dishes Routes
// ==================================================================
router.get("/dishes", function(req, res){
    // res.send("Hre are the dishes");
    Dish.find({}, function(err, dishes){
        if(err){
            console.log(err);
        }
        else{
            res.render("dishes/index", {dishes : dishes});
        }
    });
});

// Displaying the form for new dishes
router.get("/dishes/new", function(req, res){
    // res.send("Form Page");
    res.render("dishes/new");
});

//Adding new dishes
router.post("/dishes", function(req, res){
    var dish = req.body.dish;
    Dish.create(dish, function(err, dish){
        if(err){
            console.log(err);
        }
        else{
            console.log("Dish added");
            res.redirect("/dishes");
        }
    });
});

// Showing a dish in greater detail
router.get("/dishes/:id", function(req, res){
    Dish.findById(req.params.id).populate("comments").exec(function(err, foundDish){
        if(err){
            console.log(err);
        }
        else{
            // console.log(foundDish);
            res.render("dishes/show", {dish : foundDish});
        }
    });
});

module.exports = router;