const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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


app.get("/" , (req,res,next) => {
    res.send ("Hii , I am root");
   next()
});

  //INDEX ROUTE
app.get("/listings", async (req,res) => {
  const allListings = await Listing.find ({});
  res.render("listings/index.ejs", {allListings});
    });

       //NEW ROUTE
app.get("/listings/new" ,(req,res) =>{
  res.render("listings/new.ejs");
});

    //SHOW ROUTE 
app.get("/listings/:id" , async (req,res) =>{
    let {id} = req.params ;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{ listing });
});

   //CREATE ROUTE 
   app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

   //EDIT ROUTE 
app.get("/listings/:id/edit", async(req,res) =>{
  let {id} = req.params ;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});
})

     //  UPDATE ROUTE
app.put("/listings/:id" , async (req,res) => {
  let {id} = req.params ;
 await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
});

    // DELETE ROUTE 
app.delete("/listings/:id", async(req,res) => {
  let {id} = req.params ;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});



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

app.listen(8080,() =>{
    console.log("server is listening to port 8080");
});
