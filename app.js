const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsyc.js");
const ExpressError= require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Reviews = require("./models/review.js");

const listings = require("./routes/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// const MONGO_URL = "mongodb+srv://wander-lust:VVuigWo4IAr4fLNv@cluster0.7cqzx.mongodb.net/";

main()
   .then (() => {
    console.log("connected to DB");
   })
   .catch((err) => {
    console.log(err);
   });

   async function main () {
    await mongoose.connect(MONGO_URL);
   }

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/" , wrapAsync((req,res) => {
    res.send ("Hii , I am root");
}));



app.use("/listings", listings);

const validateReview = (req,res,next) => {
  let {error} = reviewSchema.validate(req.body);
      if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
      }
      else{
        next();
      }
};
     //POST Review Route
  app.post("/listings/:id/reviews", validateReview, wrapAsync(async(req,res) =>{
     let listing = await Listing.findById(req.params.id);
     let newReview = new Reviews(req.body.review);

     listing.reviews.push(newReview);

     await newReview.save();
     await listing.save();

     res.redirect(`/listings/${listing._id}`);
  }));

  // Delete Review Route
  app.delete(
    "/listings/:id/reviews/:reviewId",
    wrapAsync(async (req,res) => {
      let{id, reviewId} = req.params ;

      await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}});
      await Reviews.findByIdAndDelete(reviewId);

      res.redirect(`/listings/${id}`);
    })
  );



// app.get("/testListing" , async(sq,res) =>{
//     let sampleListing = new Listing ({
//         title : "Dream House",
//         Description: " A House with beautiful Garden",
//         Price : 4800,
//         location : "Ranchi",
//         Country : "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.use("*",(req,res,next) => {
  next(new ExpressError(404,"Page Not Found!"));
});

app.use((err,req,res,next) =>{
  let{statusCode = 500, message="Something went wrong"} = err ;
  res.status(statusCode).render("error.ejs",{message});
  // res.status(statusCode).send(message);
});

app.listen(8080,() =>{
    console.log("server is listening to port 8080");
});
