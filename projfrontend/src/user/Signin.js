import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../auth/helper";
import loginWelcomeImage from "../images/home-welcome-image-cut.png";
import "./signin.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              didRedirect: true,
            });
          });
        }
      })
      .catch(() => console.log("Request Failed"));
  };

  const performedRedirect = () => {
    //TODO
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
    return (
      <Base className="text-dark block-container">
        <section className="land-section">
          <div className="hero">
            <div className="hero-login-form">
              <h1>Login To CrossFarm</h1>
              <div className="login-form-container">
                <img
                  className="login-form-image"
                  src={loginWelcomeImage}
                  alt=""
                />
                <div className="form-right">
                  <div className="form-container">
                    <form>
                      <input
                        type="email"
                        onChange={handleChange("email")}
                        name="loginID"
                        placeholder="Email"
                        value={email}
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange("password")}
                      />
                      <button onClick={onSubmit}>LOGIN</button>
                    </form>
                  </div>
                  <button className="register-button">REGISTER</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Base>
    );
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>loading....</h2>
        </div>
      )
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performedRedirect()}
    </div>
  );
};

export default Signin;
