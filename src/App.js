import React, { useState } from "react";
// import Dropdown from "./components/Dropdown";
// import Translate from "./components/Translate";
// import Accordion from "./components/Accordion";
// import
import { Accordion, Search, Translate, Dropdown, Header } from "./components";
import { items, options } from "./data";
import Route from "./router/router";

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div>
      <Header />
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          label="Select a color"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};

export default App;
