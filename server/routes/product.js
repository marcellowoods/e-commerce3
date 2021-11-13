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
    readAdmin,
    update,
    list,
    productsCount,
    listRelated,
    getProductsByText
} = require("../controllers/product");

// routes
// router.post("/product", authCheck, adminCheck, create);
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count?", listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.get("/product-admin/:slug", authCheck, adminCheck, readAdmin);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);
// related
router.get("/product/related/:productId", listRelated);
// filter only by text
router.get("/search/from-text", getProductsByText);


module.exports = router;
