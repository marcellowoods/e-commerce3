const cloudinary = require("cloudinary");

//https://stackoverflow.com/questions/45771817/specifying-folder-option-does-not-upload-image-to-folder-in-cloudinary
//https://support.cloudinary.com/hc/en-us/articles/202521082-How-to-list-all-images-within-a-folder-

// config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.upload = async (req, res) => {

    const folderName = process.env.CLOUDINARY_FOLDER;

    let result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: folderName,
        public_id: `${Date.now()}`,
        resource_type: "auto", // jpeg, png
    });
    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    });
};

exports.remove = (req, res) => {
    let image_id = req.body.public_id;

    cloudinary.uploader.destroy(image_id, (err, result) => {
        if (err) return res.json({ success: false, err });
        res.send("ok");
    });
};
