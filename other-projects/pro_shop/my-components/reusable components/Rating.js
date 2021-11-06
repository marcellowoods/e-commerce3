import React from 'react'
import PropTypes from 'prop-types'

const StarRating = ({value, maxStars, color}) => {

    let ratings = [];

    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    for (let i = 1; i <= value; i++) {
        ratings.push(
            <span>
                <i
                    style={{ color }}
                    className={
                        'fas fa-star'
                    }
                ></i>
            </span>
        )
    }

    if (isFloat(value)) {
        ratings.push(
            <span>
                <i
                    style={{ color }}
                    className={
                        'fas fa-star-half-alt'
                    }
                ></i>
            </span>
        )
    }

    for (let i = Math.ceil(value) + 1; i <= maxStars; i++) {
        ratings.push(
            <span>
                <i
                    style={{ color }}
                    className={
                        'far fa-star'
                    }
                ></i>
            </span>
        )
    }

    return (<div>{ratings}</div>)
}

const Rating = ({ value, text, color }) => {


    return (
        <div className='rating'>
            <StarRating value={value} color={color} maxStars={5}/>
            <span>{text && text}</span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825',
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
}

export default Rating
