import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions/index";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";


const App = (props) => {
  useEffect(() => {
    const method = props.authCheckState
    method()
    
  }, [props.authCheckState]);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" component={Auth} />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/logout" component={Logout} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        {routes}
        <Redirect to="/" />
      </Layout>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = { authCheckState };

export default connect(mapStateToProps, mapDispatchToProps)(App);
