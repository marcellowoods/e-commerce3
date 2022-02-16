const User = require("../models/user");
const Order = require("../models/order");

exports.getOrders = async (req, res) => {
    let user = await User.findOne({ email: req.user.email }).exec();

    let userOrders = await Order.find({ orderedBy: user._id })
        .sort({ createdAt: -1 })
        .populate("products.product")
        .exec();

    res.json(userOrders);
};

// exports.saveAddress = async (req, res) => {
//     const userAddress = await User.findOneAndUpdate(
//         { email: req.user.email },
//         { address: req.body.address }
//     ).exec();

//     res.json({ ok: true });
// };

// exports.addToWishlist = async (req, res) => {
//     const { productId } = req.body;

//     const user = await User.findOneAndUpdate(
//         { email: req.user.email },
//         { $addToSet: { wishlist: productId } }
//     ).exec();

//     res.json({ ok: true });
// };

// exports.wishlist = async (req, res) => {
//     const list = await User.findOne({ email: req.user.email })
//         .select("wishlist")
//         .populate("wishlist")
//         .exec();

//     res.json(list);
// };


// exports.removeFromWishlist = async (req, res) => {
//     const { productId } = req.params;
//     const user = await User.findOneAndUpdate(
//         { email: req.user.email },
//         { $pull: { wishlist: productId } }
//     ).exec();

//     res.json({ ok: true });
// };

