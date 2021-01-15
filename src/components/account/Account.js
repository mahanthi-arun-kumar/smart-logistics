import React from "react";
import Order from "./order/Order";
import PlaceOrder from "./order/PlaceOrder";
import SellerProfileDetails from "./profile/SellerProfileDetails";
import ShipperProfileDetails from "./profile/ShipperProfileDetails";
import Requests from "./profile/Requests";
import Requests1 from "./profile/Requests1";

function Account(props) {
  const logInDetails = props.location.state;

  return (
    <div>
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
        // <Requests logInDetails={logInDetails} />
        <Requests1 logInDetails={logInDetails} />
      ) : null}
    </div>
  );
}

export default Account;
