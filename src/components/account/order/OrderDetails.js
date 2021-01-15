import React, { useState } from "react";
import PaymentDetails from "../profile/PaymentDetails";
import OrderExtraDetails from "./OrderExtraDetails";
import Tracking from "./Tracking";

export const getOrderStatus = (data) => {
  let status = data.orderStatus;
  let paymentStatus = data.paymentStatus;
  if (status === "inProgress" || status === "delivered") {
    return "accepted";
  } else if (status === "accepted") {
    return "accepted";
  } else if (status === "declined") {
    return "rejected";
  } else {
    return "open";
  }
};

const showPayment = (data) => {
  let status = data.orderStatus;
  let paymentStatus = data.paymentStatus;
  if (status === "accepted") {
    return true;
  } else {
    return false;
  }
};
export const getDeliveryStatus = (data) => {
  let status = data.orderStatus;
  let paymentStatus = data.paymentStatus;
  if (status === "inProgress") {
    return "InProgress";
  } else if (status === "delivered") {
    return "delivered";
  } else {
    return "-";
  }
};

export const getDate = (dateObject) => {
  var timestamp = new Date(dateObject);
  var todate = new Date(timestamp).getDate();
  var tomonth = new Date(timestamp).getMonth() + 1;
  var toyear = new Date(timestamp).getFullYear();
  var original_date = tomonth + "/" + todate + "/" + toyear;
  return original_date;
};

const OrderDetails = ({ pastOrdersData, allOrdersData, setAllOrdersData }) => {
  var timestamp = new Date(pastOrdersData.orderBookingDate);
  var todate = new Date(timestamp).getDate();
  var tomonth = new Date(timestamp).getMonth() + 1;
  var toyear = new Date(timestamp).getFullYear();
  var original_date = tomonth + "/" + todate + "/" + toyear;
  const [open, setOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);

  return (
    <>
      <Tracking
        open={trackingOpen}
        setOpen={setTrackingOpen}
        trackingId={pastOrdersData.trackingId}
      />
      <OrderExtraDetails
        open={open}
        setOpen={setOpen}
        pastOrdersData={pastOrdersData}
      />
      <div class="row table-row display-mobile-disabled">
        <div class="col-2 table-row-data-1">
          <div
            style={{ color: "#1247D1", cursor: "pointer" }}
            onClick={() => setTrackingOpen(true)}
          >
            {pastOrdersData.trackingId}
          </div>
          <div>Date:{getDate(pastOrdersData.orderBookingDate)}</div>
        </div>
        <div class="col-3 table-row-data">{pastOrdersData.pickupAddress}</div>
        <div class="col-3 table-row-data">{pastOrdersData.dropAddress}</div>
        <div class="col-1 table-row-data table-row-data-pay">
          <div>{pastOrdersData.orderCost}</div>
          {showPayment(pastOrdersData) && (
            <PaymentDetails
              orderId={pastOrdersData.orderId}
              allOrdersData={allOrdersData}
              setAllOrdersData={setAllOrdersData}
              orderCost={pastOrdersData.orderCost}
            />
          )}
        </div>
        <div class="col-1 table-row-data">{getOrderStatus(pastOrdersData)}</div>
        <div class="col-1 table-row-data">
          {" "}
          {getDeliveryStatus(pastOrdersData)}
        </div>

        <div
          class="col-1 table-row-data table-row-data-details"
          onClick={() => {
            setOpen(true);
          }}
        >
          details
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
