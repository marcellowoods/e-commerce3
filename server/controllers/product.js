const Product = require("../models/product");

const slugify = require("slugify");

// translations.load();

let slugifyLower = (str) => {
    return slugify(str, { lower: true });
}

exports.create = async (req, res) => {

    try {
        // console.log(req.body);
        req.body.slug = slugifyLower(req.body.name);
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
        const { sort, order, page } = req.body;
        const currentPage = page || 1;
        const perPage = 6; // 3

        const skip = (currentPage - 1) * perPage;

        let sortObj = null;
        if(sort == "best sellers"){
            sortObj = { sold: -1 };
        }else if(sort == "new"){
            sortObj = { createdDate: -1 };
        }


        const data = await Product.aggregate([
            // { $match: { ...match } },
            {
                $facet: {
                    metadata: [{ $count: 'total' }],
                    data: [{ $sort: sortObj }, { $skip: skip }, { $limit: perPage }]
                }
            }
        ]).exec();

        // const products = await Product.find({})
        //     .skip((currentPage - 1) * perPage)
        //     .populate("category")
        //     .populate("subs")
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


