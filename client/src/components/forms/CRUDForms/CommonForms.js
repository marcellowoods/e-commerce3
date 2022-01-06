import React, { useEffect } from "react";

const NameForm = ({ name, setName }) => {
    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                />

            </div>
        </div>
    )
}

const DescriptionForm = ({ description, setDescription }) => {
    return (
        <div className="p-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Description
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">

                <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pr-12 sm:text-sm border-gray-300 rounded-md  ease-linear transition-all duration-150"
                />

            </div>
        </div>
    )
}

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

const TranslationsForm = ({ translations, setTranslations }) => {

    //expects empty translations array

    useEffect(() => {

        if (translations.length == 0) {
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

                return (
                    <div key={lang}>
                        <h3 className="pt-4 text-center">{lang}</h3>
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

export { NameForm, DescriptionForm, TranslationsForm }