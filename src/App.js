import React, { Component } from "react";

import AppFooter from "./views/appFooter/AppFooter";
import { Layout } from "antd";
import { store } from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { history } from "./store";
import { Route, Switch } from "react-router";

import Feed from "./containers/FeedContiner";
import AppHeader from "./containers/AppHeaderContainer";
import Login from "./containers/LoginContainer";
import Signup from "./containers/SignupContainer";

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout className="layout" >
            <AppHeader />
            <Content style={{ padding: "0 50px" }}>
              <Switch>
                <Route path="/" exact component={Feed} />
                <Route path="/feed" exact component={Feed} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
              </Switch>
            </Content>
            <AppFooter />
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}
export default App;
