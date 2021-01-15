import "./App.css";
import Home from "./Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogIn from "./components/login/Login";
import SideBar from "./components/account/sideBar/SideBar";
import "semantic-ui-css/semantic.min.css";
import Layout from "./components/layout/Layout";
import Account from "./components/account/Account";

//tasks left
//adding  active colour to navbar
//removing some un-necessary css
//making about us page
//making contact us page
//giving link insta etc
//solving css issue of pranshi
//making our website accessible theough google
//adding public and private routing and for that we need a authenticated field(may be in this we mi8 not)
//adding a good loader
// need to add max min values for costs
// Need to add filter for status
// Proper Validations need to be added in all the available forms

function App() {
  //localStorage.setItem("loggedIn", "false");
  //let loggedIn = localStorage.getItem("loggedIn") === "true" ? "true" : "false";
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={LogIn} />
        {/* <Route path="/account" exact component={SideBar} />
        <Route path="/account/:pageName" component={SideBar} /> */}
        <Layout>
          <Route path="/account/:pageName" component={Account} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
