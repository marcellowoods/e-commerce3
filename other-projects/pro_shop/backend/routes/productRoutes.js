import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({})

        res.json(products)
    })
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id)

        if (product) {
            res.json(product)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    })
)

router.get(
    '/updateCount/:ids',
    asyncHandler(async (req, res) => {
        let ids = req.params.ids.split(',');

        let products = await Product.find(
            { _id: { $in: ids } }
        )
        
        let obj = {};
        products.forEach(p => obj[p._id] = p.countInStock);

        res.json(obj)
    })
)

export default router
