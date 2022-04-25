import React, { useRef } from "react";
import { getAddToCartIcon } from "../../assets/icons";
import ProductShopSlider from "./ProductShopSlider";
import { useTranslation } from 'react-i18next';

const ProductShopCard = ({ id, name, price, images, onAddClick, onCardClick }) => {

    const lastDrag = useRef({x: 0, y: 0});

    const onPointerDown = (pointerX, pointerY) => {

        lastDrag.current = {x: pointerX, y: pointerY}
    }

    const onPointerUp = (pointerX, pointerY) => {

        const startPointerX = lastDrag.current.x;
        const startPointerY = lastDrag.current.y;
        
        if ((Math.abs(pointerX - startPointerX) < 5) && (Math.abs(pointerY - startPointerY) < 5)) {
            onCardClick(id)
        }
    }

    const { t } = useTranslation();

    return (
        <div key={name} className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">

            <div>
                {/* single image */}
                {/* <img
                        onClick={(e) => { }}
                        className="flex items-end justify-end h-56 w-full object-cover object-center cursor-pointer"
                        src={imageUrl}
                        alt=""
                    /> */}

                {/* tridi */}
                {/* <Tridi
                    location="./images"
                    format="jpg"
                    count="36"
                    mousewheel={true}
                    inverse={true}
                    // touchDragInterval={1}
                    onDragStart={() => lastDrag.current = Date.now()}
                    dragInterval={1}
                    touchDragInterval={1}
                /> */}

                {/* slider */}
                <ProductShopSlider
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    images={images.slice(0, 3)}
                />

            </div>

            <div className="float-left px-5 py-3">
                {/* adding transform className fixed the missing event-click (STRANGE)*/}
                <div className="transform" onClick={() => onCardClick(id)}>

                    <h3 className="color-main-light cursor-pointer uppercase">
                        {name}
                    </h3>

                </div>
                <span className="text-gray-500 mt-2">{price} {" "} {t("lv.")}</span>
            </div>

            <div className="float-right transform translate-y-4 -translate-x-4">
                <button onClick={(() => onCardClick(id))} className="focus:outline-none">
                    {getAddToCartIcon()}
                </button>
            </div>
        </div>
    )
}

export default ProductShopCard;