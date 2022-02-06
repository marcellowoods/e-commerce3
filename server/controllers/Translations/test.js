const i18n = require('./i18n.js');
//https://medium.com/geekculture/how-does-server-side-internationalization-i18n-look-like-6ddbd15147b7

//ex node test.js 
const translate =  () => {

    const word = "orders";
    const t = i18n("bg");
    const translatedWord = t(word);
    console.log(translatedWord);

}

translate();
