const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
            text: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 32,
        },
        category: {
            type: ObjectId,
            ref: "Category",
        },
        subs: [
            {
                type: ObjectId,
                ref: "Sub",
            },
        ],
        quantity: Number,
        sold: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
        },
        shipping: {
            type: String,
            enum: ["Yes", "No"],
        },
        color: {
            type: String,
            enum: ["Black", "Brown", "Silver", "White", "Blue"],
        },
        brand: {
            type: String,
            enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
        },
        ratings: [
            {
                star: Number,
                postedBy: { type: ObjectId, ref: "User" },
            },
        ],
    },
    { timestamps: true }
);

// module.exports = mongoose.model("Product", productSchema);

const findProperties = {
    "subs": "subs.slug",
    "category": "category.slug",
}



let addFieldsObj = {
    rating: {
        $ifNull: [{
            $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
        }, "no rating yet"]
    }
}

//https://stackoverflow.com/questions/23802834/multilingual-data-modeling-on-mongodb
exports.findProperties = findProperties;

exports.addFieldsObj = addFieldsObj;

exports.Product = mongoose.model("Product", productSchema);
