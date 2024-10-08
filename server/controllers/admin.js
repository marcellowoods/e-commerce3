const Order = require("../models/order");
const Product = require("../models/product");
const { sendShippedOrderEmail } = require("./systems/SendEmails/sendOrderEmail");

//orders, orderStatus

//WITHOUT PAGINATION
// exports.orders = async (req, res) => {
//     let orders = await Order
//         .find({})
//         .sort("-createdAt")
//         .populate("products.product")
//         .exec();

//     res.json(orders);
// };

// WITH PAGINATION
exports.orders = async (req, res) => {
    // console.table(req.body);
    try {

        const { hideCompleted, page } = req.body;
        const currentPage = page || 1;
        const perPage = 6; // 3

        const skip = (currentPage - 1) * perPage;

        let sortObj = { createdAt: -1 };

        const match = [];
        if (hideCompleted) {
            match.push({ $match: { orderStatus: { $ne: "Completed" } } })
        }

        const data = await Order.aggregate([
            ...match,
            {
                $facet: {
                    metadata: [{ $count: 'total' }],
                    data: [{ $sort: sortObj }, { $skip: skip }, { $limit: perPage }]
                }
            }
        ]).exec();

        await Product.populate(data, { path: "data.products.product" });

        res.json(data[0]);
    } catch (err) {
        console.log(err);
    }
};

exports.orderStatus = async (req, res) => {
    try {

        const { orderId, orderStatus } = req.body;

        let updated = await Order
            .findByIdAndUpdate(orderId, { orderStatus }, { new: true })
            .populate("products.product")
            .exec();

        if (updated.orderStatus == "Dispatched") {
            sendShippedOrderEmail(updated);
        }

        res.json(updated);
    } catch (err) {
        console.log(err);
    }

};
