const mongoose = require("mongoose");
const Schema = mongoose.Schema ;

const listingSchema = new Schema ({
    title :{
        type : String ,
        required : true ,
    },
    description : String ,
      
    image: {
         type: String,
         default:
              "https://images.unsplash.com/photo-1234567890123?ixid=xyz&auto=format&fit=crop&w=500&q=60",
         set: (v) => 
            v === ""
         ? "https://unsplash.com/photos/brown-and-black-wooden-house-TiVPTYCG_3E"
         : v,
    },
    
    price : Number ,
    location : String,
    country : String ,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing ;

