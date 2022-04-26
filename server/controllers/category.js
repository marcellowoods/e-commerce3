const Category = require("../models/category");
const Product  = require("../models/product");
const Sub = require("../models/sub");
const slugify = require("slugify");
const { removeImagesFromUrls } = require("./systems/cloudinaryImages");

let slugifyLower = (str) => {
    return slugify(str, { lower: true });
}

exports.create = async (req, res) => {
    try {
        const { name, description, translations, image } = req.body;

        console.log(translations);

        res.json(await new Category({
            name,
            description,
            translations,
            image,
            slug: slugify(name)
        }).save());

    } catch (err) {
        console.log(err);
        
        res.status(400).send("Create category failed, category may already exist");
    }
};

exports.list = async (req, res) => {

    // res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
    res.json(await Category.find({}).sort({ updatedAt: 1 }).exec());
}
    

exports.read = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
    // const products = await Product.find({ category }).populate("category").exec();

    // res.json({
    //     category,
    //     products,
    // });
};

exports.update = async (req, res) => {

    req.body.slug = slugifyLower(req.body.name);
    
    try {
        const updated = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Category update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const slug = req.params.slug;
        const deleted = await Category.findOneAndDelete({ slug });
        const image = deleted.image;
        const imagesToRemove = [image];
        await removeImagesFromUrls(imagesToRemove);
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Category delete failed");
    }
};

exports.getSubs = (req, res) => {
    Sub.find({ parent: req.params._id }).exec((err, subs) => {
        if (err) console.log(err);
        res.json(subs);
    });
};
