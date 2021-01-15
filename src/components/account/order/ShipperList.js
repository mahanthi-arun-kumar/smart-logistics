import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Dropdown,
  Grid,
  Icon,
  Button,
  Card,
  Label,
  Divider,
} from "semantic-ui-react";
import Supplier from "../../../img/supplier cropped.png";
import "./ShipperList.css";
import WarningModal from "./WarningModal";
import { BASE_URL } from "../../utils/Constants";

function ShipperList(props) {

  const [availableShippers, setAvailableShippers] = useState(
    props.placeOrderResponse.data.shipperList
  );

  const [orderList, setOrderList] = useState(
    props.placeOrderResponse.data.orderList
  );

  const [shipperId, setShipperId] = useState();

  async function updateOrderList(shId) {
    let data = orderList.map((element, index) => {
      return { ...element, ...{ shipperId: shId } };
    });

    await axios
      .post(`${BASE_URL}/order-place`, data)
      .then((response) => setOrderResponse(response))
      .catch((error) => setOrderResponse(error.response));
  }

  const [serviceOptions, setServiceOptions] = useState();
  const [selectedService, setSelectedService] = useState("Default service");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/defined-services/get-all`)
      .then((res) => {
        const options = [];
        res.data.forEach((element) => {
          options.push({
            key: element.serviceId,
            value: element.serviceName,
            text: element.serviceName,
          });
        });
        setServiceOptions(options);
      })
      .catch((err) => console.log(err));
  }, []);

  function renderSelectedShippers() {
    let shipperForSelectedService = availableShippers.filter(
      (shipper) =>
        shipper.serviceList.filter((ser) => ser.serviceName === selectedService)
          .length != 0
    );

    if (shipperForSelectedService.length !== 0) {
      return shipperForSelectedService.map((item) => {
        return (
          <Grid columns={4}>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={11}>
              <Card
                centered
                fluid
                style={{
                  boxShadow:
                    "0 0 0 1px #d4d4d5, 0 2px 0 0 #2185d0, 0 1px 10px 3px #d4d4d5",
                  borderRadius: "1rem",
                }}
              >
                <Grid stackable columns={2}>
                  <Grid.Column width={4}>
                    <img className="supplier-img" src={Supplier}></img>
                  </Grid.Column>
                  <Grid.Column
                    style={{ marginTop: "0.6rem", paddingLeft: "0" }}
                    width={12}
                  >
                    <Card.Content>
                      <Card.Header>
                        <h1 style={{ textTransform: "capitalize" }}>
                          {item.userDetail.name}{" "}
                          <h4>Mob: {item.userDetail.contact}</h4>
                        </h1>
                      </Card.Header>
                      {item.serviceList
                        .filter((ser) => ser.serviceName === selectedService)
                        .map((service) => {
                          return (
                            <Card.Description>
                              <Grid stackable padded>
                                <Grid.Row columns={3} style={{ padding: "0" }}>
                                  <Grid.Column
                                    className="order-details-container"
                                    width={4}
                                  >
                                    <div className="heading-label">
                                      Base Cost:
                                    </div>
                                    <Label
                                      basic
                                      color="black"
                                      className="value-label"
                                    >
                                      {service.baseOrderCost} Rs
                                    </Label>
                                  </Grid.Column>
                                  <Grid.Column className="order-details-container">
                                    <div className="heading-label">
                                      Weight Cost:
                                    </div>
                                    <Label
                                      basic
                                      color="black"
                                      className="value-label"
                                    >
                                      {service.costPerKg} Rs/kg
                                    </Label>
                                  </Grid.Column>
                                  <Grid.Column
                                    className="order-details-container"
                                    width={6}
                                  >
                                    <div className="heading-label">
                                      Distance Cost:
                                    </div>
                                    <Label
                                      basic
                                      color="black"
                                      className="value-label"
                                    >
                                      {service.costPerKm} Rs/km
                                    </Label>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={3} style={{ padding: "0" }}>
                                  <Grid.Column
                                    className="order-details-container"
                                    width={5}
                                  >
                                    <div className="heading-label">
                                      Height Cost:
                                    </div>
                                    <Label
                                      basic
                                      color="black"
                                      className="value-label"
                                    >
                                      {service.costPerHeight} Rs/cm
                                    </Label>
                                  </Grid.Column>
                                  <Grid.Column
                                    className="order-details-container"
                                    width={5}
                                  >
                                    <div className="heading-label">
                                      Length Cost:
                                    </div>
                                    <Label
                                      basic
                                      color="black"
                                      className="value-label"
                                    >
                                      {service.costPerLength} Rs/cm
                                    </Label>
                                  </Grid.Column>
                                  <Grid.Column
                                    className="order-details-container"
                                    width={6}
                                  >
                                    <div className="heading-label">
                                      Width Cost:
                                    </div>
                                    <Label
                                      basic
                                      color="black"
                                      className="value-label"
                                    >
                                      {service.costPerWidth} Rs/cm
                                    </Label>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Card.Description>
                          );
                        })}

                      <Divider style={{ marginBottom: "0" }} />
                      <Card.Meta style={{ display: "flex" }}>
                        <Label size="large" style={{ background: "none" }}>
                          <Icon name="info circle" /> Cost whichever is
                          displayed is applicable per package
                        </Label>
                      </Card.Meta>
                    </Card.Content>
                  </Grid.Column>
                </Grid>
              </Card>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Button
                className="select-btn"
                icon="add"
                size="big"
                inverted
                onClick={() => {
                  setShipperId(item.shipperId);
                  setWarning(true);
                }}
              >
                Select
              </Button>
            </Grid.Column>
          </Grid>
        );
      });
    } else {
      return (
        <h1 style={{ marginLeft: "7%", color: "#53769c" }}>
          No Shippers available for selected service
        </h1>
      );
    }
  }

  const [orderResponse, setOrderResponse] = useState();
  const history = useHistory();

  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (orderResponse && orderResponse.status === 200) {
      history.push("/account/orders", orderList[0].seller);
    }
  }, [orderResponse]);

  return (
    <div>
      <WarningModal
        open={warning}
        setOpen={setWarning}
        updateOrderList={updateOrderList}
        shId={shipperId}
      />
      <div className="service-dd-container">
        <Label className="service-label">Select Service</Label>
        <Dropdown
          className="service-dd"
          selection
          fluid
          placeholder="Select Service"
          options={serviceOptions}
          value={selectedService}
          onChange={(e, data) => {
            setSelectedService(data.value);
          }}
        />
      </div>
      {renderSelectedShippers()}
    </div>
  );
}

export default ShipperList;
