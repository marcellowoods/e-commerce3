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
    readById,
    listRelated,
    listBySlugs,
    getProductsByText
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
// router.get("/products/total", productsCount);

router.get("/products/:count?", listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.get("/product-by-id/:id", readById);

router.get("/products/list-by-slugs/:slugs", listBySlugs);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);
router.get("/product/related/:productId", listRelated);
router.get("/search/:text/:page", getProductsByText);


module.exports = router;
