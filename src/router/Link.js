import React from "react";

const Link = ({ children, ...restProps }) => {
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();
    window.history.pushState({}, "", restProps.href);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  return (
    <a onClick={onClick} {...restProps}>
      {children}
    </a>
  );
};

export default Link;
