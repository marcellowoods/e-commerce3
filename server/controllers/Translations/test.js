const i18n = require('./i18n.js');

//ex node test.js 
const translate =  () => {

    const word = "orders";
    const t = i18n("bg");
    const translatedWord = t(word);
    console.log(translatedWord);

}

translate();
