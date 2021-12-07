const makeProduct = (name, price) => {
    return {
        images: ["https://res.cloudinary.com/dilzsg1if/image/upload/v1636993893/e3/bp_41_tile_1.717.jpg.transform.article_image_335_2x_pw5opl.jpg",
            "https://res.cloudinary.com/dilzsg1if/image/upload/v1636993893/e3/w2_sxeoy9.jpg",
        "https://res.cloudinary.com/dilzsg1if/image/upload/v1636993893/e3/images_thjhc8.jpg"],

        name: name,
        price: price,
        quantity: 3,
        description: "elegant IWC watch",
        category: "6175a2c6f7f4bc2378f4917a"
    }
}

const numProducts = 25;

const products = Array.from({length: numProducts}, (_, i) => {
    let name = `IWC ${i*100}`
    let price = 200 + i*10;
    return makeProduct(name, price);
})

exports.products = products;

const makeOrder = () => {

    const deliveryInfo = {
        method:"office",
        city:"some sity",
        address: "address 2",
        phone:"1234",
        email:"test@mail.com",
        name:"Somename",
        courrier:"econt",
    }

    const products = [
        {
            product: "61928bd59f81380970810c74",
            name:"IWC 100",
            selectedCount:1,
            price:210
        }
    ]

    const totalCost = 210;

    return {
        deliveryInfo, products, totalCost
    }

}

const numOrders = 75;

const orders = Array.from({length: numOrders}, (_, i) => {
    return makeOrder();
})

exports.orders = orders;



