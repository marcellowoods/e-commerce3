
// https://ricardometring.com/round-numbers-in-javascript
const roundToTwo = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

exports.roundToTwo = roundToTwo;