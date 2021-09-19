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
  productStar,
  listRelated,
  getProductsByFilter,
  getFilters,
  getProductsByText,
  getAllFields,
  addTranslations
} = require("../controllers/product");

// routes
// router.post("/product", authCheck, adminCheck, create);
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);
// rating
router.put("/product/star/:productId", authCheck, productStar);
// related
router.get("/product/related/:productId", listRelated);
// filter products
router.post("/search/filter-products", getProductsByFilter);
// get new filters
router.post("/search/filters", getFilters);
// filter only by text
router.get("/search/from-text", getProductsByText);

router.get("/translate/fields", getAllFields);

router.post("/translate/fields", addTranslations);


module.exports = router;
