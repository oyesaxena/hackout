// import React, { useEffect } from "react";
// import { Link, withRouter } from "react-router-dom";
// import { signout, isAutheticated } from "../auth/helper";
// import "./MenuMin.css";

// const currentTab = (history, path) => {
//   if (history.location.pathname === path) {
//     return {
//       color: "#2ecc72",
//     };
//   } else {
//     return {
//       color: "#FFFFFF",
//     };
//   }
// };
// const Menu = ({ history }) => {
//   return (
//     <div
//       style={{ paddingBottom: "100px", borderBottom: "text-primary" }}
//       className="bg-warning"
//     >
//       <nav className="nav bg-warning">
//         <span id="brand">
//           <Link
//             className="nav-link"
//             to="/home"
//             style={currentTab(history, "/")}
//           >
//             <span className="text-dark">HOME</span>
//           </Link>
//         </span>

//         <ul id="menu">
//           {isAutheticated() && isAutheticated().user.role === 0 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/user"
//                 style={currentTab(history, "/user/dashboard")}
//               >
//                 <span className="text-dark" style={{ fontSize: "18px" }}>
//                   DASHBOARD
//                 </span>
//               </Link>
//             </li>
//           )}
//           {isAutheticated() && isAutheticated().user.role === 1 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/admin/dashboard"
//                 style={currentTab(history, "/admin/dashboard")}
//               >
//                 <span className="text-dark" style={{ fontSize: "18px" }}>
//                   ADMIN DASHBOARD
//                 </span>
//               </Link>
//             </li>
//           )}
//           {isAutheticated() && isAutheticated().user.role === 0 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/user/selected"
//                 style={currentTab(history, "/user/dashboard")}
//               >
//                 <span className="text-dark" style={{ fontSize: "18px" }}>
//                   SELECTED
//                 </span>
//               </Link>
//             </li>
//           )}

//           {/* {isAutheticated() && isAutheticated().user.role === 0 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/user/video"
//                 style={currentTab(history, "/user/video")}
//               >
//                 <span className="text-dark" style={{ fontSize: "18px" }}>
//                   SAMPLE VIDEOS
//                 </span>
//               </Link>
//             </li>
//           )} */}
//           {isAutheticated() && isAutheticated().user.role === 1 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/addcustomer"
//                 style={currentTab(history, "/addcustomer")}
//               >
//                 <span className="text-dark" style={{ fontSize: "18px" }}>
//                   ADD CUSTOMER
//                 </span>
//               </Link>
//             </li>
//           )}

//           {isAutheticated() && (
//             <li className="nav-item">
//               <span
//                 className="nav-link"
//                 onClick={() => {
//                   signout(() => {
//                     history.push("/");
//                   });
//                 }}
//               >
//                 <span className="text-dark" style={{ fontSize: "18px" }}>
//                   SIGNOUT
//                 </span>
//               </span>
//             </li>
//           )}
//         </ul>

//         <div id="toggle">
//           <div className="span text-dark">menu</div>
//         </div>
//       </nav>

//       <div id="resize" className="bg-white">
//         <div className="close-btn text-warning">close</div>

//         <ul id="menu">
//           {isAutheticated() && isAutheticated().user.role === 0 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/user/dashboard"
//                 style={currentTab(history, "/user/dashboard")}
//               >
//                 <span className="text-warning">PHOTOS</span>
//               </Link>
//             </li>
//           )}
//           {isAutheticated() && isAutheticated().user.role === 1 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/admin/dashboard"
//                 style={currentTab(history, "/admin/dashboard")}
//               >
//                 <span className="text-warning">ADMIN DASHBOARD</span>
//               </Link>
//             </li>
//           )}
//           {isAutheticated() && isAutheticated().user.role === 0 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/user/selected"
//                 style={currentTab(history, "/user/dashboard")}
//               >
//                 <span className="text-warning">SELECTED</span>
//               </Link>
//             </li>
//           )}

//           {isAutheticated() && isAutheticated().user.role === 0 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/user/videos"
//                 style={currentTab(history, "/user/dashboard")}
//               >
//                 <span className="text-primary">VIDEOS</span>
//               </Link>
//             </li>
//           )}

//           {isAutheticated() && isAutheticated().user.role === 0 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/user/video"
//                 style={currentTab(history, "/user/video")}
//               >
//                 <span className="text-warning">SAMPLE VIDEOS</span>
//               </Link>
//             </li>
//           )}

//           {isAutheticated() && isAutheticated().user.role === 1 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/addcustomer"
//                 style={currentTab(history, "/addcustomer")}
//               >
//                 <span className="text-warning">ADD CUSTOMER</span>
//               </Link>
//             </li>
//           )}
//           {isAutheticated() && isAutheticated().user.role === 1 && (
//             <li className="nav-item">
//               <Link
//                 className="nav-link"
//                 to="/admin/addevents"
//                 style={currentTab(history, "/admin/addevents")}
//               >
//                 <span className="text-warning">EVENTS</span>
//               </Link>
//             </li>
//           )}

//           {isAutheticated() && (
//             <li className="nav-item">
//               <div
//                 className="nav-link point"
//                 onClick={() => {
//                   signout(() => {
//                     history.push("/");
//                   });
//                 }}
//               >
//                 <span className="text-warning">SIGNOUT</span>
//               </div>
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };
// export default withRouter(Menu);

// {
//   /*  */
// }
import React, { useEffect } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";
import "./MenuMin.css";

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
            <span className="text-light">CROSSFARM</span>
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
                  PHOTOS
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/userdata"
                style={currentTab(history, "/userdata")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  DATA
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 1 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/admin/dashboard"
                style={currentTab(history, "/admin/dashboard")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  ADMIN DASHBOARD
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
                to="/user/video"
                style={currentTab(history, "/user/video")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  SAMPLE VIDEOS
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
                to="/admin/data"
                style={currentTab(history, "/admin/data")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  DATA
                </span>
              </NavLink>
            </li>
          )}
          {isAutheticated().user.role === 1 && (
            <li className="nav-item">
              <NavLink
                activeClassName="nav-link-active"
                className="nav-link"
                to="/admin/history"
                style={currentTab(history, "/admin/history")}
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
                to="/admin/addstock"
                style={currentTab(history, "/admin/addstock")}
              >
                <span className="text-light" style={{ fontSize: "18px" }}>
                  ADD STOCK
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
