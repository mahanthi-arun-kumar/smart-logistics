import React, { useState } from "react";
import "./OrderStatus.css";
import { Button, Icon } from "semantic-ui-react";

function OrderStatus({ OnOrderTypeChange, navigateToPlaceOrder }) {
  const [activeStatus, setActiveStatus] = useState(1);
  return (
    <div className="orders">
      <div className="order-stauses">
        <div
          onClick={() => {
            setActiveStatus(1);
            OnOrderTypeChange("inProgress");
          }}
          className={activeStatus === 1 ? "orderActiveStatus" : "orderStatus"}
        >
          Active Orders
        </div>
        <div
          onClick={() => {
            setActiveStatus(2);
            OnOrderTypeChange("open");
          }}
          className={activeStatus === 2 ? "orderActiveStatus" : "orderStatus"}
        >
          Pending Orders
        </div>
        <div
          onClick={() => {
            setActiveStatus(3);
            OnOrderTypeChange("delivered");
          }}
          className={activeStatus === 3 ? "orderActiveStatus" : "orderStatus"}
        >
          Past Orders
        </div>
        <div
          onClick={() => {
            setActiveStatus(4);
            OnOrderTypeChange("declined");
          }}
          className={activeStatus === 4 ? "orderActiveStatus" : "orderStatus"}
        >
          rejected Orders
        </div>
      </div>
      <Button
        className="placeOrder"
        animated
        onClick={navigateToPlaceOrder}
        color="instagram"
        floated="right"
      >
        <Button.Content visible>Place Order</Button.Content>
        <Button.Content hidden>
          <Icon name="dolly flatbed" />
        </Button.Content>
      </Button>
    </div>
  );
}

export default OrderStatus;
