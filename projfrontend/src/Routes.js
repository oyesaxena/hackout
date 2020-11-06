import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AWS from "./user/AWS";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Dashboard from "./user/userDashboard";
import UserDashBoard from "./user/Photos";
import Selectedphotos from "./user/Selected";
import Videos from "./user/Video";
import AdminDashBoard from "./admin/AdminDashBoard";
import UserSelectedImages from "./admin/UserSelectedImages";
import userEdit from "./admin/userEdit";
import AddMoreImages from "./admin/addMoreImages";
import { signin, isAutheticated } from "./auth/helper";
import Photos from "./user/Photos";
import adminData from "./admin/adminData";
import adminHistory from "./admin/adminHistory";
// import { signup } from "../../controllers/auth";
// import { signin } from "./auth/helper";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Signin} /> */}
        <Route
          path="/"
          exact
          render={(props) =>
            isAutheticated() ? (
              isAutheticated().user.role === 0 ? (
                <Redirect
                  to={{
                    pathname: "/user/dashboard",
                    state: { from: "/" },
                  }}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: "/admin/dashboard",
                    state: { from: "/" },
                  }}
                />
              )
            ) : (
              <Home />
            )
          }
        />

        <Route path="/AWS" exact component={AWS} />

        <Route path="/signUp" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />

        <Route path="/addcustomer" exact component={AWS} />

        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/user" exact component={Dashboard} />
        <PrivateRoute path="/userImages" exact component={UserDashBoard} />
        <PrivateRoute path="/user/selected" exact component={Selectedphotos} />
        <PrivateRoute path="/user/videos" exact component={Videos} />

        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/userSelectedImages/:userId"
          exact
          component={UserSelectedImages}
        />

        <Route path="/farmerImages/:userId" exact component={Photos} />

        <AdminRoute path="/userEdit/:userId" exact component={userEdit} />
        <AdminRoute
          path="/userAddImages/:userId"
          exact
          component={AddMoreImages}
        />
        <AdminRoute path="/admin/addstock" exact component={AWS} />
        <AdminRoute path="/admin/data" exact component={adminData} />
        <AdminRoute path="/admin/history" exact component={adminHistory} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
