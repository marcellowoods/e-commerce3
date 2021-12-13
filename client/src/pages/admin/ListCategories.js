import React, { useState, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCategories, removeCategory } from "../../functions/category";
import { useAsync } from "../../auxiliary/reactUtils";
import LoadingPage from "../LoadingPage";

const CategoriesTable = ({ categories, handleCategoryRemove, handleCategoryEdit }) => {

    return (

        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr key={category.name}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src={category.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleCategoryEdit(category.slug)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleCategoryRemove(category.slug)}
                                                className="pl-2 text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

const ListCategories = () => {

    const [allCategories, setAllCategories] = useState(null);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
    const [reloadCategoriesFlag, setReloadCategoriesFlag] = useState(false);

    const history = useHistory();

    const { user } = useSelector((state) => ({ ...state }));

    const reloadCategories = () => {
        setReloadCategoriesFlag(prevState => {
            return !prevState;
        });
    }

    useAsync(
        getCategories,
        setAllCategories,
        setIsCategoriesLoading,
        [reloadCategoriesFlag]
    );

    const handleCategoryRemove = async (slug) => {
        setIsCategoriesLoading(true);
        await removeCategory(slug, user.token);
        reloadCategories();
    }

    const handleCategoryEdit = (slug) => {
        history.push(`/admin/edit-category/${slug}`);
    }

    const handleCreateCategory = () => {
        history.push("/admin/create-category");
    }

    const renderCategories = () => {
        if (isCategoriesLoading) {
            return <LoadingPage />
        }
        if (allCategories && allCategories.length) {
            return (
                <CategoriesTable
                    handleCategoryRemove={handleCategoryRemove}
                    categories={allCategories}
                    handleCategoryEdit={handleCategoryEdit}
                />
            );
        }
        return <></>
    }

    return (
        <div className="pt-4 sm:pt-16 container mx-auto max-w-2xl">
            <div className="p-4 items-center flex justify-between">
                <h1 className="text-2xl	font-medium	">Categories</h1>
                <button
                    onClick={handleCreateCategory}
                    className="inline-flex items-center justify-center w-10 h-10  text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </button>
            </div>

            {renderCategories()}

        </div>
    )

}

export default ListCategories;