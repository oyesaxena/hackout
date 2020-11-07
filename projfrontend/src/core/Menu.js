import React, { useEffect } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";
import "./menu.css";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#2ecc72",
    };
  } else {
    return {
      color: "#FFFFFF",
    };
  }
};
const Menu = ({ history }) => {
  return (
    <div style={{ paddingBottom: "70px", borderBottom: "text-primary" }}>
      <nav className="nav bg-dark">
        <span id="brand">
          <Link className="nav-link" to="/" style={currentTab(history, "/")}>
            <span className="text-light">AroundMe</span>
          </Link>
        </span>

        <ul id="menu">
          {isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/user/dashboard"
                style={currentTab(history, "/user/dashboard")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  DASHBOARD
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/user/selected"
                style={currentTab(history, "/user/dashboard")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  SELECTED
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/user/history"
                style={currentTab(history, "/user/history")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  HISTORY
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/user/sellerpricing"
                style={currentTab(history, "/user/sellerpricing")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  SELLER PRICING
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/user/guidepricing"
                style={currentTab(history, "/guidepricing")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  GUIDE PRICING
                </span>
              </NavLink>
            </li>
          )}
          {/* CHANGE COMPONENT TO DATA COMPONENT */}
          {isAutheticated().user.role === 1 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/seller/dashboard"
                style={currentTab(history, "/seller/dashboard")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  DASHBOARD
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 1 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/seller/history"
                style={currentTab(history, "/seller/history")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  HISTORY
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 1 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/seller/addstock"
                style={currentTab(history, "/seller/addstock")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  STOCK PRICING
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 2 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/guide/dashboard"
                style={currentTab(history, "/guide/dashboard")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  DASHBOARD
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 2 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/guide/pricing"
                style={currentTab(history, "/guide/pricing")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  CHANGE PRICING
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 2 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/guide/history"
                style={currentTab(history, "/guide/history")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  HISTORY
                </span>
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              <span className="text-light" style={{ fontSize: "18px" }}>
                SIGNOUT
              </span>
            </span>
          </li>
        </ul>

        <div id="toggle">
          <div className="span text-light">menu</div>
        </div>
      </nav>

      {/* <div id="resize" className="bg-white">
        <div className="close-btn text-warning">close</div>

        <ul id="menu">
          {isAutheticated() && isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/user/dashboard"
                style={currentTab(history, "/user/dashboard")}
              >
                <span className="text-warning">PHOTOS</span>
              </NavLink>
            </li>
          )}
          {isAutheticated() && isAutheticated().user.role === 1 && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/dashboard"
                style={currentTab(history, "/admin/dashboard")}
              >
                <span className="text-warning">ADMIN DASHBOARD</span>
              </NavLink>
            </li>
          )}
          {isAutheticated() && isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/user/selected"
                style={currentTab(history, "/user/dashboard")}
              >
                <span className="text-warning">SELECTED</span>
              </NavLink>
            </li>
          )}

          {isAutheticated() && isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/user/videos"
                style={currentTab(history, "/user/dashboard")}
              >
                <span className="text-primary">VIDEOS</span>
              </NavLink>
            </li>
          )}

          {isAutheticated() && isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/user/video"
                style={currentTab(history, "/user/video")}
              >
                <span className="text-warning">SAMPLE VIDEOS</span>
              </NavLink>
            </li>
          )}

          {isAutheticated() && isAutheticated().user.role === 1 && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/addcustomer"
                style={currentTab(history, "/addcustomer")}
              >
                <span className="text-warning">ADD CUSTOMER</span>
              </NavLink>
            </li>
          )}
          {isAutheticated() && isAutheticated().user.role === 1 && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/addevents"
                style={currentTab(history, "/admin/addevents")}
              >
                <span className="text-warning">EVENTS</span>
              </NavLink>
            </li>
          )}

          {isAutheticated() && (
            <li className="nav-item">
              <div
                className="nav-link point"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                <span className="text-warning">SIGNOUT</span>
              </div>
            </li>
          )}
        </ul>
      </div> */}
    </div>
  );
};
export default withRouter(Menu);
