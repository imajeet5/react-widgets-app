import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = (props) => {
  const [term, setTerm] = useState("programming");
  const [results, setResults] = useState([]);

  console.log("I run with every render");
  console.log(results);

  // We want to do the api call every single time user presses a key
  // so useEffect will run initially then every time component re-render and term changes
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      if (data.query) {
        setResults(data.query.search);
      }
    };

    if (term && !results.length) {
      search();
    } else {
      const timerRef = setTimeout(() => {
        if (term) search();
      }, 1000);

      return () => {
        console.log("Clean up");
        clearTimeout(timerRef);
      };
    }
  }, [term, results.length]);

  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            className="ui button"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
