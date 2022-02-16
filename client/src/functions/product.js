import axios from "axios";

export const createProduct = async (product, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken,
        },
    });

export const getProductsByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken,
        },
    });

export const getProduct = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authtoken,
        },
    });

export const getProducts = async (sort, category, page) =>
    await axios.post(`${process.env.REACT_APP_API}/products`, {
        sort,
        category,
        page,
    });

export const getAllProducts = async () =>
    await axios.get(`${process.env.REACT_APP_API}/products/`);

export const getProductsCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const getRelated = async (productId) =>
    await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const getProductsByFilter = async (arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filter-products`, arg);

export const getFilters = async (arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);

export const getProductByText = async (text, page) =>
    await axios.get(`${process.env.REACT_APP_API}/search/${text}/${page}`);

export const getProductById = async (id) =>
    await axios.get(`${process.env.REACT_APP_API}/product-by-id/${id}`);

export const getProductsBySlugs = async (slugsArray) =>
    await axios.get(`/api/products/list-by-slugs/${slugsArray}`);













