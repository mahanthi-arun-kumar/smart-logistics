import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  Grid,
  Modal,
  Icon,
  Button,
  Card,
  Label,
} from "semantic-ui-react";
import { IsMobileNumber } from "../../utils/Utils";
import "./PlaceOrder.css";
import ShipperList from "./ShipperList";
import { BASE_URL } from "../../utils/Constants";

let areas = [];

const OrderModal = ({
  open,
  setOpen,
  updateOrderDetails,
  handleSubmit,
  orderDetails,
  edit,
  orders,
  areaResponse,
  validContact,
}) => (
  <Modal
    open={open}
    closeOnDimmerClick={false}
    size="tiny"
    as={Form}
    onSubmit={handleSubmit}
  >
    <Modal.Header>Please enter the Order Details</Modal.Header>
    <Modal.Content scrolling>
      <Form.Group style={{ justifyContent: "space-between" }}>
        <Form.Input
          label="Receiver Name"
          placeholder="Receiver Name"
          width={7}
          required
          fluid
          value={orderDetails.reciever_name}
          onChange={(e) => updateOrderDetails("reciever_name", e.target.value)}
        />
        <Form.Input
          label="Receiver Contact"
          placeholder="Reciever Contact"
          width={7}
          type="number"
          required
          fluid
          value={orderDetails.reciever_contact}
          onChange={(e) =>
            updateOrderDetails("reciever_contact", e.target.value)
          }
          error={
            !validContact ? (
              <Label pointing color="red">
                Please enter valid contact number
              </Label>
            ) : null
          }
        ></Form.Input>
      </Form.Group>
      <Form.Group style={{ justifyContent: "space-between" }}>
        <Form.Dropdown
          label="Pickup Area"
          placeholder="Select Area"
          required
          fluid
          search
          selection
          options={areas}
          width={7}
          value={orderDetails.pickup_area.areaId}
          onChange={(e, data) =>
            updateOrderDetails(
              "pickup_area",
              areaResponse.filter((elem) => elem.areaId === data.value)[0]
            )
          }
        />
        <Form.Dropdown
          label="Drop Area"
          placeholder="Select Area"
          required
          fluid
          search
          selection
          options={areas}
          width={7}
          value={orderDetails.drop_area.areaId}
          onChange={(e, data) => {
            updateOrderDetails(
              "drop_area",
              areaResponse.filter((elem) => elem.areaId === data.value)[0]
            );
          }}
        />
      </Form.Group>
      <Form.Group style={{ justifyContent: "space-between" }}>
        <Form.TextArea
          label="Pickup Address"
          placeholder="Pickup Address"
          width={7}
          required
          fluid="true"
          value={orderDetails.pickup_address}
          onChange={(e) => updateOrderDetails("pickup_address", e.target.value)}
        />
        <Form.TextArea
          label="Drop Address"
          placeholder="Drop Address"
          width={7}
          required
          fluid="true"
          value={orderDetails.drop_address}
          onChange={(e) => updateOrderDetails("drop_address", e.target.value)}
        />
      </Form.Group>
      <Form.Group style={{ justifyContent: "space-between" }}>
        <Form.Input
          label="Package Weight"
          placeholder="in Kg"
          width={7}
          required
          fluid
          value={orderDetails.package_weight}
          type="number"
          onChange={(e) => updateOrderDetails("package_weight", e.target.value)}
        />
        <Form.Input
          label="Package Height"
          placeholder="in cm"
          width={7}
          required
          fluid
          value={orderDetails.package_height}
          type="number"
          onChange={(e) => updateOrderDetails("package_height", e.target.value)}
        />
      </Form.Group>
      <Form.Group style={{ justifyContent: "space-between" }}>
        <Form.Input
          label="Package length"
          placeholder="in cm"
          width={7}
          required
          fluid
          value={orderDetails.package_length}
          type="number"
          onChange={(e) => updateOrderDetails("package_length", e.target.value)}
        />
        <Form.Input
          label="Package Width"
          placeholder="in cm"
          width={7}
          required
          fluid
          value={orderDetails.package_width}
          type="number"
          onChange={(e) => updateOrderDetails("package_width", e.target.value)}
        />
      </Form.Group>
    </Modal.Content>
    <Modal.Actions>
      {edit && edit.state ? (
        <>
          <Button
            color="red"
            onClick={() => {
              setOpen(false);
            }}
          >
            <Icon name="remove" /> Cancel
          </Button>
          <Button primary type="Submit">
            <Icon name="save" /> Save
          </Button>
        </>
      ) : (
        <>
          {orders.length > 0 ? (
            <Button
              color="red"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Icon name="remove" /> Cancel
            </Button>
          ) : null}
          <Button primary type="Submit">
            <Icon name="add" /> Add Package
          </Button>
        </>
      )}
    </Modal.Actions>
  </Modal>
);

const OrderCard = ({ item }) => (
  <Grid stackable>
    <Grid.Row columns={4} className="card-style">
      <Grid.Column>
        <div className="heading-label">Reciever's Name:</div>
        <Label basic color="black" className="value-label">
          {item.reciever_name}
        </Label>
      </Grid.Column>
      <Grid.Column>
        <div className="heading-label">Reciever's Contact:</div>
        <Label basic color="black" className="value-label">
          {item.reciever_contact}
        </Label>
      </Grid.Column>
      <Grid.Column>
        <div className="heading-label">Pickup Area:</div>
        <Label basic color="black" className="value-label">
          {item.pickup_area.areaName}
        </Label>
      </Grid.Column>
      <Grid.Column>
        <div className="heading-label">Drop Area:</div>
        <Label basic color="black" className="value-label">
          {item.drop_area.areaName}
        </Label>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns={2} className="card-style remove-padding-top">
      <Grid.Column>
        <div className="heading-label">Pickup Address:</div>
        <Label basic color="black" className="value-label">
          {item.pickup_address}
        </Label>
      </Grid.Column>
      <Grid.Column>
        <div className="heading-label">Drop Address:</div>
        <Label basic color="black" className="value-label">
          {item.drop_address}
        </Label>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns={4} className="remove-padding-top card-style">
      <Grid.Column className="order-details-container">
        <div className="heading-label">Package Weight:</div>
        <Label basic color="black" className="value-label">
          {item.package_weight}
        </Label>
      </Grid.Column>
      <Grid.Column className="order-details-container">
        <div className="heading-label">Package Height:</div>
        <Label basic color="black" className="value-label">
          {item.package_height}
        </Label>
      </Grid.Column>
      <Grid.Column className="order-details-container">
        <div className="heading-label">Package Length:</div>
        <Label basic color="black" className="value-label">
          {item.package_length}
        </Label>
      </Grid.Column>
      <Grid.Column className="order-details-container">
        <div className="heading-label">Package Width:</div>
        <Label basic color="black" className="value-label">
          {item.package_width}
        </Label>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

function PlaceOrder(props) {
  const [open, setOpen] = useState(true);

  const [orders, setOrders] = useState([]);
  const history = useHistory();

  const [orderDetails, setOrderDetails] = useState({
    orderId: "ord1",
    pickup_area: "",
    pickup_address: "",
    drop_area: "",
    drop_address: "",
    reciever_name: "",
    reciever_contact: "",
    package_weight: "",
    package_height: "",
    package_length: "",
    package_width: "",
  });

  const [edit, setEdit] = useState();

  const [validContact, setValidContact] = useState(true);

  const handleSubmit = () => {
    if (IsMobileNumber(orderDetails.reciever_contact)) {
      setValidContact(true);
      setOpen(false);
      addOrEditPackage();
    } else {
      setValidContact(false);
    }
  };

  function updateOrderDetails(field, value) {
    setOrderDetails(() => {
      let odClone = { ...orderDetails };
      odClone[field] = value;
      return odClone;
    });
  }

  const [areaResponse, setAreaResponse] = useState();
  const [noShipperModalOpen, setNoShipperModalOpen] = useState(false);

  useEffect(() => {
    areas = [];
    axios
      .get(`${BASE_URL}/get-operational-areas`)
      .then((res) => {
        setAreaResponse(res.data);
        res.data.forEach((element) => {
          areas.push({
            key: element.areaId,
            value: element.areaId,
            text: element.areaName,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function addOrEditPackage() {
    if (edit && edit.state) {
      let orderClone = [...orders];
      orderClone[edit.index] = orderDetails;
      setOrders(orderClone);
      setEdit({});
    } else {
      setOrders([...orders, orderDetails]);
    }
  }

  function deletePackage(orderId) {
    setOrders(orders.filter((item) => item.orderId !== orderId));
  }

  function editAddedPackage(orderId, index) {
    setOpen(true);
    const editDict = {
      state: true,
      index: index,
    };
    setOrderDetails(orders[index]);
    setEdit(editDict);
  }

  function resetOrderDetails() {
    setOpen(true);
    const emptyOrder = {
      orderId: "ord" + (orders.length + 1),
      pickup_area: "",
      pickup_address: "",
      drop_area: "",
      drop_address: "",
      reciever_name: "",
      reciever_contact: "",
      package_weight: "",
      package_height: "",
      package_length: "",
      package_width: "",
    };
    setOrderDetails(emptyOrder);
  }

  const [placeOrderResponse, setPlaceOrderResponse] = useState();

  function addOrder() {
    const body = [];
    orders.forEach((item) => {
      let res = {
        pickupAddress: item.pickup_address,
        pickupArea: item.pickup_area,
        dropAddress: item.drop_address,
        dropArea: item.drop_area,
        orderHeight: item.package_height,
        orderLength: item.package_length,
        orderWidth: item.package_width,
        packageWeight: item.package_weight,
        receiverContact: item.reciever_contact,
        receiverName: item.reciever_name,
        userId: props.logInDetails.userDetail.userId,
      };
      body.push(res);
    });
    axios
      .post(`${BASE_URL}/order-place`, body)
      .then((response) => {
        if (response.data.shipperList.length === 0) {
          setNoShipperModalOpen(true);
        }
        setPlaceOrderResponse(response);
      })
      .catch((error) => {
        console.log(error);
        setPlaceOrderResponse(error.response);
      });
  }

  return (
    <div>
      <OrderModal
        open={open}
        setOpen={setOpen}
        updateOrderDetails={updateOrderDetails}
        handleSubmit={handleSubmit}
        orderDetails={orderDetails}
        edit={edit}
        orders={orders}
        areaResponse={areaResponse}
        validContact={validContact}
      />

      {!placeOrderResponse ||
      placeOrderResponse.data.shipperList.length === 0 ? (
        <>
          <Modal centered={false} open={noShipperModalOpen}>
            <Modal.Header>Shipper Not Available!!</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                There is no Shipper present for the combination you chose in
                pickup and drop area. Please change it to continue.
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setNoShipperModalOpen(false)}>OK</Button>
            </Modal.Actions>
          </Modal>
          <>
            {orders.map((item, index) => {
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
                          "0 0 0 1px #d4d4d5, 0 2px 0 0 #2185d0, 0 1px 10px 3px #d4d4d5",
                        borderRadius: "1rem",
                      }}
                    >
                      <Card.Content>
                        <Card.Header>Package {index + 1}</Card.Header>
                        <Card.Description style={{ display: "flex" }}>
                          <OrderCard item={item} />
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle">
                    {index === orders.length - 1 ? (
                      <Button
                        className="fun-btn"
                        icon="add"
                        size="huge"
                        onClick={() => resetOrderDetails()}
                      />
                    ) : null}
                    <Button
                      className="fun-btn"
                      icon="edit"
                      size="huge"
                      onClick={() => editAddedPackage(item.orderId, index)}
                    />
                    {index !== 0 ? (
                      <Button
                        className="fun-btn"
                        icon="trash alternate"
                        size="huge"
                        onClick={() => deletePackage(item.orderId)}
                      />
                    ) : null}
                  </Grid.Column>
                </Grid>
              );
            })}
            <div className="proceed-container">
              <Button
                icon
                labelPosition="right"
                color="instagram"
                onClick={() => addOrder()}
              >
                Proceed
                <Icon name="right arrow" />
              </Button>
              <Button
                icon
                labelPosition="left"
                color="red"
                onClick={() => {history.push("/account/orders", props.logInDetails)}}
              >
                Go Back
                <Icon name="left arrow" />
              </Button>
            </div>
          </>
        </>
      ) : placeOrderResponse.status === 200 ? (
        <ShipperList placeOrderResponse={placeOrderResponse} />
      ) : null}
    </div>
  );
}

export default PlaceOrder;
