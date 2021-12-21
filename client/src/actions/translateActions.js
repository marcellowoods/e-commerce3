
const getTranslatedField = (obj, field, forLang) => {

    //see product and category models in backend 

    const translations = obj.translations;

    if (translations) {
        const translationsForLang = translations.find(({ lang }) => lang == forLang);

        if (translationsForLang && (field in translationsForLang)) {
            const translatedField = translationsForLang[field];
            return translatedField;
        }
    }

    const notTranslatedField = obj[field];
    return notTranslatedField;

}

export { getTranslatedField }