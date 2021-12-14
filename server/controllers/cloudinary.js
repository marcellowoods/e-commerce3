const {
    uploadSingleImage,
    removeSingleImage,
    getImagesFromUrls,
} = require("./systems/cloudinaryImages");

// req.files.file.path
exports.upload = async (req, res) => {

    // const folderName = process.env.CLOUDINARY_FOLDER;

    try {

        const image = req.body.image;
        let result = await uploadSingleImage(image);

        res.json({
            public_id: result.public_id,
            url: result.secure_url,
        });

    } catch (err) {
        // res.json({ success: false, err });
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }

};



exports.remove = async (req, res) => {
    let image_id = req.body.public_id;

    try {

        await removeSingleImage(image_id);
        res.send("ok");
    } catch (err) {
        res.status(400).json({
            err: err.message,
        });
    }


};

exports.getImagesWithIds = async (req, res) => {

    try {

        const imageUrls = req.body.imageUrls;

        const imagesWithIds = await getImagesFromUrls(imageUrls);
    
        res.json(imagesWithIds);

    } catch (err) {

        console.log(err);
        res.status(400).json({
            err: err.message,
        });

    }

}


