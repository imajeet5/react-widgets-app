import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, label, onSelectedChange }) => {
  // states
  const [open, setOpen] = useState(false);

  //refs
  const ref = useRef();

  // useEffect hooks
  // we want this to run one time to add event-listener
  useEffect(() => {
    // if the use click anywhere inside of the dropdown, we don't want this event listener to do anything.
    // we are going to use useRef to get reference to the most parent element that is been created by the dropdown.
    // We then compare the element this is clicked on to see if that is inside the reference that we get.
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) return;
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick);

    // this will also run when we unmount the component
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

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
        <label className="label">{label}</label>
        <div
          className={`ui selection dropdown ${open ? "visible active" : ""} `}
          onClick={() => setOpen(!open)}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""} `}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
