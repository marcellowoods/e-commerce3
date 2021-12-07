const Product = require("../models/product");
const Category = require("../models/category");
const Order = require("../models/order");

const mongoose = require("mongoose");
const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const cloudinary = require("cloudinary");
const slugify = require("slugify");

const { products, orders } = require("./testData");

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
            return { ...product, slug: slugifyLower(product.name) }
        })

        await Product.insertMany(sampleProducts)

        console.log('Products Imported!')
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

const insertOrders = async () => {
    try {

        await Order.insertMany(orders)

        console.log('Orders Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyOrders = async () => {

    try {
        await Order.deleteMany()

        console.log('Orders destroyed')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

//ex node seeder insert-products
const runWithArg = async (arg) => {

    switch (arg) {

        case 'insert-products':
            await insertProducts();
            break;
        case 'destroy-products':
            await destroyProducts();
            break;
        case 'insert-orders':
            await insertOrders();
            break;
        case 'destroy-orders':
            await destroyOrders();
            break;

    }
}

runWithArg(process.argv[2]);


