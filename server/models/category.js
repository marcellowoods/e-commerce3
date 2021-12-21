const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Name is required",
            minlength: [2, "Too short"],
            maxlength: [32, "Too long"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        image: {
            type: String
        },
        description: {
            type: String,
        },
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
                    text: true,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
