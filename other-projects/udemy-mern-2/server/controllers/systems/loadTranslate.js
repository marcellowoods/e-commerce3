const Translator = require("../../models/translator");

let transformTranslateForDb = (translateObj) => {

    //transform example
    //{"category": {"bg": "категория", "de": "der categorie"} }
    //to
    //[{word: "category", translations: {"lang": "bg", "word": "категория"}}]

    let translateArray = [];

    for (let word in translateObj) {

        let languagesObj = translateObj[word];

        let languageArray = [];

        for (let language in languagesObj) {
            if (languagesObj[language] != "") {
                languageArray.push({ lang: language, word: languagesObj[language] })
            }
        }

        if (languageArray.length != 0) {
            translateArray.push({ word: word, translations: languageArray })
        }

    }

    return translateArray;

}

let createLoader = (schemaNema) => {

    let data = {};

    let load = async () => {

        Object.keys(data).forEach(function (key) { delete data[key]; });

        let loaded = await Translator.find({
            forSchema: schemaNema
        })

        loaded = loaded[0];
        let wordObjects = loaded["words"];

        wordObjects.forEach(wordObj => {

            let word = wordObj.word;
            let translationsArray = wordObj.translations;
            let translationObj = {};

            translationsArray.forEach((translation) => {

                let lang = translation.lang
                let translationWord = translation.word;
                translationObj[lang] = translationWord;
            })

            data[word] = translationObj;

        })

    }

    let save = async (wordsObj) => {

        //wordsObj example
        //{"category": {"bg": "категория", "de": "der categorie"} }
    
        let words = transformTranslateForDb(wordsObj);

        console.log(words);
    
        let existingTranslate = await Translator.findOne({
            forSchema: schemaNema
        }).exec();
    
        if (existingTranslate === null) {
            const newTranslate = await new Translator(words).save();
            // return newTranslate;
            // res.json(newTranslate);
        } else {
            existingTranslate.words = words;
            
            const updatedTranslator = await existingTranslate.save({ validateBeforeSave: true });
            // return updatedTranslator;
            // res.status(200).json(updatedTranslator);
        }

        await load();
    }



    return {load, save, data};
}

module.exports = createLoader;
