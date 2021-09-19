import React, { useEffect, useState } from "react";
import { getTranslations, postTranslations } from "../../../functions/translations";
import { Input } from 'antd';
import { Button } from 'antd';
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';
import { LoadingOutlined } from "@ant-design/icons";

const LanguageInput = ({ translations, setTranslations, word, language }) => {

    let wordInLanguage = translations[word][language]

    let handleChange = (e) => {
        let value = e.target.value;
        console.log(value);

        setTranslations(prev => {
            let prevTranslations = prev[word];
            let newTranslations = { ...prevTranslations, [language]: value }

            return { ...prev, [word]: newTranslations };
        })
    }

    return <Input value={wordInLanguage} onChange={handleChange} placeholder="none" prefix={language} />
}

const Entry = ({ translations, setTranslations, word }) => {

    let translation = translations[word];

    let renderTranslations = () => {
        let renderArray = [];

        for (let language in translation) {

            renderArray.push(
                <LanguageInput
                    key={language}
                    translations={translations}
                    setTranslations={setTranslations}
                    word={word}
                    language={language}
                />
            )
        }
        return renderArray;
    }

    return (
        <div className=" pb-5">
            <h3> {word}: </h3>
            {renderTranslations()}
        </div >
    );
};

const TranslateModel = () => {

    let history = useHistory();
    const [translations, setTranslations] = useState([]);
    const [loading, setLoading] = useState(false);

    let loadTranslations = (component) => {

        setLoading(true);

        getTranslations().then((res) => {

            if (component.isMounted) {

                let translations = res.data;

                setLoading(false);

                setTranslations(translations);

                console.log(translations)
            }
        });
    }

    useEffect(() => {

        let component = { isMounted: true };

        loadTranslations(component);

        return () => { component.isMounted = false };
    }, [])

    let renderWords = () => {
        let renderArray = [];
        for (let word in translations) {
            renderArray.push(<Entry key={word} word={word} translations={translations} setTranslations={setTranslations} />)
        }
        return renderArray;
    }

    let submitTranslation = () => {

        setLoading(true);

        postTranslations({ words: translations, forSchema: "product" }).then((res) => {
            setLoading(false);
            toast.success(`translation is updated`);
            history.push("/shop");
        })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.err);
            });
    }



    return (

        loading ? (
            <div >
                <LoadingOutlined className="text-danger h1" />
            </div>
        ) : (
            <div >
                <div className="pb-3">

                    <h2> Translate model </h2>
                    <Button onClick={submitTranslation}>Submit</Button>
                </div >

                {renderWords()}
            </div >
        )

    );
};

export default TranslateModel;
