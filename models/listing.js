const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const listingSchema = new Schema ({
    title :{
        type : String ,
        required : true ,
    },
    description : String ,
    image: {
         type : Object ,
         required : true ,
        default: 
            "https://unsplash.com/photos/brown-and-black-wooden-house-TiVPTYCG_3E",
        set : (v) => 
            v === ""
         ? "https://unsplash.com/photos/brown-and-black-wooden-house-TiVPTYCG_3E"
         : v,
        // imageUrl:
        //  { type: String, default: "https://unsplash.com/photos/default-image" },

    },
    price : Number ,
    location : String,
    country : String ,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing ;