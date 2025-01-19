  const { required } = require("joi");
const mongoose = require("mongoose");
  const Schema = mongoose.Schema ;
  const Review = require("./review.js");

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
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : "Review",
       },
      ],
    });

    listingSchema.post("findOneAndDelete", async(listing) =>{
     if(listing){
          await Review.deleteMany({_id : {$in: listing.reviews}});
     }

    });

    const Listing = mongoose.model("Listing", listingSchema);
    module.exports = Listing ;

