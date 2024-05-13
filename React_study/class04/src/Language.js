import React, {createContext, useState, useContext} from 'react';

const LanguageContext = createContext();

function LanguageProvider({children}) {
    const [lang, setLang] = useState('en');

    const switchLang = () => {
        setLang(prevLang => prevLang === 'en' ? 'ko' : 'en');
        // 이전 상태를 체크
        // 만약 이전 언어가 'en'라면 'ko'로 바꿔줘
    };

    const handleChange = (event) => {
        setLang(event.target.value);
    }

    return(
        <LanguageContext.Provider value={{lang, switchLang, handleChange}}>
            {children}
        </LanguageContext.Provider>
    );
}

function SayHello() {
    const {lang, handleChange} = useContext(LanguageContext);

    return (
    <p>{lang === 'ko' ? '안녕하세요' : 'Hello'}</p>
    )
}

function SelectLang() {
    const {lang, handleChange} = useContext(LanguageContext);

    return (
        <select onChange={handleChange}>
            <option value="en">English</option>
            <option value="ko">한국어</option>
        </select>
    )
}

function Language() {
    return (
                <LanguageProvider value="ko">
                    <SelectLang/>
                    <SayHello/>
                </LanguageProvider>
    )
}

export default Language;