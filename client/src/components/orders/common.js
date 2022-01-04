const getLocaleDate = (dateStr, lang) => {

    let options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
        month: 'long',

    }

    let date = new Date(dateStr);
    return date.toLocaleDateString(lang, options);
}

export { getLocaleDate }