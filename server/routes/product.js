const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
    create,
    listAll,
    remove,
    read,
    update,
    list,
    productsCount,
    listRelated,
    listBySlugs,
    getProductsByText
} = require("../controllers/product");

// routes
// router.post("/product", authCheck, adminCheck, create);
router.post("/product", authCheck, adminCheck, create);
// router.get("/products/total", productsCount);

// router.get("/products/:count?", listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.get("/list-products-by-slugs/:slugs", listBySlugs);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);
// related
router.get("/product/related/:productId", listRelated);
// filter only by text
router.get("/search/:text/:page", getProductsByText);


module.exports = router;
