var mongooose = require('mongoose'),
    Dish      = require('./models/dish'),
    Comment   = require('./models/comment');

var data = [
    {
        name : "Kadhai Paneer",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAKH1qzFgIRTvzB-z4kZNMEh5gshWyXQyd500jQAnCYGGf4jeI&usqp=CAU",
        description : "Spicy gravy with onions "
    },
    {
        name : "Paneer Butter Masala",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcReifcGdReb2bFoQAF7LcPQceREDXlas0sH8cR39LRMFKkuwfxo&usqp=CAU",
        description : "Butter gravy with corainder and spices"
    },
    {
        name : "Honey Chili Potato",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMXLFJqz7yi0PovVKSUIp4Gfi-M0YEKYHlBQdPl6AYnjEPII56&usqp=CAU",
        description : "Has the right blend of chili and honey to give you the perfect flavour"
    },
    {
        name : "Paneer Handi",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3GtuqMJB6vcrlZvS3aDh9AER0c7c5TgnvOIZ5CNxcGFKePyHF&usqp=CAU",
        description : "The very spice you like...."
    },
    {
        name : "Masala Dosa",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSYfHQEGvmIACyuv7uDYP3bsaAJJKD-yb69NDyRYG2umOq8TmcT&usqp=CAU",
        description : "South India in North India"
    },
    {
        name : "Garlic Naan",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOW9iE2S5G3oVQsddf7S6_VqATqFuOPPxrxCGfEB9XOfKgYPp7&usqp=CAU",
        description : "Garlic King"
    }
];

function seedDB(){
    Dish.remove({}, function(err, dishes){
        if(err){
            console.log(err);
        }
        console.log("dish removed");
        data.forEach(function(seed){
            Dish.create(seed, function(err, dish){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("dish added");
                    Comment.create(
                        {
                            text : "Food is good, but i wish there was wi-fi .",
                            author : "Homer"
                        },
                        function(err, comment){
                            if(err){
                                console.log(err)
                            }
                            else{
                                dish.comments.push(comment);
                                dish.save();
                                console.log("created new comment");
                            }
                        }
                    );
                }
            });
        });
    });
}

module.exports = seedDB;