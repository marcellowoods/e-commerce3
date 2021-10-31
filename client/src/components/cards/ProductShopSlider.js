import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

//https://react-slick.neostack.com/docs/api/
const ProductShopSlider = ({ images, onPointerDown, onPointerUp }) => {
    var settings = {
        dots: true,
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider
            dotsClass="slick-dots transform translate-y-3"
            {...settings}>
            {images.map((img) => {
                return (
                    <img
                        key={img}
                        onPointerDown={(e) => onPointerDown(e.screenX, e.screenY)}
                        onPointerUp={(e) => onPointerUp(e.screenX, e.screenY)}
                        className="flex items-end justify-end h-56 w-full object-cover object-center cursor-pointer"
                        src={img}
                        alt=""
                    />
                )
            })}
        </Slider>
    );
}

export default ProductShopSlider;