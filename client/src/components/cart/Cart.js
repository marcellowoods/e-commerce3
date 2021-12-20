import React from "react";
import { getCartTotal } from "../../actions/cartActions";
import CartItem from "./CartItem";

import { useTranslation } from 'react-i18next';
import { getTranslatedField } from "../../actions/translateActions";

const Cart = ({ products }) => {

    const { t, i18n } = useTranslation();

    const hasProducts = () => products && products.length !== 0;

    if (!hasProducts()) {
        return <></>
    }

    return (
        <div>
            {products.map((item, index) => {
                const lang = i18n.language;

                const translatedName = getTranslatedField(item, 'name', lang);
                console.log(translatedName);

                return (

                    <CartItem
                        key={index}
                        productId={item.product}
                        slug={item.slug}
                        price={item.price}
                        name={translatedName}
                        quantity={item.count}
                        imageLink={item.image}
                        countInStock={item.countInStock}
                    />
                )
            }
            )
            }

            <h3 className="text-right text-lg text-gray-600">total {getCartTotal(products)}$</h3>
        </div>
    )
}

export default Cart;