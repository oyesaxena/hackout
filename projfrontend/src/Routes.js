import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import GuideStock from "./user/guideStock";
import SellerStock from "./user/sellerStock";
import Signin from "./user/Signin";
import AWS from "./user/sellerStock";
import SellerRoute from "./auth/helper/SellerRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import GuideRoute from "./auth/helper/GuideRoutes";
import Dashboard from "./user/userDashboard";
import UserDashBoard from "./user/Photos";
import Selectedphotos from "./user/Selected";
import Videos from "./user/Video";
import AdminDashBoard from "./admin/AdminDashBoard";
import UserSelectedImages from "./admin/UserSelectedImages";
import UserSelectedImagesTourists from "./admin/userSelectedImagesTourists";
import userEdit from "./admin/userEdit";
import AddMoreImages from "./admin/addMoreImages";
import { signin, isAutheticated } from "./auth/helper";
import Photos from "./user/Photos";
import adminData from "./admin/adminData";
import adminHistory from "./admin/adminHistory";
import GuideDashboard from "./user/guideDashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Signin} /> */}
        <Route
          path="/"
          exact
          render={() =>
            isAutheticated() ? (
              isAutheticated().user.role === 0 ? (
                <Redirect
                  to={{
                    pathname: "/user/dashboard",
                    state: { from: "/" },
                  }}
                />
              ) : isAutheticated().user.role === 1 ? (
                <Redirect
                  to={{
                    pathname: "/seller/dashboard",
                    state: { from: "/" },
                  }}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: "/guide/dashboard",
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
        <Route path="/test" exact component={GuideStock} />
        <Route path="/signUp" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/addcustomer" exact component={AWS} />
        <GuideRoute path="/guide/dashboard" exact component={GuideDashboard} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/user" exact component={Dashboard} />
        <PrivateRoute path="/userImages" exact component={UserDashBoard} />
        <PrivateRoute path="/user/selected" exact component={Selectedphotos} />
        <PrivateRoute path="/user/videos" exact component={Videos} />
        <SellerRoute path="/testSeller" exact component={SellerStock} />
        <SellerRoute
          path="/seller/dashboard"
          exact
          component={AdminDashBoard}
        />
        <SellerRoute
          path="/userSelectedImages/:userId"
          exact
          component={UserSelectedImages}
        />
        <GuideRoute
          path="/userSelectedImagesTourists/:userId"
          exact
          component={UserSelectedImagesTourists}
        />
        <Route path="/farmerImages/:userId" exact component={Photos} />
        <SellerRoute path="/userEdit/:userId" exact component={userEdit} />
        <SellerRoute
          path="/userAddImages/:userId"
          exact
          component={AddMoreImages}
        />
        <SellerRoute path="/admin/addstock" exact component={AWS} />
        <SellerRoute path="/admin/data" exact component={adminData} />
        <SellerRoute path="/admin/history" exact component={adminHistory} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
