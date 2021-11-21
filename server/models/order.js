const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

// const orderSchema = new mongoose.Schema(
//     {
//         products: [
//             {
//                 product: {
//                     type: ObjectId,
//                     ref: "Product",
//                 },
//                 count: Number,
//                 color: String,
//             },
//         ],
//         paymentIntent: {},
//         orderStatus: {
//             type: String,
//             default: "Not Processed",
//             enum: [
//                 "Not Processed",
//                 "processing",
//                 "Cash On Delivery",
//                 "Dispatched",
//                 "Cancelled",
//                 "Completed",
//             ],
//         },
//         orderdBy: { type: ObjectId, ref: "User" },
//     },
//     { timestamps: true }
// );

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: "Product",
                },
                count: Number,
                color: String,
            },
        ],
        orderStatus: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Completed",
            ],
        },
        orderedBy: { type: ObjectId, ref: "User" },
        deliveryInfo: {
            courrier: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            name: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: true },
            method: {
                type: String,
                default: "home",
                enum: [
                    "home",
                    "office"
                ],
                required: true
            },
            // postalCode: { type: String, required: true },
            // country: { type: String, required: true },
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
