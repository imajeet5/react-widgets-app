import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(1);
  const ref = useRef();

  // are we are using the index variable here but it is not passed into the array, so as useEffect is executed once and initial value 
  // is used by the callback in 
  useEffect(() => {
    document.body.addEventListener("click", (event) => {
      if (ref.current.contains(event.target)) return;
      setIndex(index + 1);
    });
  }, []);

  const toggleDropDown = () => {
    setIndex(index + 1);
  };

  // JSX generator functions
  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">Select a Color</label>
        <div
          className={`ui selection dropdown ${open ? "visible active" : ""} `}
          onClick={toggleDropDown}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""} `}>
            {renderedOptions}
          </div>
        </div>
      </div>
      <h1>Current Index : {index}</h1>
    </div>
  );
};

export default Dropdown;
