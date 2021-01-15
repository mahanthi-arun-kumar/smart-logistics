import React, { useState, useEffect } from "react";
import axios from "axios";
import { Divider } from "semantic-ui-react";
import NumberOfRequests from "./NumberOfRequests";
import { BASE_URL } from "../../utils/Constants";
import PastRequests from "./PastRequests";

function Requests1(props) {
  const logInDeatils = props.logInDetails;
  const userId = logInDeatils.userDetail.userId;
  const [ordersData, setOrdersData] = useState([]);
  const [requestsData, setRequestsdata] = useState([]);
  const allRequestsLength = requestsData.length;
  const OnRequestTypeChange = (type) => {
    let data = [...requestsData];
    if (type === "inProgress") {
      let tableData = data.filter(
        (item) =>
          item.orderStatus === "inProgress" || item.orderStatus === "accepted"
      );
      setOrdersData(tableData);
    } else {
      let tableData = data.filter((item) => item.orderStatus === type);
      setOrdersData(tableData);
    }
  };
  useEffect(async () => {
    await axios
      .get(`${BASE_URL}/order-transaction/${userId}`)
      .then((res) => {
        setRequestsdata(res.data);
        setOrdersData(res.data.filter((item) => item.orderStatus === "open"));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const updateOrderStatus = async (id, orderStatus) => {
    await axios
      .patch(`${BASE_URL}/order-update/${id}`, orderStatus)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    let allRequests = [...requestsData];

    let updatedOrders = [];
    if (id !== undefined) {
      let requests = allRequests.map((order) => {
        if (order.orderId === id) {
          order.orderStatus = orderStatus;
          updatedOrders.push(order);
        } else {
          updatedOrders.push(order);
        }
      });
      if (updatedOrders.length !== 0) {
        setRequestsdata(updatedOrders);
      }
    }
  };
  console.log(ordersData);
  return (
    <div>
      <NumberOfRequests requestsData={requestsData} />
      <Divider />
      <PastRequests
        ordersData={ordersData}
        setOrdersData={setOrdersData}
        OnRequestTypeChange={OnRequestTypeChange}
        updateOrderStatus={updateOrderStatus}
      />
    </div>
  );
}

export default Requests1;
