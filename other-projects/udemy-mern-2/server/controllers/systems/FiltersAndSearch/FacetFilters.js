const {addTranslationToFilters} = require("./addTranslate");

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

//addFieldsObj - https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
//example
// addFieldsObj = {
//     rating: {
//         $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
//     },
// },

let CreateFacetedSearch = ({ mongooseSchema, addFieldsObj, lookupArray, avoidPropertiesArray, minMaxArray, regexArray, convertPropertyObj }) => {
    //https://stackoverflow.com/questions/30208088/sum-after-groupby-in-mongoose
    //https://docs.mongodb.com/manual/reference/operator/aggregation/facet/
    //https://stackoverflow.com/questions/12428989/facet-search-using-mongodb

    //returns async function which returns array of properties and their distinct values
    //each object in array is in the format of {"type": type, "values": values, "name": name}
    //each type can be either "minmax" or "options"
    //properties in minMaxArray are set as "minmax" otherwise as "options"

    //example
    // facetFilters = [
    //     {
    //         "type": "minmax",
    //         "values": [
    //             500,
    //             700
    //         ],
    //         "name": "price"
    //     },
    //     {
    //         "type": "options",
    //         "values": [
    //             {
    //                 "_id": "apple",
    //                 "count": 1,
    //                 "name": "Apple"
    //             },
    //             {
    //                 "_id": "asus",
    //                 "count": 3,
    //                 "name": "asus"
    //             },
    //         ],
    //         "name": "category"
    //     },
    // ]

    //returned async function takes filter from client, iterates all mongooseSchema properties, skips properties in avoidProperties array
    //types are either "minmax" or "options"
    //expects filters in the format
    // "filters" =  [
    //     {"type": "options", "name": "category", "values": ["apple"]},
    //     {"type": "minmax", "name": "price", "values": [0, 5000]}
    // ]

    let getAggregate = (property, filters) => {


        // console.log(filters);

        let arr = [];

        //https://www.youtube.com/watch?v=8HzWff_dHlc&list=PLWkguCWKqN9OwcbdYm4nUIXnA2IoXX0LI&index=36
        if (property in convertPropertyObj) {

            arr.push({ "$unwind": `$${property}` });
        }

        let match = {};

        for (let filterName in filters){

            let type = null;

            if(minMaxArray.includes(filterName)){
                type = "minmax";
            }else if(regexArray.includes(filterName)){
                type = "regex"
            }else{
                type = "options"
            }

            if(type == null){
                continue;
            }

            let values = filters[filterName];

            if(type == "options"){
                let idText = (filterName in convertPropertyObj) ? convertPropertyObj[filterName] : filterName;
                match[idText] = {
                    $in: values
                }
            }else if(type == "minmax"){
                match[filterName] = {
                    $gte: values[0],
                    $lte: values[1],
                }
            }else if(type == "regex"){
                let regexSearch = filters[filterName];
                match[filterName] = { $regex: regexSearch, $options: 'i' };
            }
        }

        let idText = (property in convertPropertyObj) ? convertPropertyObj[property] : property;

        arr.push({ $match: { ...match, [idText]: { $exists: 1 } } })

        //https://www.youtube.com/watch?v=dGs6Nj6H7JA&list=PLWkguCWKqN9OwcbdYm4nUIXnA2IoXX0LI&index=32
        if (minMaxArray.includes(property)) {
            arr.push(
                {
                    "$group": {
                        "_id": null,
                        "max": { $max: `$${property}` },
                        "min": { $min: `$${property}` }
                    }
                },
                { $unset: "_id" }
            )
        } else {
            arr.push(
                {
                    "$group": {
                        "_id": `$${idText}`,
                        "count": { $sum: 1 },
                        // "name": { $last: `$${property}.name` }
                    }
                }
            )
        }

        return arr;

    }

    return async (filters) => {

        let filtersFacet = {};

        if(addFieldsObj === undefined){
            addFieldsObj = {};
        }

        let allProperties = [...Object.keys(mongooseSchema.schema.obj), ...Object.keys(addFieldsObj)]

        for (let property of allProperties) {

            //array which contains all the schema properties which should be avoided
            if (avoidPropertiesArray.includes(property.toString())) {
                continue;
            }

            //convertPropertyObj example {"ratings": "ratings.star"}
            let filtersWithoutProperty = {...filters};
            delete filtersWithoutProperty[property];

            filtersFacet[property] = getAggregate(property, filtersWithoutProperty);
            
        }

        let addFields = [];
        if ( Object.keys(addFieldsObj).length !== 0) {
            addFields.push({
                $addFields: {
                    ...addFieldsObj
                }
            })
        }

        const aggregate = await mongooseSchema.aggregate([
            ...addFields,
            ...lookupArray,
            {
                $facet: { ...filtersFacet }
            }
        ]).exec();


        let allFilters = aggregate[0];
        console.log(allFilters);
        let facetFilters = [];


        for (let property of Object.keys(allFilters)) {

            let filterObject = allFilters[property];
            let element = {};

            element["_id"] = property;

            if (minMaxArray.includes(property)) {
                element["type"] = "minmax";
                let hasValues = filterObject.length >= 1;
                element["values"] = hasValues ? [filterObject[0]["min"], filterObject[0]["max"]] : [];
            } else {
                element["type"] = "options";
                element["values"] = filterObject;
            }

            
            facetFilters.push(element);

        }

        return facetFilters;

    }

}

//example aggregate
// const aggregate = await Product.aggregate([
//     {
//         $lookup:
//         {
//             from: "categories",
//             localField: "category",
//             foreignField: "_id",
//             as: "category"
//         }
//     }
// { "$unwind": "$category" },
// { $match: { "category.slug": { '$in': ["asus", "apple"] } } },
// {
//     "$group": {
//         "_id": '$category.slug',
//         "count": { $sum: 1 }, 
//     }
// }
// ]).exec();

module.exports = CreateFacetedSearch;