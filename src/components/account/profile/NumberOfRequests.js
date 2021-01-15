import React from "react";
import RequestsCount from "./RequestsCount";
import {} from "./NumberOfRequests.css";

function NumberOfRequests({ requestsData }) {
  let data = [...requestsData];
  let noOfRequestsPlaced = data.length;
  let noOfOrdersPending = data.filter(
    (item) =>
      item.orderStatus === "accepted" || item.orderStatus === "inProgress"
  ).length;
  let noOfOrdersDelivered = data.filter(
    (item) => item.orderStatus === "delivered"
  ).length;
  let noOfOrdersDeclined = data.filter(
    (item) => item.orderStatus === "declined"
  ).length;
  let openRequests = data.filter((item) => item.orderStatus === "open").length;
  return (
    <div className="number-of-orders">
      <RequestsCount count={noOfRequestsPlaced} desc="Total Requests" />
      <RequestsCount count={noOfOrdersPending} desc="Requests Accepted" />
      <RequestsCount count={openRequests} desc="Open Requests" />
      <RequestsCount count={noOfOrdersDelivered} desc="Delivery Completed" />
      <RequestsCount count={noOfOrdersDeclined} desc="Requests Rejected" />
    </div>
  );
}

export default NumberOfRequests;
