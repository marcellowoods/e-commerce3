import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Cart from "../cart/Cart";

const OrderItems = () => {

    const { cart } = useSelector((state) => ({ ...state }));
    const { cartItems: products } = cart;
    const history = useHistory();

    useEffect(() => {

        if (products.length === 0) {
            history.push("/")
        }
    }, [products])

    return (
        <div className="border rounded-md max-w-md w-full px-4 py-3">
            <div className="flex items-center justify-between">
                <h3 className="text-gray-700 font-medium">Order</h3>
                {/* <span className="text-gray-600 text-sm">Edit</span> */}
            </div>
            <Cart products={products} />
        </div>

    )
}

export default OrderItems;