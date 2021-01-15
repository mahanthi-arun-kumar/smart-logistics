import React, { useState } from "react";
import "./PaymentDetails.css";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants";

function PaymentDetails({
  orderId,
  allOrdersData,
  setAllOrdersData,
  orderCost,
}) {
  //need to add order cost

  const updateOrderStatus = async (id, orderStatus) => {
    //  let body = { ...item, ...orderStatus };
    await axios
      .patch(`${BASE_URL}/order-update/${id}`, orderStatus)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [product, setProduct] = useState({
    name: "React from FB",
    price: orderCost,
    productBy: "facebook",
  });

  const makePayment = (token) => {
    const body = {
      orderId: orderId,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(`${BASE_URL}/payment-charge`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    let allOrders = [...allOrdersData];
    let updatedOrders = [];
    if (orderId !== undefined) {
      let orders = allOrders.map((order) => {
        if (order.orderId === orderId) {
          order.orderStatus = "inProgress";
          updatedOrders.push(order);
        } else {
          updatedOrders.push(order);
        }
      });
      if (updatedOrders.lnegth !== 0) {
        setAllOrdersData(updatedOrders);
        updateOrderStatus(orderId, { orderStatus: "inProgress" });
      }
    }
  };

  return (
    <div className="">
      <StripeCheckout
        stripeKey="pk_test_51I8deFIzbRMnP4CeM18FPJqktPzUtYwgRxDmXRBXjSjgRncHkIQw6rbmcGFu8tnGOoENY26xbOOK9E2xfrx1XVzI00E00hpZAl"
        token={makePayment}
        name="Place Order"
        amount={product.price * 100}
        shippingAddress
        billingAddress
      >
        <Button className="pay" color="blue">
          Pay
        </Button>
      </StripeCheckout>
    </div>
  );
}

export default PaymentDetails;
