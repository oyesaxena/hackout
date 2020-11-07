import React, { useState } from "react";
import Base from "./Base";
import "./home.css";
import WelcomeImage from "../images/home-welcome-image.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Base>
      <section className="landing-section">
        <div className="welcome-board">
          <h1>Welcome To CrossFarm</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
            illo laboriosam est veritatis quaerat consequatur, velit tempore
            eaque, sapiente aliquid incidunt rem in tenetur! Rem deleniti quae
            aliquam ad atque!
          </p>
          <img src={WelcomeImage} alt="" className="welcome-image" />
          <div className="welcome-button-container">
            <Link to={"/signin"} className="login-button">
              LOGIN
            </Link>
            <Link to={"/signup"} className="registration-button">
              REGISTRATION
            </Link>
          </div>
        </div>
      </section>
    </Base>
  );
}
