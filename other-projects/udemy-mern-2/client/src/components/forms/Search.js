import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { getProductByText } from "../../functions/product.js";
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Input, AutoComplete } from 'antd';



const renderItem = (title) => ({
    value: title,
    label: (
        <div>
            {title}
        </div>
    ),
});

const renderTitle = (title, linkTo) => (
    <span>
        {title}
        <Link
            style={{
                float: 'right',
            }}
            to={linkTo}>
            more
        </Link>
    </span>
);

const Search = () => {

    const [localText, setLocalText] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    const history = useHistory();

    const handleChange = (val) => {

        setLocalText(val)
    };

    let fetchProducts = (arg, component) => {

        if (arg == "") {
            setProducts([]);
            return;
        }

        setLoading(true);

        getProductByText(arg).then((res) => {
            if (component.isMounted) {

                // let productsMetadata = res.data.metadata;
                let allProducts = res.data;

                setLoading(false);

                if (allProducts != undefined) {
                    setProducts(allProducts);
                }


            }
        });

    }



    useEffect(() => {
        // console.log(text);

        let component = { isMounted: true };
        const delayed = setTimeout(() => {
            // console.log(selectedFilters);
            fetchProducts(localText, component);
        }, 200);
        return () => {
            clearTimeout(delayed);
            component.isMounted = false;
        };
    }, [localText]);

    const handleSubmit = (e) => {

        setLocalText("");
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: localText },
        });
        history.push(`/shop?title=${localText}`);
        // history.go(0);
    };

    const handleSelect = (title) => {
        let product = products.find((p) => p.title == title);
        let slug = product.slug;
        setLocalText("");
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: localText },
        });
        history.push(`/product/${slug}`);
    };

    let renderProductTitle = renderTitle("product", `/shop?title=${localText}`);

    const options = [
        {
            label: renderProductTitle,
            options: products.map((product) => renderItem(product.title))
        }
        // {
        //     label: renderTitle('Solutions'),
        //     options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
        // },
        // {
        //     label: renderTitle('Articles'),
        //     options: [renderItem('AntDesign design language', 100000)],
        // },
    ];



    return (

        <div className="form-inline my-2 my-lg-0">  
            <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{
                    width: 350,
                }}
                options={options}
                onSearch={handleChange}
                onSelect={handleSelect}
                onChange={handleChange}
                value={localText}
                onBlur={() => setLocalText("")}
            >
                <Input.Search onSearch={handleSubmit} size="large" placeholder="Search" />
            </AutoComplete>
            {/* <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} /> */}

        </div>

    );
};

export default Search;
