import React, { useState, useEffect, useRef } from "react";
import {
    getProductsByCount,
    getProductsByFilter,
    getFilters
} from "../../functions/product";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Slider, Checkbox } from "antd";
import renderFilterSub from "./renderFilterSub"

import { Tag } from 'antd';
import {
    CloseOutlined
} from '@ant-design/icons';


import {
    BrowserRouter as Router,
    Switch,
    useLocation,
    useHistory
} from "react-router-dom";

import queryString from 'query-string';

const { SubMenu, ItemGroup } = Menu;


const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) return func();
        else didMount.current = true;
    }, deps);
}

let convertArrPropToInt = (arr) => {

    return arr.map((prop) => {
        if (String(parseInt(prop)) === prop) {
            return parseInt(prop);
        }
        return prop;
    })
}

let convertObjPropToInt = (obj) => {

    console.log(obj);

    for (var prop in obj) {
        if (Array.isArray(obj[prop])) {
            obj[prop] = convertArrPropToInt(obj[prop]);
        } else {
            if (String(parseInt(obj[prop])) === obj[prop]) {
                obj[prop] = parseInt(obj[prop]);
            }
        }

    }
}

const FilterMenu = ({ setProducts, setPages, setLoading, currentPage, setCurrentPage }) => {

    let location = useLocation();
    let history = useHistory();

    // let { filters: initialFilters } = queryString.parse(location.search, { arrayFormat: 'bracket-separator', arrayFormatSeparator: '|' });

    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    const [filters, setFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [openedFilters, setOpenedFilters] = useState([]);

    const [filtersLoading, setFiltersLoading] = useState(false);
    const preventPageChange = useRef(false);

    let removeEmptyFilters = (filters) => {
        return filters.filter(filter => filter.values.length >= 1);
    }



    let fetchFilters = (arg, component) => {

        getFilters(arg).then((res) => {

            if (component.isMounted) {

                let filters = res.data;

                setFiltersLoading(false);

                setFilters(removeEmptyFilters(filters));
            }
        });

    }

    let fetchProducts = (arg, component) => {

        setLoading(true);

        getProductsByFilter(arg).then((res) => {
            if (component.isMounted) {

                let productsMetadata = res.data.metadata;
                let products = res.data.data;

                setLoading(false);

                setProducts(products);

                setPages(productsMetadata.pages);
            }
        });

    }

    let stringifyFilters = () => {

        let filterObj = { ...selectedFilters };
        console.log(text);

        let filterString = queryString.stringify({ title: text, currentPage, ...filterObj },
            { arrayFormat: 'bracket-separator', arrayFormatSeparator: '|' });

        // console.log(filterString);

        history.replace({ pathname: location.pathname, search: filterString });
    }


    //load both products and filter on component mount
    useEffect(() => {

        let component = { isMounted: true };

        let filtersFromUrl = queryString.parse(location.search, { arrayFormat: 'bracket-separator', arrayFormatSeparator: '|' });
        let page = filtersFromUrl['currentPage'] || '1';
        page = parseInt(page);
        let title = filtersFromUrl['title'] || "";
        delete filtersFromUrl['currentPage'];
        delete filtersFromUrl['title'];

        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: title },
        });

        convertObjPropToInt(filtersFromUrl);

        console.log(filtersFromUrl);
        preventPageChange.current = true;
        setCurrentPage(page);
        setSelectedFilters(filtersFromUrl);

        setOpenedFilters(Object.keys(filtersFromUrl));

        return () => { component.isMounted = false };
    }, []);

    useDidMountEffect(() => {

        let component = { isMounted: true };

        fetchProducts({ filters: { ...selectedFilters, title: text }, page: currentPage }, component);
        console.log("fetch products");
        stringifyFilters();
        return () => { component.isMounted = false };
    }, [currentPage])

    useDidMountEffect(() => {

        // console.log(text);
        stringifyFilters();
        let component = { isMounted: true };
        const delayed = setTimeout(() => {
            console.log("fetch filters");
            setFiltersLoading(true);
            // fetchProducts({ filters: {...selectedFilters, title: text}, page: currentPage }, component);
            fetchFilters({ filters: { ...selectedFilters, title: text } }, component);
            if (currentPage == 1) {
                console.log("fetch products");
                fetchProducts({ filters: { ...selectedFilters, title: text }, page: currentPage }, component);
            } else {
                if (preventPageChange.current) {
                    preventPageChange.current = false;
                    return;
                }
                setCurrentPage(1);
            }
        }, 200);
        return () => {
            clearTimeout(delayed);
            component.isMounted = false;
        };
    }, [selectedFilters, text]);


    let renderFilters = () => {
        let renderComponents = [];
        for (let filter of filters) {

            renderComponents.push(
                renderFilterSub(filtersLoading, filters, filter, selectedFilters, setSelectedFilters)
            )

        }
        return renderComponents;
    }

    let clearDeselectedFilter = (newOpenedFilters, oldOpenedFilters) => {

        if (newOpenedFilters.length < oldOpenedFilters.length) {
            let result = oldOpenedFilters.filter((v) => !newOpenedFilters.includes(v));
            let deselected = result[0];

            if (deselected in selectedFilters) {
                setSelectedFilters(prevState => {
                    let newState = { ...prevState };
                    delete newState[deselected];
                    return newState
                })

            }
        }
    }

    let onOpenFilters = (v) => {

        clearDeselectedFilter(v, openedFilters);
        setOpenedFilters(v);

    }

    let clearText = () => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
    }

    let renderText = () => {
            return (
                <div >
                        <h4 style={{ fontSize: '130%' }} >Name</h4>
                        <Tag style={{ padding: 7, fontSize: '120%' }}
                            closeIcon={<CloseOutlined style={{ fontSize: '120%' }} />} closable onClose={clearText}>
                            {text}
                        </Tag>
                </div>
            )
    }


    return (
        <div>
            {text && renderText()}
            <Menu openKeys={openedFilters} mode="inline" onOpenChange={onOpenFilters}>
                {renderFilters()}
            </Menu >
        </div>
    )

}

export default FilterMenu;