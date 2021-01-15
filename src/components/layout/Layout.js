import React from "react";
import { Container } from "semantic-ui-react";
import AppNavBar from "../navBar/AppNavBar";
import "./Layout.css";

function Layout(props) {
  return (
    <div className="main-content-container">
      <AppNavBar logInDetails={props.location.state} />
      <Container style={{ padding: "2.5rem 0rem" }}>{props.children}</Container>
    </div>
  );
}

export default Layout;
