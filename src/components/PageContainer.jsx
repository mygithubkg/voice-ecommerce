import React from "react";

const PageContainer = ({ children, fullWidth = false, className = "" }) => {
  const widthClass = fullWidth ? "page-container-full" : "page-container-standard";
  const classes = ["page-container-base", widthClass, className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
};

export default PageContainer;
