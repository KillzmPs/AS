import React from "react";
import "./Box.css";

const Box = ({ children }) => {

  return (
    <div className="Box_Main">
        {children}
    </div>
  );
};

export default Box;
