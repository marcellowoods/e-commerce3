const cloudinary = require("cloudinary");

//https://stackoverflow.com/questions/45771817/specifying-folder-option-does-not-upload-image-to-folder-in-cloudinary
//https://support.cloudinary.com/hc/en-us/articles/202521082-How-to-list-all-images-within-a-folder-

// config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadSingleImage = async (image) => {

    const folderName = process.env.CLOUDINARY_FOLDER;

    return await cloudinary.v2.uploader.upload(image, {
        folder: folderName,
        public_id: `${Date.now()}`,
        resource_type: "auto", // jpeg, png
    });

};

const removeSingleImage = async (imageId) => {

    return cloudinary.uploader.destroy(imageId);
}

const removeManyImages = async (imagesIdArray) => {

    for (const imageId of imagesIdArray) {
        await removeSingleImage(imageId);
    }
}

const getAllImages = async () => {
    //https://support.cloudinary.com/hc/en-us/articles/202521082-How-to-list-all-images-within-a-folder-

    const allImages = [];
    const folderName = process.env.CLOUDINARY_FOLDER;

    await cloudinary.v2.search.expression(
        `folder:${folderName}/*` // add your folder
    ).sort_by('public_id', 'desc').execute().then(
        (result) => {

            const imagesArray = result.resources;
            imagesArray.forEach((imgObj) => allImages.push({ url: imgObj.secure_url, public_id: imgObj.public_id }))
        }
    );

    // console.log(allImages);
    return allImages;
}

const getImagesFromUrls = async (imageUrls) => {

    const cloudinaryImages = await getCloudinaryImages();

    let imagesWithIds = [];
    imageUrls.forEach(imgUrl => {
        let imgWithId = cloudinaryImages.find(({ url }) => url == imgUrl);
        if (imgWithId) {
            //{ url: imgObj.secure_url, public_id: imgObj.public_id }
            imagesWithIds.push(imgWithId);
        }
    }
    );

    return imagesWithIds;
}

const removeImagesFromUrls = async (imageUrls) => {

    let imgObjs = getImagesFromUrls(imageUrls);
    let imgIds = imgObjs.map(({public_id}) => public_id);

    await removeManyImages(imgIds);
}




