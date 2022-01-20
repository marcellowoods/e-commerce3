import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
// import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';
import getPagination from "../components/navigation/getPagination";
import ProductShopCard from "../components/cards/ProductShopCard";
import ProductLoadCard from "../components/cards/ProductLoadCard";
import LoadingPage from "./LoadingPage";
import { getCategories } from "../functions/category";
import { getProductByText } from "../functions/product";
import ElementsMenu from "../components/menus/ElementMenu";
import { useAsyncDidMount, useDidMountEffect, useAsync } from "../auxiliary/reactUtils";

import { useTranslation } from 'react-i18next';
import { getTranslatedField } from "../actions/translateActions";

const SHOP_PATHNAME = "/search/";
const PRODUCT_PATHNAME = "/product/";
const PRODUCTS_PER_PAGE = 6;

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

const selectedTypes = [
    { name: "new", slug: "new" },
    { name: "best sellers", slug: "best-sellers" }
]

const PageComponent = () => {

    const { textParam, pageParam } = useParams();

    const history = useHistory();
    const [products, setProducts] = useState(null);

    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [isProductsLoading, setIsProductsLoading] = useState(false);

    const { t, i18n } = useTranslation();

    const fetchProductsByText = async () => {
        return getProductByText(textParam, page + 1);
    }

    const onSuccessProducts = (data) => {

        const { data: productsData, metadata: productsMetadata } = data;

        if (productsData.length === 0) {
            setProducts([]);
            setPageCount(0);
            return;
        }
        const perPage = PRODUCTS_PER_PAGE;

        setProducts(productsData);
        const { total } = productsMetadata[0];
        const countPages = Math.ceil(total / perPage);
        setPageCount(countPages);
    }

    useAsync(
        fetchProductsByText,
        onSuccessProducts,
        setIsProductsLoading,
        [textParam, page]
    );

    useEffect(() => {

        // console.log(typeParam);
        if (pageParam) {
            if (isNumeric(pageParam)) {
                setPage(parseInt(pageParam) - 1);
            } else {
                alert("wrong url");
                history.push('/');
                return;
            }
        }


    }, [pageParam])

    useDidMountEffect(() => {

        let path = SHOP_PATHNAME + textParam;

        path += ("/" + (page + 1));

        history.replace({ pathname: path });

    }, [page]);


    const pushToProductPage = (id) => {
        history.push(PRODUCT_PATHNAME + id)
    }

    // const handleCategoryChange = (category) => {

    //     setSelectedCategory(category);
    //     setPage(0);
    // }

    // const handleTypeChange = (type) => {

    //     setSelectedType(type);
    //     setPage(0);
    // }

    const renderProducts = () => (
        <div key={"products"} className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {products && products.map((p) => {
                const lang = i18n.language;
                const translatedName = getTranslatedField(p, 'name', lang);
                const images = p.images.slice(0, 3);

                return (
                    <ProductShopCard
                        key={p._id}
                        id={p.slug}
                        quantity={p.quantity}
                        images={images}
                        price={p.price}
                        name={translatedName}
                        onAddClick={(id) => { console.log(`added ${id} to cart`) }}
                        onCardClick={pushToProductPage}
                    />
                )
            }

            )
            }
        </div>
    )

    const renderLoadCards = () => {
        let n = products.length || PRODUCTS_PER_PAGE;

        return (
            <div key={"products"} className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {
                    Array.from({ length: n }, (_, i) => (
                        <ProductLoadCard
                            key={i}
                        />
                    ))
                }
            </div>
        )
    }

    if (products == null) {

        return (
            <LoadingPage />
        )
    }

    return (
        <Fragment>

            {/* <div className="flex flex-col sm:flex-row">
                <div className="pr-2">
                    <ElementsMenu
                        allElements={allCategories}
                        selectedElement={selectedCategory}
                        setSelectedElement={handleCategoryChange}
                        zIndex={4}
                    />
                </div>

                <div className="sm:pl-2 pt-2 sm:pt-0">
                    <ElementsMenu
                        allElements={selectedTypes}
                        selectedElement={selectedType}
                        setSelectedElement={handleTypeChange}
                    />
                </div>
            </div> */}
            {/* xl:grid-cols-4 */}
            {isProductsLoading ? renderLoadCards() : renderProducts()}



            {/* https://github.com/AdeleD/react-paginate */}
            <div className="p-6">
                {getPagination({
                    curPage: page,
                    pageCount,
                    onPageChange: ({ selected }) => setPage(selected)
                })}
            </div>

        </Fragment >
    );
};

export default PageComponent;
