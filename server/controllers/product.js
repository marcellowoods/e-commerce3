const Product = require("../models/product");
const { removeImagesFromUrls } = require("./systems/cloudinaryImages");
const slugify = require("slugify");
const mongoose = require("mongoose");

const {
    getCloudinaryImages
} = require("./cloudinary");

// translations.load();

let slugifyLower = (str) => {
    return slugify(str, { lower: true });
}

exports.create = async (req, res) => {

    try {
        // console.log(req.body);
        req.body.slug = slugifyLower(req.body.name);
        // req.body.lang = req.body.language;

        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (err) {
        console.log(err);
        // res.status(400).send("Create product failed");
        res.status(400).json({
            err: err.message,
        });
    }
};

exports.listAll = async (req, res) => {

    let products = null;

    let limitCount = req.params.count;

    if (limitCount) {
        products = await Product.find({})
            .limit(parseInt(limitCount))
            .populate("category")
            .sort([["createdAt", "desc"]])
            .exec();
    } else {
        products = await Product.find({})
            .populate("category")
            .sort([["createdAt", "desc"]])
            .exec();
    }

    res.json(products);
};

exports.remove = async (req, res) => {
    try {
        const slug = req.params.slug;
        const deleted = await Product.findOneAndRemove({
            slug
        }).exec();
        const imagesToRemove = deleted.images;
        await removeImagesFromUrls(imagesToRemove);
        res.json(deleted);
    } catch (err) {
        console.log(err);
        return res.staus(400).send("Product delete failed");
    }
};

exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .exec();
    res.json(product);
};

exports.readById = async (req, res) => {
    const product = await Product.findById( req.params.id )
        .populate("category")
        .exec();
    res.json(product);
};


exports.update = async (req, res) => {

    try {
        if (req.body.name) {
            req.body.slug = slugifyLower(req.body.name);
            // console.log(req.body)
        }
        const updated = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();
        res.json(updated);
    } catch (err) {
        console.log("PRODUCT UPDATE ERROR ----> ", err);
        // return res.status(400).send("Product update failed");
        res.status(400).json({
            err: err.message,
        });
    }
};

// WITH PAGINATION
exports.list = async (req, res) => {
    // console.table(req.body);
    try {

        // createdAt/updatedAt, desc/asc, 3
        const { sort, category, page } = req.body;
        const currentPage = page || 1;
        const perPage = 6; // 3

        const skip = (currentPage - 1) * perPage;


        let sortObj = [];
        if (sort == "best sellers") {
            sortObj.push({ $sort: { sold: -1 } });

        } else if (sort == "new") {
            sortObj.push({ $sort: { createdAt: -1 } });
        }

        let categoryMatch = [];
        if (category) {
            categoryMatch.push({ $match: { category: new mongoose.Types.ObjectId(category) } });
        }


        const data = await Product.aggregate([
            { $match: { quantity: { $gte: 1 } } }, //quantity must be greater then equal to one
            ...categoryMatch,
            {
                $facet: {
                    metadata: [{ $count: 'total' }],
                    data: [
                        ...sortObj,
                        { $skip: skip },
                        { $limit: perPage }
                    ]
                }
            }
        ]).exec();

        // const products = await Product.find({})
        //     .skip((currentPage - 1) * perPage)
        //     .populate("category")
        //     .sort([[sort, order]])
        //     .limit(perPage)
        //     .exec();

        res.json(data[0]);
    } catch (err) {
        console.log(err);
    }
};

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
};

exports.listRelated = async (req, res) => {

    try {
        const product = await Product.findById(req.params.productId).exec();


        const related = await Product.find({
            _id: { $ne: product._id },
            category: product.category,
        })
            .limit(3)
            .populate("category")
            .populate("postedBy")
            .exec();

        res.json(related);
    } catch (err) {
        res.status(400).json({
            err: err.message,
        });
    }

};

// SERACH / FILTER
exports.getProductsByText = async (req, res) => {

    try {
        const query = req.params.text;
        const page = req.params.page;

        //using regex
        const keyword = {
            title: {
                $regex: query,
                $options: 'i',
            },
        }

        const currentPage = page || 1;
        const perPage = 6; // 3

        const skip = (currentPage - 1) * perPage;


        //add fields
        //https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields

        //How to get all result if unwind field does not exist in mongodb
        // {
        //     $unwind:
        //       {
        //         path: "$translations",
        //         preserveNullAndEmptyArrays: true
        //       }
        //   }

        const data = await Product.aggregate([

            {
                $addFields: {
                    translationsCopy: "$translations",
                }
            },
            {
                $unwind: {
                    path: `$translationsCopy`,
                    preserveNullAndEmptyArrays: true
                }
            },
            { $match: { quantity: { $gte: 1 } } }, //quantity must be greater then equal to one

            {
                $match:
                {
                    $or: [
                        {
                            name: {
                                $regex: query,
                                $options: 'i',
                            }
                        },
                        {
                            "translationsCopy.name": {
                                $regex: query,
                                $options: 'i',
                            }
                        },
                        {
                            "translationsCopy.description": {
                                $regex: query,
                                $options: 'i',
                            }
                        }
                    ]
                }

            },
            {
                $facet: {
                    metadata: [{ $count: 'total' }],
                    data: [
                        { $skip: skip },
                        { $limit: perPage }
                    ]
                }
            }
        ]).exec();

        res.json(data[0]);

    } catch (err) {
        res.status(400).json({
            err: err.message,
        });
    }


};

exports.listBySlugs = async (req, res) => {

    try {
        let slugs = req.params.slugs.split(',');

        console.log(slugs);
        console.log("LIST BY SLUGS")

        let products = await Product.find(
            { slug: { $in: slugs } }
        )

        res.json(products);
    } catch (err) {
        res.status(400).json({
            err: err.message,
        });
    }

};







