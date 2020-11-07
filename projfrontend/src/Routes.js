import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
// import AWS from "./user/AWS";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import SellerRoute from "./auth/helper/SellerRoutes";
import GuideRoute from "./auth/helper/GuideRoutes";
import SellerStock from "./user/sellerStock";
import GuideStock from "./user/guideStock";
import Dashboard from "./user/userDashboard";
import UserDashBoard from "./user/Photos";
import Selectedphotos from "./user/Selected";
import AdminDashBoard from "./admin/AdminDashBoard";
import GuideDashboard from "./user/guideDashboard";
import UserSelectedImages from "./admin/UserSelectedImages";
import UserSelectedImagesTourists from "./admin/userSelectedImagesTourists";
import userEdit from "./admin/userEdit";
import AddMoreImages from "./admin/addMoreImages";
import History from "./core/History";
import { signin, isAutheticated } from "./auth/helper";
import Photos from "./user/Photos";

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

        {/* <Route path="/test" exact component={SellerStock} /> */}
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/user/selected" exact component={Selectedphotos} />
        <PrivateRoute
          path="/user/sellerpricing"
          exact
          component={SellerStock}
        />
        <PrivateRoute path="/user/guidepricing" exact component={GuideStock} />
        <PrivateRoute path="/farmerImages/:userId" exact component={Photos} />
        <PrivateRoute path="/user/history/" exact component={History} />

        <GuideRoute path="/guide/dashboard" exact component={GuideDashboard} />
        <GuideRoute path="/guide/pricing" exact component={GuideStock} />
        <GuideRoute
          path="/userSelectedImagesTourists/:userId"
          exact
          component={UserSelectedImagesTourists}
        />
        <GuideRoute path="/guide/history" exact component={History} />

        <SellerRoute
          path="/seller/dashboard"
          exact
          component={AdminDashBoard}
        />
        <SellerRoute
          path="/userSelectedSellerImages/:userId"
          exact
          component={UserSelectedImages}
        />

        <SellerRoute path="/userEdit/:userId" exact component={userEdit} />
        <SellerRoute
          path="/userAddImages/:userId"
          exact
          component={AddMoreImages}
        />
        <SellerRoute path="/seller/addstock" exact component={SellerStock} />
        <SellerRoute path="/seller/history" exact component={History} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
