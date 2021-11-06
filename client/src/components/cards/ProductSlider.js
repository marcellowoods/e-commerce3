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

    if(nImages < 6){
        scale = 'scale-200';
    }else if(nImages >= 6 && nImages <= 7){
        scale = 'scale-150';
    }else{
        scale = '';
    }

    // let translate = nImages > 10 ? 'translate-y-8' : 'translate-y-8'
    let translate = 'translate-y-8';

    const settings = {
        customPaging: function (i) {
            return (
                <a >
                    <img style={{ transform: 'scale(2.9)', padding: '5.5px' }} src={images[i]} />
                </a>
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