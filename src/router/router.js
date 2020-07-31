import { useState, useEffect } from "react";

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  // useEffect hook
  useEffect(() => {
    const onLocationChanged = () => {
      // when this location changes this function will get executed and we want to update the new state
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", onLocationChanged);

    return () => {
      window.removeEventListener("popstate", onLocationChanged);
    };
  }, []);
  return currentPath === path ? children : null;
};

export default Route;
