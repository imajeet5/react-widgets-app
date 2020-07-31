import React, { useState, useEffect } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState("");
  const [debounceTerm, setDebounceTerm] = useState(text);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebounceTerm(text);
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [text]);
  // useEffect hook
  useEffect(() => {
    const doTranslation = async () => {
      const params = {
        q: debounceTerm,
        target: language.value,
        key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
      };
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params,
        }
      );

      setTranslated(data.data.translations[0].translatedText);
    };
    doTranslation();
  }, [debounceTerm,language]);

  // returned JSX
  return <div>{translated}</div>;
};

export default Convert;
