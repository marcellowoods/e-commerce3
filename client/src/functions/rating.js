import React from "react";
import StarRating from "react-star-ratings";

export const ShowAverage = ({product, pixelSize}) => {
  if (product && product.ratings) {
    // let ratingsArray = p && p.ratings;
    // let total = [];
    // let length = ratingsArray.length;
    // console.log("length", length);

    // ratingsArray.map((r) => total.push(r.star));
    // let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log("totalReduced", totalReduced);

    // let highest = length * 5;
    // console.log("highest", highest);

    // let result = (totalReduced * 5) / highest;
    // console.log("result", result);

    const getAvgProductRating = () => {

        let sum = product.ratings.reduce((result, rating) => result + rating.star, 0) 
        return sum / product.ratings.length;

    }

    let result = getAvgProductRating();

    let starDimension = `${pixelSize}px`;

    return (

          <span>
            <StarRating
              starDimension={starDimension}
              starSpacing="2px"
              starRatedColor="#B2B624"
              rating={result}
              editing={false}
            />{" "}
            ({product.ratings.length})
          </span>

      );
  }
};












