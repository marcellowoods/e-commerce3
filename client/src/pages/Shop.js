import React, { Fragment, useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
// import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';
import getPagination from "../components/navigation/getPagination";
import ProductShopCard from "../components/cards/ProductShopCard";
import ProductLoadCard from "../components/cards/ProductLoadCard";
import LoadingPage from "./LoadingPage";
import { getCategories } from "../functions/category";
import { getProducts } from "../functions/product";
import ElementsMenu from "../components/menus/ElementMenu";

const SHOP_PATHNAME = "/shop/";
const PRODUCT_PATHNAME = "/product/";
const PRODUCTS_PER_PAGE = 6;

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

const selectedTypes = [
    { name: "new", slug: "new" },
    { name: "best sellers", slug: "best-sellers" }
]

const PageComponent = () => {

    const { categoryParam, typeParam, pageParam } = useParams();

    const history = useHistory();
    const [products, setProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allCategories, setAllCategories] = useState(null);

    const [selectedType, setSelectedType] = useState(selectedTypes[0]);

    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [isProductsLoading, setIsProductsLoading] = useState(false);


    const fetchAllCategories = async () => {

        try {
            let { data } = await getCategories();
            if (data) {
                setAllCategories(data);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    useEffect(() => {

        fetchAllCategories();

    }, []);

    useDidMountEffect(() => {

        // console.log(typeParam);

        if (allCategories) {
            if (categoryParam) {
                const categoryObj = allCategories.find(c => c.slug == categoryParam);
                if (categoryObj) {
                    setSelectedCategory(categoryObj);
                } else {
                    alert("wrong url");
                    history.push('/');
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
                    history.push('/');
                    return;
                }
            }

            if (pageParam) {
                if (isNumeric(pageParam)) {
                    setPage(parseInt(pageParam) - 1);
                } else {

                    alert("wrong url");
                    history.push('/');
                    return;
                }

            }

        }

    }, [allCategories])

    useDidMountEffect(() => {

        // console.log("fetching")
        if (selectedCategory) {
            //https://stackoverflow.com/questions/56053810/url-change-without-re-rendering-in-react-router
            //https://reactjs.org/docs/reconciliation.html
            let path = SHOP_PATHNAME + selectedCategory.slug;

            path += "/" + selectedType.slug;

            path += ("/" + (page + 1));

            history.replace({ pathname: path });

            fetchProducts();
        }


    }, [selectedCategory, selectedType, page]);


    const fetchProducts = async () => {
        // console.log("fetching products")
        try {
            setIsProductsLoading(true);
            // console.log(page);
            let { data } = await getProducts(selectedType.name, null, page + 1);

            if (data) {
                const perPage = PRODUCTS_PER_PAGE;
                // console.log(data)
                setProducts(data.data);
                const { total } = data.metadata[0];
                const countPages = Math.ceil(total / perPage);
                setPageCount(countPages);
                setIsProductsLoading(false);
            }
        } catch (error) {
            setIsProductsLoading(false);
            console.log(error);
            alert(error);
        }
    };

    const pushToProductPage = (id) => {
        history.push(PRODUCT_PATHNAME + id)
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
            {products && products.map((p) => (
                <ProductShopCard
                    key={p._id}
                    id={p.slug}
                    quantity={p.quantity}
                    images={p.images}
                    imageUrl={p.images[0]}
                    price={p.price}
                    name={p.title}
                    onAddClick={(id) => { console.log(`added ${id} to cart`) }}
                    onCardClick={pushToProductPage}
                />
            ))
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

            <div className="my-5 sm:my-10">
                <div className="container mx-auto max-w-7xl px-6 ">

                    <div className="flex flex-col sm:flex-row">
                        <div>
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

                </div>

                {/* https://github.com/AdeleD/react-paginate */}
                <div className="p-6">
                    {getPagination({
                        curPage: page,
                        pageCount,
                        onPageChange: ({ selected }) => setPage(selected)
                    })}
                </div>

            </div>

        </Fragment >
    );
};

export default PageComponent;
