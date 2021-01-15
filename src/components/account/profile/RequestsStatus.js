import React, { useState } from "react";
//import "./OrderStatus.css";
import { Button, Icon } from "semantic-ui-react";

function RequestsStatus({ OnRequestTypeChange }) {
  const [activeStatus, setActiveStatus] = useState(1);
  return (
    <div className="orders">
      <div className="order-stauses">
        <div
          onClick={() => {
            setActiveStatus(1);
            OnRequestTypeChange("open");
          }}
          className={activeStatus === 1 ? "orderActiveStatus" : "orderStatus"}
        >
          New Requests
        </div>
        <div
          onClick={() => {
            setActiveStatus(2);
            OnRequestTypeChange("inProgress");
            //OnOrderTypeChange("open");
          }}
          className={activeStatus === 2 ? "orderActiveStatus" : "orderStatus"}
        >
          Accepted
        </div>
        <div
          onClick={() => {
            setActiveStatus(3);
            OnRequestTypeChange("declined");
            //OnOrderTypeChange("delivered");
          }}
          className={activeStatus === 3 ? "orderActiveStatus" : "orderStatus"}
        >
          Rejected
        </div>
      </div>
    </div>
  );
}

export default RequestsStatus;
