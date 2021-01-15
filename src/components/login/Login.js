import React from "react";
import "./Login.css";
import { Grid, Tab } from "semantic-ui-react";
import UserLogin from "../userLogin/UserLogin";
import Register from "../register/Register";
import { Link } from "react-router-dom";

const panes = [
  {
    menuItem: { key: "login", icon: "users", content: "SignIn" },
    render: () => (
      <Tab.Pane>
        <UserLogin />
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: "sr", icon: "dolly flatbed", content: "SignUp" },
    render: () => (
      <Tab.Pane>
        <Register />
      </Tab.Pane>
    ),
  },
];

function Login() {
  return (
    <div className="login-container">
      <Grid className="login-form">
        <Grid.Row>
          <Grid.Column
            mobile={10}
            tablet={10}
            computer={10}
            verticalAlign="top"
          >
            <Link to="/">
              <div className="home-link">Home</div>
            </Link>
          </Grid.Column>
          <Grid.Column
            mobile={5}
            tablet={5}
            computer={5}
            verticalAlign="middle"
          >
            <Tab panes={panes} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Login;
