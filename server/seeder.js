// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import colors from 'colors'
// import users from './data/users.js'
// import products from './data/products.js'
// import User from './models/userModel.js'
// import Product from './models/productModel.js'
// import Order from './models/orderModel.js'
// import connectDB from './config/db.js'

// dotenv.config()

const mongoose = require("mongoose");
require("dotenv").config();
const cloudinary = require("cloudinary");

//https://stackoverflow.com/questions/45771817/specifying-folder-option-does-not-upload-image-to-folder-in-cloudinary
//https://support.cloudinary.com/hc/en-us/articles/202521082-How-to-list-all-images-within-a-folder-
// config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folderName = "e3";

const getImages = async () => {
    //https://support.cloudinary.com/hc/en-us/articles/202521082-How-to-list-all-images-within-a-folder-
    const imageUrls = [];
    await cloudinary.v2.search.expression(
        `folder:${folderName}/*` // add your folder
    ).sort_by('public_id', 'desc').max_results(30).execute().then(
        (result) => {
            // console.log(result)
            const imagesArray = result.resources;
            imagesArray.forEach((imgObj) => imageUrls.push(imgObj.url))
        }
    );
    console.log(imageUrls);
}


// mongoose
//     .connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log("DB CONNECTED"))
//     .catch((err) => console.log("DB CONNECTION ERR", err));

// const importData = async () => {
//     try {
//         await Order.deleteMany()
//         await Product.deleteMany()
//         await User.deleteMany()

//         const createdUsers = await User.insertMany(users)

//         const adminUser = createdUsers[0]._id

//         const sampleProducts = products.map((product) => {
//             return { ...product, user: adminUser }
//         })

//         await Product.insertMany(sampleProducts)

//         console.log('Data Imported!'.green.inverse)
//         process.exit()
//     } catch (error) {
//         console.error(`${error}`.red.inverse)
//         process.exit(1)
//     }
// }

// const destroyData = async () => {
//     try {
//         await Order.deleteMany()
//         await Product.deleteMany()
//         await User.deleteMany()

//         console.log('Data Destroyed!'.red.inverse)
//         process.exit()
//     } catch (error) {
//         console.error(`${error}`.red.inverse)
//         process.exit(1)
//     }
// }

// if (process.argv[2] === '-d') {
//     destroyData()
// } else {
//     importData()
// }

getImages();


