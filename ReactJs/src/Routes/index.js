import React, { Fragment } from "react";
import { Route, Link, BrowserRouter as router } from "react-router-dom";
import Home from "../containers/Home";
import Login from "../containers/Home/Login";
import Register from "../containers/Home/Register";
const Routes = () => (
  <Fragment>
    <Route exact path={"/"} component={Login}></Route>
    <Route exact path={"/Login"} component={Login}></Route>
    <Route exact path={"/Register"} component={Register}></Route>
    <Route exact path={"/home"} component={Home}></Route>
  </Fragment>
);

export default Routes;
