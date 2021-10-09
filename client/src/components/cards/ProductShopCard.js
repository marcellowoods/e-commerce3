import React, { useRef } from "react";
import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';
import { getAddToCartIcon } from "../../assets/icons";

import Slider from "react-slick";

//https://react-slick.neostack.com/docs/api/
const SimpleSlider = ({ images }) => {
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
                    // onClick={(e) => { }}
                    className="flex items-end justify-end h-56 w-full object-cover object-center cursor-pointer"
                    src={img}
                    alt=""
                />
            })}
            {/* <div>
                <h3>1</h3>
            </div>
            <div>
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
            <div>
                <h3>5</h3>
            </div>
            <div>
                <h3>6</h3>
            </div> */}
        </Slider>
    );
}

const ProductShopCard = ({ id, name, price, images, imageUrl, onAddClick, onCardClick }) => {

    const lastDrag = useRef(Date.now());

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

                {/* <Tridi
                        images={[
                            "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4urtfGLUvPlZXxeJYMKwxod4w0y_Jf_hRBQ&usqp=CAU",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-wMRq6WMZSigBcYV8ycb-5z5I88668rPmww&usqp=CAU"
                        ]}
                        // location="./images"
                        format="jpg"
                        // count="2"
                        mousewheel={true}
                        inverse={true}
                        // touchDragInterval={1}
                        onDragStart={() => lastDrag.current = Date.now()}
                        dragInterval={10}
                        touchDragInterval={10}
                    /> */}
                {/* car */}
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
                <SimpleSlider images={images} />

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