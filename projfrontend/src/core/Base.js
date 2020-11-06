import React from "react";
import Menu from "./Menu";
import { signout, isAutheticated } from "../auth/helper";
import "./base.css";
import background from "../images/background.png";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "p-4",
  children,
}) => {
  return (
    <div>
      <img src={background} alt="" className="background-image" />
      {isAutheticated() && <Menu />}
      <div className={className}>{children}</div>
    </div>
  );
};
export default Base;
