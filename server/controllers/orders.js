const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
// const uniqueid = require('uniqid');
const asyncHandler = require('express-async-handler');

// console.log(parseFloat("1.555").toFixed(2));

exports.createOrder = asyncHandler(async (req, res) => {
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

        let totalCostFromDb = 0;

        const cartFromUser = products;
        for (let i = 0; i < cartFromUser.length; i++) {

            // let object = {};

            // object.product = cartFromUser[i]._id;
            // object.count = cartFromUser[i].count;
            // object.color = cart[i].color;
            // get price for creating total
            let productFromDb = await Product.findById(cartFromUser[i].productId)
                .select("price")
                .select("quantity")
                .exec();

            const priceFromDb = +productFromDb.price.toFixed(2);
            const quantityFromDb = productFromDb.quantity;

            const priceFromUser = +cartFromUser[i].price.toFixed(2);
            const countFromUser = cartFromUser[i].count;

            if (priceFromDb !== priceFromUser) {
                throw new Error('price error')
                return;
            }

            if (countFromUser > quantityFromDb) {
                throw new Error('quantity error')
                return;
            }

            totalCostFromDb += +((priceFromDb * countFromUser).toFixed(2));
            
        }

        if (+totalCostFromDb.toFixed(2) !== +totalCostFromUser.toFixed(2)) {
            throw new Error('price error')
            return;
        }

        const createdOrder = await new Order({
            deliveryInfo,
            products,
            totoalCost: totalCostFromDb,
        }).save();

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
        console.log("NEW ORDER SAVED", createdOrder);

        res.json({ ok: true });
    }
})

exports.userCreateOrder = asyncHandler(async (req, res) => {
    const {
        user,
        products,
        deliveryInfo,
        totalCost: totalCostFromUser
    } = req.body

    if (products && products.length === 0) {
        res.status(400);
        throw new Error('No order items')
        return;
    } else {

        let totalCostFromDb = 0;

        const cartFromUser = products;
        for (let i = 0; i < cartFromUser.length; i++) {

            // let object = {};

            // object.product = cartFromUser[i]._id;
            // object.count = cartFromUser[i].count;
            // object.color = cart[i].color;
            // get price for creating total
            let productFromDb = await Product.findById(cartFromUser[i].productId)
                .select("price")
                .select("quantity")
                .exec();

            const priceFromDb = +productFromDb.price.toFixed(2);
            const quantityFromDb = productFromDb.quantity;

            const priceFromUser = +cartFromUser[i].price.toFixed(2);
            const countFromUser = cartFromUser[i].count;

            if (priceFromDb !== priceFromUser) {
                throw new Error('price error')
                return;
            }

            if (countFromUser > quantityFromDb) {
                throw new Error('quantity error')
                return;
            }

            totalCostFromDb += +((priceFromDb * countFromUser).toFixed(2));
            
        }

        if (+totalCostFromDb.toFixed(2) !== +totalCostFromUser.toFixed(2)) {
            throw new Error('price error')
            return;
        }

        const user = await User.findOne({ email: user.email }).exec();

        if (!user) {
            throw new Error('user error')
            return;
        }

        const createdOrder = await new Order({
            deliveryInfo,
            products,
            totoalCost: totalCostFromDb,
            orderedBy: user._id,
        }).save();

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
        console.log("NEW ORDER SAVED", createdOrder);

        res.json({ ok: true });
    }
})