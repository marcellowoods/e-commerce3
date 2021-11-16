import React from "react";
import { getCartTotal } from "../../actions/cartActions";
import CartItem from "./CartItem";

const Cart = ({ products }) => {

    const hasProducts = () => products && products.length !== 0;

    if (!hasProducts()) {
        return <></>
    }

    return (
        <div>
            {products.map((item, index) => (
                <CartItem
                    key={index}
                    productId={item.product}
                    slug={item.slug}
                    price={item.price}
                    name={item.name}
                    quantity={item.qty}
                    imageLink={item.image}
                    countInStock={item.countInStock}
                />))
            }
            <h3 className="text-right text-lg text-gray-600">total {getCartTotal(products)}$</h3>
        </div>
    )
}

export default Cart;