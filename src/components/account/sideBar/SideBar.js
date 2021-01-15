import React, { useEffect } from "react";
import "./SideBar.css";
import { Button, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import PlaceOrder from "../order/PlaceOrder";
import "./SideBar.css";
import { useHistory } from "react-router-dom";
import Order from "../order/Order";
import ShipperProfileDetails from "../profile/ShipperProfileDetails";
import SellerProfileDetails from "../profile/SellerProfileDetails";
import Requests from "../profile/Requests";

const VerticalSidebar = ({
  animation,
  direction,
  visible,
  userType,
  navigateToOrders,
  navigateToProfile,
  navigateToRequests,
}) => (
  <Sidebar
    className="sidebar-color"
    as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    inverted
    vertical
    visible={visible}
    width="thin"
  >
    <Menu.Item onClick={navigateToProfile}>
      <Icon name="user circle" />
      My Profile
    </Menu.Item>
    {userType === "seller" ? (
      <>
        <Menu.Item onClick={navigateToOrders}>
          <Icon name="dolly" />
          Orders
        </Menu.Item>
      </>
    ) : (
      <>
        <Menu.Item onClick={navigateToRequests}>
          <Icon name="warehouse" />
          Requests
        </Menu.Item>
      </>
    )}
  </Sidebar>
);

function exampleReducer(state, action) {
  switch (action.type) {
    case "CHANGE_ANIMATION":
      return { ...state, animation: action.animation, visible: !state.visible };
    case "CHANGE_DIMMED":
      return { ...state, dimmed: action.dimmed };
    case "CHANGE_DIRECTION":
      return { ...state, direction: action.direction, visible: false };
    default:
      throw new Error();
  }
}

function SidebarOfAccount(props) {
  const logInDetails = props.location.state;

  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: "overlay",
    direction: "left",
    dimmed: true,
    visible: false,
  });

  const history = useHistory();
  const navigateToOrders = () => {
    history.push("/account/orders", logInDetails);
  };
  const navigateToProfile = () => {
    history.push("/account/profile", logInDetails);
  };
  const navigateToRequests = () => {
    history.push("/account/requests", logInDetails);
  };
  const { animation, dimmed, direction, visible } = state;
  const vertical = direction === "bottom" || direction === "top";

  return (
    <div className="sideBar-height">
      <div className="login-header">
        <Button
          color="instagram"
          icon="sidebar"
          onClick={() =>
            dispatch({ type: "CHANGE_ANIMATION", animation: "overlay" })
          }
        ></Button>
        <div className="user-name">{logInDetails.userDetail.name}</div>
        <Button
          color={"instagram"}
          onClick={() => {
            window.localStorage.clear();
            history.push("/login");
          }}
        >
          LogOut{" "}
        </Button>
      </div>

      <Sidebar.Pushable
        as={Segment}
        className="sellerDetailsBody"
        style={{ marginTop: "0" }}
      >
        {/* {vertical && (
          <HorizontalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
          />
        )} */}
        {!vertical && (
          <VerticalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
            userType={logInDetails.userDetail.userType}
            navigateToOrders={navigateToOrders}
            navigateToProfile={navigateToProfile}
            navigateToRequests={navigateToRequests}
          />
        )}
        <Sidebar.Pusher dimmed={dimmed && visible}>
          <Segment basic stacked>
            {props.match.params.pageName === "orders" ? (
              <Order logInDetails={logInDetails} />
            ) : props.match.params.pageName === "placeOrder" ? (
              <PlaceOrder logInDetails={logInDetails} />
            ) : props.match.params.pageName === "profile" ? (
              logInDetails.userDetail.userType === "seller" ? (
                <SellerProfileDetails logInDetails={logInDetails.userDetail} />
              ) : (
                <ShipperProfileDetails logInDetails={logInDetails} />
              )
            ) : props.match.params.pageName === "requests" ? (
              <Requests logInDetails={logInDetails} />
            ) : null}
          </Segment>
        </Sidebar.Pusher>
        {/* <SellerProfileDetails logInDetails={logInDetails} /> */}
      </Sidebar.Pushable>
    </div>
  );
}

export default SidebarOfAccount;
