const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
// const uniqueid = require('uniqid');
const asyncHandler = require('express-async-handler');
const { roundToTwo } = require("./utils");

getCartTotal = (cartItems) => {

    const totalPrice = cartItems.reduce((total, product) => {
        return total + (roundToTwo(product.price) * product.count);
    }, 0);

    return roundToTwo(totalPrice);
}

const makeOrderCreator = (withUser = false) => {
    return async (req, res) => {
        const {
            products,
            deliveryInfo,
            totalCost: totalCostFromUser
        } = req.body

        if (products && products.length === 0) {
            res.status(400);
            throw new Error('No order items')
            return;
        } else {

            const cartFromUser = products;
            const cart = [];

            //check for shenanigans
            for (let i = 0; i < cartFromUser.length; i++) {

                let productFromDb = await Product.findById(cartFromUser[i].productId)
                    .select("name")
                    .select("price")
                    .select("quantity")
                    .exec();

                let object = {};
                object.product = productFromDb._id;
                object.name = productFromDb.name;

                object.selectedCount = cartFromUser[i].count;

                if(cartFromUser[i].color){
                    object.selectedColor = cartFromUser[i].color;
                }
                
                const priceFromDb = roundToTwo(productFromDb.price);
                object.price = priceFromDb;

                const availableQuantity = productFromDb.quantity;

                const priceFromUser = roundToTwo(object.price);
                const countFromUser = object.count;

                if (priceFromDb !== priceFromUser) {
                    throw new Error('price error')
                    return;
                }

                if (countFromUser > availableQuantity) {
                    throw new Error('quantity error')
                    return;
                }

                cart.push(object);

            }
            const totalCost = getCartTotal(cartFromUser);

            console.log(cart);

            if (totalCost !== totalCostFromUser) {
                throw new Error('price error')
                return;
            }

            if (withUser) {

                const user = await User.findOne({ email: req.user.email }).exec();

                if (!user) {
                    throw new Error('user error')
                    return;
                }

                const createdOrder = await new Order({
                    deliveryInfo,
                    products: cart,
                    totalCost,
                    orderedBy: user._id,
                }).save();

            } else {

                const createdOrder = await new Order({
                    deliveryInfo,
                    products: cart,
                    totalCost
                }).save();

            }

            let bulkOption = products.map((item) => {
                return {
                    updateOne: {
                        filter: { _id: item.productId },
                        update: { $inc: { quantity: -item.count, sold: +item.count } },
                    },
                };
            });

            let updated = await Product.bulkWrite(bulkOption, {});
            console.log("PRODUCT QUANTITY-- AND SOLD++", updated);
            // console.log("NEW ORDER SAVED", createdOrder);

            res.json({ ok: true });
        }
    }
}

const withUser = makeOrderCreator(true);
const withoutUser = makeOrderCreator(false);
exports.userCreateOrder = asyncHandler(withUser);
exports.createOrder = asyncHandler(withoutUser);