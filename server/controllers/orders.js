const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
// const uniqueid = require('uniqid');
const asyncHandler = require('express-async-handler');
const { roundToTwo } = require("./utils");
const { sendCreatedOrderEmail } = require("./systems/SendEmails/sendOrderEmail");

const { selectedCourier } = require("./orderOptions");


const sendOrderEmail = () => {
    //https://www.courier.com/blog/how-to-send-emails-with-node-js/
    //https://www.reddit.com/r/webdev/comments/dnnoit/is_sendgrid_100_emails_per_day_or_month/
    //https://www.reddit.com/r/laravel/comments/kowllb/best_email_provider_to_use/


    //https://coderrocketfuel.com/article/send-emails-with-node.js-using-mailgun-and-nodemailer
    //https://app.mailgun.com/app/account/setup
}

const getCartTotal = (cartItems, shippingCost) => {

    let totalPrice = cartItems.reduce((total, product) => {
        return total + (roundToTwo(product.price) * product.count);
    }, 0);

    totalPrice += shippingCost;

    return roundToTwo(totalPrice);
}

const getCartItemQantity = (itemId, cartItems) => {
    //get the quantity of all items with same ids but different params (like color and size)

    const filteredItems = cartItems.filter((item) => item.productId == itemId);
    const countSum = filteredItems.reduce((sum, item) => item.count + sum, 0);

    return countSum;
}

const createCartForOrder = async (cartFromUser) => {

    //check for shenanigans

    //this cart gets added to the order object 
    const cart = [];

    for (let i = 0; i < cartFromUser.length; i++) {

        let productFromDb = await Product.findById(cartFromUser[i].productId)
            .select("name")
            .select("price")
            .select("quantity")
            .select("size")
            .exec();

        let object = {};
        object.product = productFromDb._id;
        object.name = productFromDb.name;

        object.selectedCount = cartFromUser[i].count;

        if (cartFromUser[i].color) {
            object.selectedColor = cartFromUser[i].color;
        }

        if (cartFromUser[i].size) {
            let sizeText = null;
            if (!productFromDb.size) {
                throw new Error('product has no size attribute')
            }
            const { upperBound, lowerBound } = productFromDb.size;
            if (cartFromUser[i].size == lowerBound) {
                sizeText = "small";
            } else if (cartFromUser[i].size == upperBound) {
                sizeText = "large";
            } else {
                sizeText = "custom";
            }
            object.selectedSize = { sizeValue: cartFromUser[i].size, sizeText };
        }

        const priceFromDb = roundToTwo(productFromDb.price);
        object.price = priceFromDb;
        object.priceTimesCount = priceFromDb * object.selectedCount;

        const availableQuantity = productFromDb.quantity;

        const priceFromUser = roundToTwo(object.price);
        const countFromUser = getCartItemQantity(cartFromUser[i].productId, cartFromUser);

        if (priceFromDb !== priceFromUser) {
            throw new Error('price error')
            return;
        }

        if (countFromUser > availableQuantity) {
            throw new Error('not enough quantity error')
            return;
        }

        cart.push(object);

    }

    return cart;

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
            const cart = await createCartForOrder(cartFromUser);

            //check for price shenanigans
            const homeOrOffice = deliveryInfo.method;
            const shippingCost = selectedCourier.shippingPrice[homeOrOffice];
            const totalCost = getCartTotal(cartFromUser, shippingCost);

            if (totalCost !== totalCostFromUser) {
                console.log(totalCost);
                console.log(totalCostFromUser);
                throw new Error('price error')
                return;
            }

            let userId = null;

            if (withUser) {

                const user = await User.findOne({ email: req.user.email }).exec();

                if (!user) {
                    throw new Error('user error')
                    return;
                }

                userId = user._id;
            }

            const createdOrder = await new Order({
                deliveryInfo,
                products: cart,
                totalCost,
                orderedBy: userId,
                shippingCost
            }).save();

            let order = await createdOrder.populate("products.product");
            console.log(order);

            sendCreatedOrderEmail(order);


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