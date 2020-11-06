import React from "react";
import Menu from "./Menu";
import { isAutheticated } from "../auth/helper";
import "./base.css";
import background from "../images/background.png";

const Base = ({ children }) => {
  return (
    <div>
      <img src={background} alt="" className="background-image" />
      {isAutheticated() && <Menu />}
      <div>{children}</div>
    </div>
  );
};
export default Base;
