import react, { useState } from "react";
import {
  Grid,
  GridColumn,
  Dropdown,
  List,
  Segment,
  Container,
  Image,
} from "semantic-ui-react";
import "./AppNavBar.css";
import Logo from "../../img/SL-Logo-Vertical.png";
import { useHistory } from "react-router-dom";

function AppNavBar(props) {
  // const [listVisible, setListVisible] = useState(false);
  const logInDetails = props.logInDetails;
  const history = useHistory();
  const userType = logInDetails.userDetail.userType;
  const name = logInDetails.userDetail.name;

  const navigateToOrders = () => {
    history.push("/account/orders", logInDetails);
  };
  const navigateToProfile = () => {
    history.push("/account/profile", logInDetails);
  };
  const navigateToRequests = () => {
    history.push("/account/requests", logInDetails);
  };

  return (
    <div>
      <Segment style={{ boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)" }}>
        <Container>
          <Grid columns={2}>
            <GridColumn style={{ padding: "0" }}>
              <Image src={Logo} style={{ height: "5rem" }}></Image>
            </GridColumn>
            <GridColumn textAlign="right" verticalAlign="middle">
              <Dropdown className="header-submenu" item text={name} floating>
                <Dropdown.Menu>
                  <Dropdown.Item
                    className="header-item"
                    icon="user circle"
                    text="My Profile"
                    onClick={navigateToProfile}
                  />
                  <Dropdown.Item
                    className="header-item"
                    icon={userType === "seller" ? "box" : "warehouse"}
                    text={userType === "seller" ? "Orders" : "Requests"}
                    onClick={
                      userType === "seller"
                        ? navigateToOrders
                        : navigateToRequests
                    }
                  />
                  <Dropdown.Item
                    className="header-item"
                    icon="power off"
                    text="Logout"
                    onClick={() => {
                      window.localStorage.clear();
                      history.push("/login");
                    }}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </GridColumn>
          </Grid>
        </Container>
      </Segment>
    </div>
  );
}

export default AppNavBar;
