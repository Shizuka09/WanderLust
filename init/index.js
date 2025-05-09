const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

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

   const initDB = async () => {
    await Listing.deleteMany({});
    initData.data =  initData.data.map((obj) => ({
      ...obj ,
      owner: "679a39d35f79d9c8b43af720",
      // image: obj.image.url,
      // image: obj.image?.url || "",
      image: {
          filename: obj.image?.filename || "",
         url: obj.image?.url || ""
          
     },
   }));
    await Listing.insertMany(initData.data);
    console.log("data was initalized");
   }

   initDB();