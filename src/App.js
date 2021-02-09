import React from "react";
import Home from "./components/pages/Home";
import Navigationbar from "./components/elements/Navigationbar";
import MyOrders from "./components/MyOrders";
import Order from "./components/Order";
import AboutApp from "./components/AboutApp/AboutApp";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <Navigationbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/myOrders" component={MyOrders} />
            <Route exact path="/myOrders/:id" component={Order} />
          </Switch>
        </div>
      </Router>
      <AboutApp />
    </React.Fragment>
  );
}

export default App;
