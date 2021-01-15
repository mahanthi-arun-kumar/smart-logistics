import React from "react";
import Requests1 from "./Requests1";
import RequestsStatus from "./RequestsStatus";
import SortingIcons from "../order/SortingIcons";
import RequestDetails from "./RequestDetails";

function PastRequests({
  ordersData,
  setOrdersData,
  OnRequestTypeChange,
  updateOrderStatus,
}) {
  return (
    <div>
      <RequestsStatus OnRequestTypeChange={OnRequestTypeChange} />
      <div class="row  table-header display-mobile-disabled">
        <div class="col-2 table-header-data">Receiver Name/Contact</div>
        <div class="col-3 table-header-data">Pick Up Address</div>
        <div class="col-3 table-header-data">Drop Address</div>
        <div class="col-1 table-header-data">Weight</div>
        <div class="col-1 table-header-data">Pkg L*W*H</div>
        <div class="col-1 table-header-data">Amount</div>

        <div class="col-1 table-header-data"></div>
      </div>
      <div className="all-orders">
        {ordersData.length !== 0 ? (
          ordersData.map((cardData) => {
            return (
              <RequestDetails
                cardData={cardData}
                updateOrderStatus={updateOrderStatus}
              />
            );
          })
        ) : (
          <div className="no-order-msg">No requests in this section</div>
        )}
      </div>
    </div>
  );
}

export default PastRequests;
