import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";


const Product = ({ match }) => {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);
    const [related, setRelated] = useState([]);
    // redux
    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    useEffect(() => {
        loadMyRating();
        loadRelated();
    }, [product]);

    let loadRelated = () => {
        if (product && product._id) {
            getRelated(product._id).then((res) => setRelated(res.data));
        }

    }

    const loadSingleProduct = () =>
        getProduct(slug).then((res) => setProduct(res.data));

    const onStarClick = (newRating, productId) => {
        setStar(newRating);

        productStar(productId, newRating, user.token).then((res) => {
            // console.log("rating clicked", res.data);
            loadSingleProduct(); // if you want to show updated rating in real time
        });
    };

    let loadMyRating = () => {

        let ratings = product.ratings;
        if (user && ratings) {
            let myId = user._id;
            let myRatingObj = ratings.find((element) => element.postedBy == myId);
            if (myRatingObj !== undefined) {
                setStar(myRatingObj.star);
            }
        }
    }

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct
                    product={product}
                    onStarClick={onStarClick}
                    star={star}
                />
            </div>

            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                </div>
            </div>

            <div className="row pb-5">
                {related.length ? (
                    related.map((r) => (
                        <div key={r._id} className="col-md-4">
                            <ProductCard product={r} />
                        </div>
                    ))
                ) : (
                    <div className="text-center col">No Products Found</div>
                )}
            </div>
        </div>
    );
};

export default Product;
