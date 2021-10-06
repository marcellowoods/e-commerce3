const ObjectId = mongoose.Types.ObjectId;

function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

function filterPropertiesArray(arr) {

    return arr.map(property => {

        if (ObjectId.isValid(property)) {
            let obId = new ObjectId(property)
            if ((String)(obId) === property) {
                return obId;
            }
            return property;

        }
        return property;
    })

}