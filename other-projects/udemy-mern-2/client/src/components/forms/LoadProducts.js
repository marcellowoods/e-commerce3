import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from 'antd';

const LoadProducts = ({ sort, order, limit }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsCount, setProductsCount] = useState(0);

    useEffect(() => {

        let isMounted = true;
        setLoading(true);
        // sort, order, limit
        getProducts(sort, order, currentPage).then((res) => {
            if(isMounted){
                setProducts(res.data);
                setLoading(false);
            }

        });

        return () => { isMounted = false };
    }, [currentPage]);

    useEffect(() => {

        let isMounted = true; 
        getProductsCount().then((res) => {

            if (isMounted) setProductsCount(res.data);
        });
        return () => { isMounted = false };
    }, []);

    const getTotalPages = () =>
        Math.ceil(productsCount / limit)


    return (
        <>
            <div className="container">
                {loading ? (
                    <LoadingCard count={limit} />
                ) : (
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-4">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="row">
                <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                    <Pagination onChange={(p) => { setCurrentPage(p) }}
                        defaultCurrent={1}
                        current={currentPage}
                        total={getTotalPages() * 10}
                    />
                </nav>
            </div>
        </>
    );
};

export { LoadProducts };
