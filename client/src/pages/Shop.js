import React, { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getPagination from "../components/navigation/getPagination";
import ProductShopCard from "../components/cards/ProductShopCard";
import ProductLoadCard from "../components/cards/ProductLoadCard";
import LoadingPage from "./LoadingPage";
import { getCategories } from "../functions/category";
import { getProducts } from "../functions/product";
import ElementsMenu from "../components/menus/ElementMenu";
import { useAsyncDidMount, useDidMountEffect, useAsync } from "../auxiliary/reactUtils";

import { useTranslation } from 'react-i18next';
import { getTranslatedField } from "../actions/translateActions";

const SHOP_PATHNAME = "/shop/";
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

    const { categoryParam, typeParam, pageParam } = useParams();

    const navigate = useNavigate();
    const [products, setProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allCategories, setAllCategories] = useState(null);

    const [selectedType, setSelectedType] = useState(selectedTypes[0]);

    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [isProductsLoading, setIsProductsLoading] = useState(false);

    const { t, i18n } = useTranslation();

    useAsync(
        getCategories,
        setAllCategories,
        null,
        []
    );

    useDidMountEffect(() => {

        if (allCategories) {
            if (categoryParam) {
                const categoryObj = allCategories.find(c => c.slug == categoryParam);
                if (categoryObj) {
                    setSelectedCategory(categoryObj);
                } else {
                    alert("wrong url");
                    navigate('/');
                    return;
                }
            } else {
                setSelectedCategory(allCategories[0]);
            }

            if (typeParam) {
                const typeObj = selectedTypes.find(c => c.slug == typeParam);
                if (typeObj) {
                    setSelectedType(typeObj);
                } else {
                    alert("wrong url");
                    navigate('/');
                    return;
                }
            }

            if (pageParam) {
                if (isNumeric(pageParam)) {
                    setPage(parseInt(pageParam) - 1);
                } else {

                    alert("wrong url");
                    navigate('/');
                    return;
                }

            }

        }

    }, [allCategories])

    useDidMountEffect(() => {

        if (selectedCategory) {
            //https://stackoverflow.com/questions/56053810/url-change-without-re-rendering-in-react-router
            //https://reactjs.org/docs/reconciliation.html
            let path = SHOP_PATHNAME + selectedCategory.slug;

            path += "/" + selectedType.slug;

            path += ("/" + (page + 1));

            navigate(path, { replace: true })
        }


    }, [selectedCategory, selectedType, page]);

    const fetchProducts = async () => {
        return getProducts(selectedType.name, selectedCategory._id, page + 1);
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

    useAsyncDidMount(
        fetchProducts,
        onSuccessProducts,
        setIsProductsLoading,
        [selectedCategory, selectedType, page]
    );

    const pushToProductPage = (id) => {
        navigate(PRODUCT_PATHNAME + id)
    }

    const handleCategoryChange = (category) => {

        setSelectedCategory(category);
        setPage(0);
    }

    const handleTypeChange = (type) => {

        setSelectedType(type);
        setPage(0);
    }

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

    if (products == null || allCategories == null || selectedCategory == null) {

        return (
            <LoadingPage />
        )
    }

    return (
        <Fragment>

            <div className="flex flex-col sm:flex-row pt-6 sm:pt-4 ">
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
            </div>
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
