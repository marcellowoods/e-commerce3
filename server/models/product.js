const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
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
        quantity: Number,
        sold: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
        },
        color: {
            type: String,
            // enum: ["Black", "Brown", "Silver", "White", "Blue"],
        },
        sizes: [
            {
                lowerBound: {
                    type: Number,
                },
                upperBound: {
                    type: Number,
                },
                stepSize: {
                    type: Number,
                } 
            },
        ],
        // ratings: [
        //     {
        //         star: Number,
        //         postedBy: { type: ObjectId, ref: "User" },
        //     },
        // ],
        translations: [
            {
                lang: {
                    type: String,
                },
                name: {
                    type: String,
                },
                description: {
                    type: String,
                    maxlength: 2000,
                    text: true,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
