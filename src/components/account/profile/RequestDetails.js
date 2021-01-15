import React from "react";
import { Button } from "semantic-ui-react";

function RequestDetails({ cardData, updateOrderStatus }) {
  return (
    <div class="row table-row display-mobile-disabled">
      <div class="col-2 table-row-data-1">
        <div style={{ color: "#1247D1" }}>{cardData.receiverName}</div>
        <div>{cardData.receiverContact}</div>
      </div>
      <div class="col-3 table-row-data">{cardData.pickupAddress}</div>
      <div class="col-3 table-row-data">{cardData.dropAddress}</div>
      <div class="col-1 table-row-data table-row-data-pay">
        {cardData.packageWeight}
      </div>
      <div class="col-1 table-row-data">
        {cardData.orderLength}*{cardData.orderWidth}*{cardData.orderHeight}
      </div>
      <div class="col-1 table-row-data">{cardData.orderCost}</div>

      <div class="col-1 table-row-data table-row-data-buttons">
        {cardData.orderStatus === "open" ? (
          <Button
            color="instagram"
            className="accept"
            onClick={() => {
              updateOrderStatus(cardData.orderId, { orderStatus: "accepted" });
            }}
          >
            {" "}
            Accept
          </Button>
        ) : (
          <Button color="instagram" className="accept" disabled>
            {" "}
            Accept
          </Button>
        )}
        {cardData.orderStatus === "open" ? (
          <Button
            color="instagram"
            className="reject"
            onClick={() =>
              updateOrderStatus(cardData.orderId, { orderStatus: "declined" })
            }
          >
            {" "}
            Reject
          </Button>
        ) : (
          <Button color="instagram" className="reject" disabled>
            {" "}
            Reject
          </Button>
        )}
      </div>
    </div>
  );
}

export default RequestDetails;
