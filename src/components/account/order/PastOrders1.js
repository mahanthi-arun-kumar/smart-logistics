import React from "react";
import "./PastOrders.css";
import OrderDetails, { getDate } from "./OrderDetails";
import SortingIcons from "./SortingIcons";
import OrderStatus from "./OrderStatus";
import { getOrderStatus, getDeliveryStatus } from "./OrderDetails";
import PaymentDetails from "../profile/PaymentDetails";

function PastOrders1({
  data: pastOrdersData,
  OnOrderTypeChange,
  OnSortingOrderCost,
  navigateToPlaceOrder,
  allOrdersData,
  setAllOrdersData,
}) {
  return (
    <div>
      <OrderStatus
        OnOrderTypeChange={OnOrderTypeChange}
        navigateToPlaceOrder={navigateToPlaceOrder}
      />
      <div class="row  table-header display-mobile-disabled">
        <div class="col-2 table-header-data">Tracking Id/Booked On</div>
        <div class="col-3 table-header-data">Pick Up Address</div>
        <div class="col-3 table-header-data">Drop Address</div>
        <div class="col-1 table-header-data">
          Amount <SortingIcons OnSortingOrderCost={OnSortingOrderCost} />
        </div>
        <div class="col-1 table-header-data">Order Status</div>
        <div class="col-1 table-header-data">Delivery Status</div>
        <div class="col-1 table-header-data"></div>
      </div>
      <div className="all-orders">
        {pastOrdersData.length !== 0 ? (
          pastOrdersData.map((cardData) => {
            return (
              <OrderDetails
                pastOrdersData={cardData}
                allOrdersData={allOrdersData}
                setAllOrdersData={setAllOrdersData}
              />
            );
          })
        ) : (
          <div className="no-order-msg">No Orders in this section</div>
        )}
      </div>
      {pastOrdersData.length !== 0
        ? pastOrdersData.map((cardData) => {
            return (
              <div class="table-data-mobile display-mobile ">
                <div className="row row-data">
                  <div className="col table-header-data-mobile d-flex align-items-center">
                    Tracking Id
                  </div>
                  <div className="col table-body-data-mobile table-body-data-tracking">
                    {cardData.trackingId}
                  </div>
                </div>
                <div className="row row-data">
                  <div className="col table-header-data-mobile d-flex align-items-center">
                    Booked On
                  </div>
                  <div className="col table-body-data-mobile">
                    {getDate(cardData.orderBookingDate)}
                  </div>
                </div>
                <div className="row row-data">
                  <div className="col table-header-data-mobile d-flex align-items-center">
                    Pick Up Address
                  </div>
                  <div className="col table-body-data-mobile">
                    {cardData.pickupAddress}
                  </div>
                </div>
                <div className="row row-data">
                  <div className="col table-header-data-mobile d-flex align-items-center">
                    Drop Address
                  </div>
                  <div className="col table-body-data-mobile">
                    {cardData.dropAddress}
                  </div>
                </div>
                <div className="row row-data">
                  <div className="col table-header-data-mobile d-flex align-items-center">
                    Amount
                  </div>
                  <div className="col table-body-data-mobile">
                    {cardData.orderCost}
                  </div>
                </div>
                <div className="row row-data">
                  <div className="col table-header-data-mobile d-flex align-items-center">
                    Order Status
                  </div>
                  <div className="col table-body-data-mobile">
                    {getOrderStatus(cardData.orderStatus)}
                  </div>
                </div>
                <div className="row row-data">
                  <div className="col table-header-data-mobile d-flex align-items-center">
                    Delivery Status
                  </div>
                  <div className="col table-body-data-mobile">
                    {getDeliveryStatus(cardData.orderStatus)}
                  </div>
                </div>
                <div className="row row-data">
                  <div className="col table-header-data-mobile"></div>
                  <div className="col table-body-data-mobile">details</div>
                </div>
                <div className="row row-data">
                  <div className="col table-header-data-mobile"></div>
                  <div className="col table-body-data-mobile">
                    <PaymentDetails allOrdersData={allOrdersData} orderId={cardData.orderId}/>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default PastOrders1;
