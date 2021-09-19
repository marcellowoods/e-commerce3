let addTranslationToFilterValues = (values, translations, lang) => {
    values.forEach((value) => {
        if (value._id !== undefined) {
            if (value._id in translations) {
                let languages = translations[value._id];
                if (lang in languages) {
                    value.name = languages[lang];
                }
            }
        }
    })
}

exports.addTranslationsToFilters = (facetFilters, translations, lang) => {

    facetFilters.forEach(filterObj => {
        let id = filterObj._id;
        if (id in translations) {
            let languages = translations[id];
            if (lang in languages) {
                filterObj.name = languages[lang];
            }
        }
        addTranslationToFilterValues(filterObj.values, translations, lang);
    })
}

exports.getTranslationsForFields = (facetFilters, translations, langArray) => {

    let translatedWords = {};

    for(let filter in facetFilters ){

        let values = facetFilters[filter];
        values.forEach((value) => {
            if (value._id) {
    
                let words = {};
                let languages = translations[value._id];
                for (let lang of langArray) {
    
                    if (languages && lang in languages) {
                        words[lang] = languages[lang];
                    } else {
                        words[lang] = "";
                    }
                }
                translatedWords[value._id] = words;
            }
        })

    }

    return translatedWords;
}

exports.getTranslationsForProperties = (propertiesArray, translations, langArray) => {

    let wordObj = {};

    propertiesArray.forEach(property => {

        let languages = translations[property];

        let words = {};

        for (let lang of langArray) {

            if (languages && lang in languages) {
                words[lang] = languages[lang];
            } else {
                words[lang] = "";
            }
        }

        wordObj[property] = words;
    })

    return wordObj;
}



