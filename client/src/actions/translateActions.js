
const getTranslatedField = (obj, field, lang) => {

    //see product and category models in backend 

    const translations = obj.translations;

    if (translations) {
        const translationsForLang = translations.find(({ language }) => language == lang);

        if (translationsForLang && (field in translationsForLang)) {
            const translatedField = translationsForLang[field];
            return translatedField;
        }
    }

    const notTranslatedField = obj[field];
    return notTranslatedField;

}

export { getTranslatedField }