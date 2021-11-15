import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

//https://react-slick.neostack.com/docs/api/
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, zIndex: 2, transform: "translate(-40px, 0)" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, zIndex: 2, transform: "translate(40px, 0)" }}
            onClick={onClick}
        />
    );
}

const ProductSlider = ({ images }) => {

    const nImages = images.length;

    let scale = null;
    let translate = null

    if(nImages < 5){
        scale = 'scale-350';
        translate = 'translate-y-16'
    }else{
        scale = 'scale-200';
        translate = 'translate-y-8'
    }

    const settings = {
        customPaging: function (i) {
            return (

                <img style={{ transform: 'scale(1.4)'}} src={images[i]} />
            );
        },
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        adaptiveHeight: true,
        dots: true,
        dotsClass: `transform ${scale}  ${translate}  slick-dots slick-thumb`,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div>
            <Slider
                {...settings}>
                {images.map((img) => {
                    return (
                        <img
                            key={img}
                            src={img}
                            alt=""
                        />
                    )
                })}
            </Slider>
        </div>
    );
}

export default ProductSlider;