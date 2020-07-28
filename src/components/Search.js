import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = (props) => {
  const [term, setTerm] = useState("");

  console.log("I run with every render");

  const arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const promises = [];
  for (let el of arr) {
    promises.push(
      axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: el,
        },
      })
    );
  }

  // We want to do the api call every single time user presses a key
  // so useEffect will run initially then every time component re-render and term changes
  useEffect(() => {
    const search = async () => {
      //   const result = await axios.get("https://en.wikipedia.org/w/api.php", {
      //     params: {
      //       action: "query",
      //       list: "search",
      //       origin: "*",
      //       format: "json",
      //       srsearch: term,
      //     },
      //   });
      const result = [];
      for (let i = 0; i < promises.length; i++) {
        const r = await promises[i];
        result.push(r.data.query.search[0].title);
      }
      // promises.forEach(async promise => {
      //     const r = await promise
      //     result.push(r.data.query.search[0].title)
      // })
        console.log(result);
      //   const result = await Promise.all(promises);

      //   console.log(result.map((r) => r.data.query.search[0].title));
      console.log(term);
    };
    search();
  }, [term]);

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
    </div>
  );
};

export default Search;
