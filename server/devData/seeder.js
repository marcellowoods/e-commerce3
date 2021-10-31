const { Product } = require("../models/product");
const Category = require("../models/category");

const mongoose = require("mongoose");
const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const cloudinary = require("cloudinary");
const slugify = require("slugify");

const { products } = require("./testData");

// console.log(process.env.MONGO_URI);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERR", err));

//https://stackoverflow.com/questions/45771817/specifying-folder-option-does-not-upload-image-to-folder-in-cloudinary
// config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

let slugifyLower = (str) => {
    return slugify(str, { lower: true });
}

const insertProducts = async () => {
    try {
        // await Product.deleteMany()

        const sampleProducts = products.map((product) => {
            return {...product, slug: slugifyLower(product.title)}
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyProducts = async () => {

    try {
        await Product.deleteMany()

        console.log('Products destroyed')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

// if (process.argv[2] === '-d') {
//     destroyData()
// } else {
//     importData()
// }

//ex node seeder -insert-products

const runWithArg = async (arg) => {

    if (arg === 'insert-products') {
        await insertProducts()
    } else if (arg === 'destroy-products') {
        await destroyProducts();
    }
}

runWithArg(process.argv[2]);


// getCloudinaryImages();
// getDbImages();


