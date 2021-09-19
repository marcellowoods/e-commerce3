import React, { useState, useEffect, useRef } from "react";
import {
    getProductsByCount,
    fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import LoadingCard from "../components/cards/LoadingCard";
import { Pagination } from 'antd';
import { Menu, Slider, Checkbox } from "antd";
import FilterMenu from "../systems/filter system/FilterMenu.js"

import {
    BrowserRouter as Router,
    Switch,
    useLocation,
    useHistory
} from "react-router-dom";

const { SubMenu, ItemGroup } = Menu;


const Shop = () => {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-3 pt-2">
                        <h4>Search/Filter</h4>
                        <hr />


                        <FilterMenu
                            setProducts={setProducts}
                            setPages={setPages}
                            setLoading={setLoading}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage} />
                    </div>

                    <div className="col-md-9">
                        {loading ? (
                            <LoadingCard count={products.length || 3} />
                        ) : (
                            <div className="row">
                                {products.map((product) => (
                                    <div key={product._id} className="col-md-4 p-4">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                </div>

                <div className="row">
                    <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                        <Pagination onChange={(p) => { setCurrentPage(p) }}
                            defaultCurrent={1}
                            current={currentPage}
                            total={pages * 10}
                        />
                    </nav>
                </div>
                
            </div>
        </>
    );
};

export default Shop;