import React, { useEffect } from "react";
import {
    PriceForm,
    NameForm,
    QuantityForm,
    DescriptionForm
} from "./ProductForms";

const SingleTranslation = ({ lang, description, name, handleEditTranslations }) => {

    return (
        <div className="">

            <NameForm
                name={name}
                setName={(newVal) => handleEditTranslations(lang, "name", newVal)}
            />

            <DescriptionForm
                description={description}
                setDescription={(newVal) => handleEditTranslations(lang, "description", newVal)}
            />

        </div>
    )

}

const makeTranslationsObj = () => {

    const languagesWithoutEnglish = ["bg"];

    return (
        languagesWithoutEnglish.map(lang => {
            return { lang, description: "", name: "" }
        })
    );
}

const Translations = ({ translations, setTranslations }) => {

    //expects empty translations array

    useEffect(() => {

        if(translations.length == 0){
            setTranslations(makeTranslationsObj());
        }
        
    }, [translations])

    const handleEditTranslations = (lang, field, newVal) => {

        let translationObj = translations.find((tObj) => tObj.lang == lang);
        let newTranslationObj = { ...translationObj, [field]: newVal };

        setTranslations(prev => {

            let filtered = prev.filter((el) => el.lang != lang);

            return [...filtered, newTranslationObj];
        })
    }

    return (
        <div>
            {translations.map(({ lang, description, name }) => {
                console.log(lang);
                console.log(description)
                return (
                    <div key={lang}>
                        <h3 className="pt-12 text-center">{lang}</h3>
                        <SingleTranslation
                            lang={lang}
                            description={description}
                            name={name}
                            handleEditTranslations={handleEditTranslations}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Translations;