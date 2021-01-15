import React, { useState, useEffect } from "react";
import "./UserLogin.css";
import { Form, Label } from "semantic-ui-react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";

function UserLogin() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState();

  const [load, setLoad] = useState(false);

  const headers = {
    "Content-Type": "application/json",
  };

  function loginFun() {
    setLoad(true);
    axios
      .post(
        `${BASE_URL}/login`,
        {
          email: login.email,
          password: login.password,
        },
        { headers: headers }
      )
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setResponse(error.response);
      })
      .then(() => setLoad(false));
  }

  const history = useHistory();

  useEffect(() => {
    if (response && response.status === 200) {
      window.localStorage.setItem("loggedIn", "true");
      window.localStorage.setItem("userType", response.data.userType);
      if (response.data.userType === "seller") {
        window.localStorage.setItem("redirectPage", "/account/orders");
        window.localStorage.setItem(
          "seller",
          JSON.stringify(response.data.seller)
        );
        history.push("/account/orders", response.data.seller);
      } else if (response.data.userType === "shipper") {
        window.localStorage.setItem("redirectPage", "/account/requests");
        window.localStorage.setItem(
          "shipper",
          JSON.stringify(response.data.shipper)
        );
        history.push("/account/requests", response.data.shipper);
      }
    }
  }, [response]);

  function updateLogin(field, value) {
    setLogin(() => {
      let loginClone = { ...login };
      loginClone[field] = value;
      return loginClone;
    });
  }
  let loggedIn = localStorage.getItem("loggedIn");
  let pathName = window.location.pathname;
  let redirect = false;
  let data;
  if (
    (loggedIn === "true" && pathName === "/") ||
    (loggedIn === "true" && pathName === "/login")
  ) {
    const userType = window.localStorage.getItem("userType");

    if (userType === "seller") {
      data = JSON.parse(window.localStorage.getItem("seller"));
      pathName = "/account/orders";
    } else {
      data = JSON.parse(window.localStorage.getItem("shipper"));
      pathName = "/account/requests";
    }
    redirect = true;
  }
  return (
    <div>
      {redirect ? (
        <Redirect
          to={{
            pathname: pathName,
            state: data,
          }}
        />
      ) : (
        <Form>
          <Form.Input
            fluid
            label="Email"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => updateLogin("email", e.target.value)}
          />
          <Form.Input
            fluid
            label="Password"
            placeholder="Password"
            type="password"
            required
            onChange={(e) => updateLogin("password", e.target.value)}
          />
          {/* <Form.Group inline>
                    <label>Type</label>
                    <Form.Radio
                        label='Seller'
                        value='seller'
                        checked={true}
                    // onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Shipper'
                        value='shipper'
                    // onChange={this.handleChange}
                    />
                </Form.Group> */}
          <Form.Button onClick={() => loginFun()} loading={load}>
            Sign In
          </Form.Button>
          {response && response.status !== 200 ? (
            <>
              <Label color="red">{response.data.message}</Label>
            </>
          ) : null}
        </Form>
      )}
    </div>
  );
}

export default UserLogin;
