//lookUpArray - https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
//example
// let productLookupArray = [
//     {
//         $lookup:
//         {
//             from: "categories",
//             localField: "category",
//             foreignField: "_id",
//             as: "category"
//         }
//     },
// ]

//addFieldObj - https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
//example
// addFieldsObj = {
//     rating: {
//         $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
//     },
// },


let CreateProductSearch = ({ mongooseSchema, addFieldsObj, lookupArray, regexArray, minMaxArray, convertPropertyObj }) => {


    //expects filters in the format
    // "filters" =  [
    //     {"type": "options", "name": "category", "values": ["apple"]},
    //     {"type": "minmax", "name": "price", "values": [0, 5000]}
    // ]

    return async (filters, skip, limit) => {

        //returns total numbers of products, pages and products
        // products = {
        //     "metadata": {
        //         "total": 2,
        //         "pages": 1
        //     },
        //     "data": [
        //         {product1},
        //         {product2}
        //     ]
        // }

        let match = {};

        for (let filterName in filters) {

            let type = null;

            if (minMaxArray.includes(filterName)) {
                type = "minmax";
            } else if (regexArray.includes(filterName)) {
                type = "regex"
            } else {
                type = "options"
            }

            if (type == null) {
                continue;
            }

            let values = filters[filterName];

            if (type == "options") {
                let idText = (filterName in convertPropertyObj) ? convertPropertyObj[filterName] : filterName;
                match[idText] = {
                    $in: values
                }
            } else if (type == "minmax") {
                match[filterName] = {
                    $gte: values[0],
                    $lte: values[1],
                }
            } else if (type == "regex") {
                let regexSearch = filters[filterName];
                match[filterName] = { $regex: regexSearch, $options: 'i' };
            }
        }

        if(addFieldsObj === undefined){
            addFieldsObj = {};
        }

        let addFields = [];
        if (Object.keys(addFieldsObj).length !== 0) {
            addFields.push({
                $addFields: {
                    ...addFieldsObj
                }
            })
        }

        const aggregate = await mongooseSchema.aggregate([
            ...addFields,
            ...lookupArray,
            { $match: { ...match } },
            {
                $facet: {
                    metadata: [{ $count: 'total' }],
                    data: [{ $skip: skip }, { $limit: limit }]
                }
            }
        ]).exec();

        let products = aggregate[0];
        let metaDataObject = {};
        let metaDataArray = products.metadata;

        metaDataArray.forEach((obj) => {
            let key = Object.keys(obj)[0];
            let value = obj[key];
            metaDataObject[key] = value;
        })

        products.metadata = metaDataObject;
        // if(metaDataObject[total])

        if (!products.metadata.total) {
            products.metadata.total = 0;
        }
        products.metadata.pages = Math.ceil(products.metadata.total / limit);

        return products;
    }

}



module.exports = CreateProductSearch;