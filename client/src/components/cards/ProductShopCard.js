import React, { useRef } from "react";
// import Tridi from 'react-tridi';
// import 'react-tridi/dist/index.css';
import { getAddToCartIcon } from "../../assets/icons";

import Slider from "react-slick";

//https://react-slick.neostack.com/docs/api/
const SimpleSlider = ({ images, onPointerDown,  onPointerUp}) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider
            dotsClass="slick-dots transform translate-y-3"
            {...settings}>
            {images.map((img) => {
                return <img
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    className="flex items-end justify-end h-56 w-full object-cover object-center cursor-pointer"
                    src={img}
                    alt=""
                />
            })}
        </Slider>
    );
}

const ProductShopCard = ({ id, name, price, images, imageUrl, onAddClick, onCardClick }) => {

    const lastDrag = useRef(Date.now());

    const onPointerDown = () => {
        lastDrag.current = Date.now()
    }

    const onPointerUp = () => {

        if (Date.now() - lastDrag.current < 50) {
            onCardClick(id)
        }
    }

    return (
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
            <div onClick={
                () => {
                    if (Date.now() - lastDrag.current < 200) {
                        onCardClick(id)
                    }
                }
            }>
                {/* <img
                        onClick={(e) => { }}
                        className="flex items-end justify-end h-56 w-full object-cover object-center cursor-pointer"
                        src={imageUrl}
                        alt=""
                    /> */}
                {/* tridi car */}
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
                <SimpleSlider
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    images={images}
                />

            </div>

            <div className="float-left px-5 py-3">
                <h3 className="color-main-light cursor-pointer uppercase">{name}</h3>
                <span className="text-gray-500 mt-2">${price}</span>
            </div>

            <div className="float-right transform translate-y-4 -translate-x-4">
                <button onClick={(() => onAddClick(id))} className="focus:outline-none">
                    {getAddToCartIcon()}
                </button>
            </div>
        </div>
    )
}

export default ProductShopCard;