import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
// import AWS from "./user/AWS";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import SellerRoute from "./auth/helper/SellerRoutes";
import GuideRoute from "./auth/helper/GuideRoutes";
import Dashboard from "./user/userDashboard";
import UserDashBoard from "./user/Photos";
import Selectedphotos from "./user/Selected";
import AdminDashBoard from "./admin/AdminDashBoard";
import UserSelectedImages from "./admin/UserSelectedImages";
import UserSelectedImagesTourists from "./admin/userSelectedImagesTourists";
import userEdit from "./admin/userEdit";
import AddMoreImages from "./admin/addMoreImages";
import { signin, isAutheticated } from "./auth/helper";
import Photos from "./user/Photos";
import GuideStock from "./user/guideStock";
import SellerStock from "./user/sellerStock";
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

        <Route path="/signUp" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />

        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/user/selected" exact component={Selectedphotos} />
        <PrivateRoute
          path="/user/sellerpricing"
          exact
          component={SellerStock}
        />
        <PrivateRoute path="/user/guidepricing" exact component={GuideStock} />
        <PrivateRoute path="/farmerImages/:userId" exact component={Photos} />

        <SellerRoute
          path="/seller/dashboard"
          exact
          component={AdminDashBoard}
        />
        <GuideRoute path="/guide/dashboard" exact component={AdminDashBoard} />
        <GuideRoute path="/guide/pricing" exact component={GuideStock} />
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
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
