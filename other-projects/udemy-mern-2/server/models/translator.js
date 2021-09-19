const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const translatorSchema = new mongoose.Schema(
    {
        forSchema: {
            type: String,
            trim: true,
            required: true,
            text: true,
        },
        words: [
            {
                word: String,
                translations: [{ lang: String, word: String }],
            },
        ],
    },
    { timestamps: true }
);


module.exports = mongoose.model("Translator", translatorSchema);
