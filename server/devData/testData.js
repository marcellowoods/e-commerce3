const makeProduct = (name, price) => {
    return {
        images: ["https://res.cloudinary.com/dilzsg1if/image/upload/v1635503647/e3/1635503647198.jpg",
            "https://res.cloudinary.com/dilzsg1if/image/upload/v1635503647/e3/1635503647208.jpg"],

        title: name,
        price: price,
        quantity: 3,
        description: "very slick digital watch",
        category: "6175a2c6f7f4bc2378f4917a"
    }
}

const numProducts = 25;

const products = Array.from({length: numProducts}, (_, i) => {
    let name = `g shock ${i*100}`
    let price = 200 + i*10;
    return makeProduct(name, price);
})

exports.products = products;