const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError= require("../utils/ExpressError.js");
const Reviews = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isreviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");


    //POST Review Route
    router.post("/", validateReview, isLoggedIn,
       wrapAsync(reviewController.createReview));
   
     // Delete Review Route
     router.delete(
       "/:reviewId",
        isLoggedIn,
        isreviewAuthor,
       wrapAsync(reviewController.deleteReview ));

     module.exports = router;