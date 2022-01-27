import React from "react";
import { getCartTotal } from "../../actions/cartActions";
import CartItem from "./CartItem";

import { useTranslation } from 'react-i18next';
import { getTranslatedField } from "../../actions/translateActions";
import { roundToTwo } from "../../auxiliary/utils";

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
                const price = roundToTwo(item.price * item.count) + " " + t('lv.');

                return (

                    <CartItem
                        key={index}
                        productId={item.product}
                        slug={item.slug}
                        price={price}
                        name={translatedName}
                        quantity={item.count}
                        size={item.size}
                        imageLink={item.image}
                        countInStock={item.countInStock}
                    />
                )
            }
            )
            }

            <h3 className="text-right text-lg text-gray-600">total {getCartTotal(products)} {t('lv.')}</h3>
        </div>
    )
}

export default Cart;