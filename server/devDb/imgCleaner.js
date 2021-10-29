const { Product } = require("./models/product");
const Category = require("./models/category");

const mongoose = require("mongoose");
require("dotenv").config();
const cloudinary = require("cloudinary");

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
//https://support.cloudinary.com/hc/en-us/articles/202521082-How-to-list-all-images-within-a-folder-
// config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folderName = "e3";

const getCloudinaryImages = async () => {
    //https://support.cloudinary.com/hc/en-us/articles/202521082-How-to-list-all-images-within-a-folder-
    const imageUrls = [];
    await cloudinary.v2.search.expression(
        `folder:${folderName}/*` // add your folder
    ).sort_by('public_id', 'desc').execute().then(
        (result) => {

            const imagesArray = result.resources;
            imagesArray.forEach((imgObj) => imageUrls.push({ url: imgObj.url, public_id: imgObj.public_id }))
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
    // console.log(imageUrls)
    return imageUrls;
}

const getRedundantImages = async () => {

    const cloudinaryImages = await getCloudinaryImages();
    const dbImages = await getDbImages();

    // console.log(dbImages);
    // console.log(cloudinaryImages);

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

    // console.log(redundantImages);
}

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

// getCloudinaryImages();
// getDbImages();
removeRedundantImages();

