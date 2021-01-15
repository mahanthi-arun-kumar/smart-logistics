import React from "react";
import OrderCount from "./OrderCount";
import {} from "./NumberOfOrders.css";

function NumberOfOrders({ allOrdersData }) {
  let data = [...allOrdersData];
  let noOfOrdersPlaced = data.length;
  let noOfOrdersPending = data.filter(
    (item) => item.orderStatus === "open" || item.orderStatus === "accepted"
  ).length;
  let noOfOrdersDelivered = data.filter(
    (item) => item.orderStatus === "delivered"
  ).length;
  let noOfOrdersDeclined = data.filter(
    (item) => item.orderStatus === "declined"
  ).length;
  let noOfOrdersInProgress = data.filter(
    (item) => item.orderStatus === "inProgress"
  ).length;
  return (
    <div className="number-of-orders">
      <OrderCount count={noOfOrdersPlaced} desc="Orders Placed" />
      <OrderCount count={noOfOrdersPending} desc="Orders Pending" />
      <OrderCount count={noOfOrdersInProgress} desc="Orders In Progress" />
      <OrderCount count={noOfOrdersDelivered} desc="Orders Delivered" />
      <OrderCount count={noOfOrdersDeclined} desc="Orders Rejected" />
    </div>
  );
}

export default NumberOfOrders;
