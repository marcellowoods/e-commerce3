const { findProperties, addFieldsObj, Product } = require("../models/product");
const CreateFacetedSearch = require("./systems/FiltersAndSearch/FacetFilters.js");
const CreateProductSearch = require("./systems/FiltersAndSearch/ProductSearch.js");

const { addTranslationsToFilters,
    getTranslationsForProperties,
    getTranslationsForFields } = require("./systems/FiltersAndSearch/addTranslate.js");

const createLoader = require("./systems/loadTranslate");

const User = require("../models/user");
const slugify = require("slugify");

let translations = createLoader("product");

translations.load();

let slugifyLower = (str) => {
    return slugify(str, { lower: true });
}

exports.create = async (req, res) => {

    try {
        // console.log(req.body);
        req.body.slug = slugifyLower(req.body.title);
        console.log(req.body);
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
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate("category")
        .populate("subs")
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(products);
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndRemove({
            slug: req.params.slug,
        }).exec();
        res.json(deleted);
    } catch (err) {
        console.log(err);
        return res.staus(400).send("Product delete failed");
    }
};

exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("subs")
        .exec();
    res.json(product);
};

exports.update = async (req, res) => {

    try {
        if (req.body.title) {
            req.body.slug = slugifyLower(req.body.title);
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

// WITHOUT PAGINATION
// exports.list = async (req, res) => {
//   try {
//     // createdAt/updatedAt, desc/asc, 3
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

// WITH PAGINATION
exports.list = async (req, res) => {
    // console.table(req.body);
    try {
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        const currentPage = page || 1;
        const perPage = 3; // 3

        const products = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate("category")
            .populate("subs")
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(products);
    } catch (err) {
        console.log(err);
    }
};

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
};

exports.productStar = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    // who is updating?
    // check if currently logged in user have already added rating to this product?
    let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
    );

    // if user haven't left rating yet, push it
    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(
            product._id,
            {
                $push: { ratings: { star, postedBy: user._id } },
            },
            { new: true }
        ).exec();
        console.log("ratingAdded", ratingAdded);
        res.json(ratingAdded);
    } else {
        // if user have already left rating, update it
        // const ratingUpdated = await Product.updateOne(
        //   {
        //     ratings: { $elemMatch: existingRatingObject },
        //   },
        //   { $set: { "ratings.$.star": star } },
        //   { new: true }
        // ).exec();

        // console.log("ratingUpdated", ratingUpdated);
        // res.json(ratingUpdated);

        existingRatingObject.star = star;
        const updatedProduct = await product.save({ validateBeforeSave: true });
        res.status(200).json({ updatedProduct });

    }
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
            .populate("subs")
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

    const query = req.query.title;

    //using regex
    const keyword = {
        title: {
            $regex: query,
            $options: 'i',
        },
    }

    //using text search
    // const keyword = { $text: { $search: query } }

    const products = await Product.find(keyword)
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();

    res.json(products);
};



let productLookupArray = [
    {
        $lookup:
        {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category"
        }
    },

    {
        $lookup:
        {
            from: "subs",
            localField: "subs",
            foreignField: "_id",
            as: "subs"
        }
    },
]

let getFacetFilters = CreateFacetedSearch({
    mongooseSchema: Product,
    addFieldsObj,
    lookupArray: productLookupArray,
    regexArray: ['title'],
    avoidPropertiesArray: ['title', 'images', 'description', 'slug', 'ratings'],
    minMaxArray: ["price"],
    convertPropertyObj: findProperties
});

let getProducts = CreateProductSearch({
    mongooseSchema: Product,
    addFieldsObj,
    lookupArray: productLookupArray,
    regexArray: ['title'],
    minMaxArray: ["price"],
    convertPropertyObj: findProperties
})



exports.getProductsByFilter = async (req, res) => {

    try {
        // createdAt/updatedAt, desc/asc, 3
        let { sort, order, page } = req.body;

        let filters = req.body.filters;

        !sort && (sort = "createdAt");
        !order && (order = "asc");
        !page && (page = 1);

        const perPage = 3; // 3

        // let pages = Math.ceil(count / perPage);

        let products = await getProducts(filters, (page - 1) * perPage, perPage);

        res.json(products);


    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

exports.getFilters = async (req, res) => {
    console.log("filters");
    let fil = req.body.filters;
    console.log(fil);


    try {
        // createdAt/updatedAt, desc/asc, 3
        let { sort, order, page } = req.body;

        let lang = "bg";

        let filters = req.body.filters;

        !sort && (sort = "createdAt");
        !order && (order = "asc");
        !page && (page = 1);

        // let pages = Math.ceil(count / perPage);

        let facetFilters = await getFacetFilters(filters);
        addTranslationsToFilters(facetFilters, translations.data, lang);

        res.json(facetFilters);


    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

exports.getAllFields = async (req, res) => {

    try {
        // createdAt/updatedAt, desc/asc, 3

        let filtersFacet = {};

        for (let property of ['shipping', 'color', 'brand']) {

            let idText = (property in findProperties) ? findProperties[property] : property;

            filtersFacet[property] = [{
                "$group": {
                    "_id": `$${idText}`,
                }
            }]

        }

        const aggregate = await Product.aggregate([
            // ...productLookupArray,
            {
                $facet: { ...filtersFacet }
            }
        ]).exec();

        let allFilters = aggregate[0];
        console.log(allFilters);

        let allFields = [...Object.keys(Product.schema.obj), ...Object.keys(addFieldsObj)]

        let translatedProperties = getTranslationsForProperties(allFields, translations.data, ['bg', 'en', 'de'])
        let translatedFields = getTranslationsForFields(allFilters, translations.data, ['bg', 'en', 'de'])

        let words = { ...translatedProperties, ...translatedFields };

        res.json(words);


    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

exports.addTranslations = async (req, res) => {

    try {
        // createdAt/updatedAt, desc/asc, 3
        // let forSchema = req.body.forSchema;
        let words = req.body.words;

        await translations.save(words);
        res.json("saved");


    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
};


