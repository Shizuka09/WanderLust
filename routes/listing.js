const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router 
   .route("/")
   .get(wrapAsync(listingController.index))
   // .post(isLoggedIn,
   //    validateListing ,
   //    wrapAsync(listingController.CreateListing)
   // );
     .post(upload.single('listing[image]'),(req,res) =>{
      res.send(req.file);
     })

   //NEW ROUTE
      router.get("/new" ,isLoggedIn ,
      wrapAsync(listingController.renderNewForm ));

   
router
   .route("/:id")
   .get(wrapAsync(listingController.showListing))
   .put(isLoggedIn, 
      isOwner,
      validateListing ,
      wrapAsync(listingController.updateListing))
   .delete(isLoggedIn, 
      isOwner ,
      wrapAsync(listingController.deleteListing));

  
     //EDIT ROUTE 
    router.get("/:id/edit",isLoggedIn, isOwner ,
     wrapAsync(listingController.editListing));
   

  module.exports = router;