import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Button, Card, Label } from "semantic-ui-react";
import "./Requests.css";
import { dummyData } from "../sideBar/constants";
import { BASE_URL } from "../../utils/Constants";

const OrderCard = ({ item }) => {
  return (
    <Grid stackable>
      <Grid.Row columns={4} className="card-style">
        <Grid.Column>
          <div className="heading-label">Reciever's Name:</div>
          <Label basic color="black" className="value-label">
            {item.receiverName}
          </Label>
        </Grid.Column>
        <Grid.Column>
          <div className="heading-label">Reciever's Contact:</div>
          <Label basic color="black" className="value-label">
            {item.receiverContact}
          </Label>
        </Grid.Column>
        <Grid.Column>
          <div className="heading-label">Pickup Area:</div>
          <Label basic color="black" className="value-label">
            {item.pickupArea.areaName}
          </Label>
        </Grid.Column>
        <Grid.Column>
          <div className="heading-label">Drop Area:</div>
          <Label basic color="black" className="value-label">
            {item.dropArea.areaName}
          </Label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2} className="card-style remove-padding-top">
        <Grid.Column>
          <div className="heading-label">Pickup Address:</div>
          <Label basic color="black" className="value-label">
            {item.pickupAddress}
          </Label>
        </Grid.Column>
        <Grid.Column>
          <div className="heading-label">Drop Address:</div>
          <Label basic color="black" className="value-label">
            {item.dropAddress}
          </Label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={4} className="remove-padding-top card-style-1">
        <Grid.Column className="order-details-container">
          <div className="heading-label">Package Weight:</div>
          <Label basic color="black" className="value-label">
            {item.packageWeight}
          </Label>
        </Grid.Column>
        <Grid.Column className="order-details-container">
          <div className="heading-label">Package Height:</div>
          <Label basic color="black" className="value-label">
            {item.orderHeight}
          </Label>
        </Grid.Column>
        <Grid.Column className="order-details-container">
          <div className="heading-label">Package Length:</div>
          <Label basic color="black" className="value-label">
            {item.orderLength}
          </Label>
        </Grid.Column>
        <Grid.Column className="order-details-container">
          <div className="heading-label">Package Width:</div>
          <Label basic color="black" className="value-label">
            {item.orderWidth}
          </Label>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
function Requests(props) {
  const logInDeatils = props.logInDetails;
  const userId = logInDeatils.userDetail.userId;
  const [ordersData, setOrdersData] = useState([]);
  useEffect(async () => {
    await axios
      .get(`${BASE_URL}/order-transaction/${userId}`)
      .then((res) => {
        setOrdersData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [open, setOpen] = useState(true);
  const updateOrderStatus = async (item, orderStatus) => {
    let body = { ...item, ...orderStatus };

    await axios
      .patch(`${BASE_URL}/order-update/${item.orderId}`, orderStatus)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let shipperOrdersData = [...ordersData];
  return (
    <div>
      {shipperOrdersData.length !== 0 ? (
        shipperOrdersData.map((item, index) => {
          return (
            <Grid columns={4}>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={10}>
                <Card
                  centered
                  fluid
                  color="blue"
                  style={{
                    boxShadow:
                      "0 0 0 1px #d4d4d5, 0 2px 0 0 #2185d0, 0 1px 10px 0 #d4d4d5",
                    borderRadius: "1rem",
                  }}
                >
                  <Card.Content>
                    <Card.Description style={{ display: "flex" }}>
                      <OrderCard item={item} />
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column verticalAlign="middle">
                <Button
                  className="fun-btn select"
                  icon="check"
                  color={"green"}
                  size="huge"
                  onClick={() => {
                    updateOrderStatus(item, { orderStatus: "accepted" });
                  }}
                />

                <Button
                  className="fun-btn"
                  icon="close"
                  size="huge"
                  onClick={() => {
                    updateOrderStatus(item, { orderStatus: "declined" });
                  }}
                />
              </Grid.Column>
            </Grid>
          );
        })
      ) : (
        <h1 style={{ color: "#49769c" }}>No Requests in this section</h1>
      )}
    </div>
  );
}

export default Requests;
