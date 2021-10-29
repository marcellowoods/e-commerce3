const { Product } = require("../models/product");
const Category = require("../models/category");

const mongoose = require("mongoose");
const path = require('path')
require("dotenv").config({path: path.resolve(__dirname, '../.env')});
const cloudinary = require("cloudinary");

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



const getCloudinaryImages = async () => {
    //https://support.cloudinary.com/hc/en-us/articles/202521082-How-to-list-all-images-within-a-folder-

    const imageUrls = [];
    const folderName = process.env.CLOUDINARY_FOLDER;

    await cloudinary.v2.search.expression(
        `folder:${folderName}/*` // add your folder
    ).sort_by('public_id', 'desc').execute().then(
        (result) => {

            const imagesArray = result.resources;
            imagesArray.forEach((imgObj) => imageUrls.push({ url: imgObj.secure_url, public_id: imgObj.public_id }))
        }
    );

    // console.log(imageUrls);
    return imageUrls;
}

const getDbImages = async () => {

    const imageUrls = [];

    const productImages = await Product.aggregate([
        { "$unwind": `$images` },
        {
            "$group": {
                "_id": `$images`,
            }
        }
    ]).exec();

    const categoryImages = await Category.aggregate([
        {
            "$group": {
                "_id": `$image`,
            }
        }
    ]).exec();

    productImages.forEach((imgObj) => imageUrls.push(imgObj._id));
    categoryImages.forEach((imgObj) => imageUrls.push(imgObj._id));

    return imageUrls;
}

const getRedundantImages = async () => {

    const cloudinaryImages = await getCloudinaryImages();
    const dbImages = await getDbImages();

    const redundantImages = cloudinaryImages.filter(({ url, public_id }) => {
        return !dbImages.includes(url);
    })

    return redundantImages;

}


const removeRedundantImages = async () => {

    //each image in cloudinary which is not used in category or product should be removed
    //this is necessary to for cloudinary cleanup 
    //beacause admins could have uploaded images but did not submit a product or category

    // array of objects {url, public_id}
    const redundantImages = await getRedundantImages();

    redundantImages.forEach(({ public_id }) => {
        let image_id = public_id;

        cloudinary.uploader.destroy(image_id);

    });

    console.log("ok");
}

//ex node imgCleaner -get
const runWithArg = async (arg)  => {

    if (arg === '-d') {
        removeRedundantImages();
    } else if(arg === '-get') {
        let redundantImgs = await getRedundantImages();
        console.log(redundantImgs);
    }
}

runWithArg(process.argv[2]);


// getCloudinaryImages();
// getDbImages();


