const selectedCourier = {
    name: "Econt",
    id: "econt",
    findOffice: "https://www.econt.com/find-office",
    shippingPrice: {
        home: 7,
        office: 5
    }
};

exports.orderOptions = async (req, res) => {

    try {

        res.json({selectedCourier});
        
    } catch (err) {
        res.status(400).json({
            err: err.message,
        });
    }

};

exports.selectedCourier = selectedCourier;