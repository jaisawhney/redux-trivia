export const unescapeSpecialChars = (str: string) => {
    let txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
};
