import React, { useState, useEffect } from "react";
import { Form, Modal, Icon, Button } from "semantic-ui-react";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants";

const OrderModal = ({
  open,
  setOpen,
  handleSubmit,
  updateServiceDetails,
  serviceDetails,
  setServiceDetails,
}) => {
  const [services, setServices] = useState([]);
  useEffect(async () => {
    await axios
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
        setServices(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Modal
      open={open}
      closeOnDimmerClick={false}
      size="tiny"
      as={Form}
      onSubmit={handleSubmit}
    >
      <Modal.Header>Please enter the Service Details</Modal.Header>
      <Modal.Content scrolling>
        <Form.Group style={{ justifyContent: "space-between" }}>
          <Form.Dropdown
            label="Service Name"
            placeholder="Service Name"
            required
            fluid
            options={services}
            value={serviceDetails.serviceName}
            search
            selection
            width={7}
            onChange={(e, data) =>
              updateServiceDetails("serviceName", data.value)
            }
          />
          <Form.Input
            label="Service Description"
            placeholder="Service Description"
            width={7}
            required
            fluid
            value={serviceDetails.description}
            onChange={(e) =>
              updateServiceDetails("description", e.target.value)
            }
          />
        </Form.Group>
        <Form.Group style={{ justifyContent: "space-between" }}>
          <Form.Input
            label="Cost Per Kg"
            placeholder="Cost Per Kg"
            required
            fluid
            search
            selection
            type="number"
            value={serviceDetails.costPerKg}
            width={7}
            onChange={(e) => updateServiceDetails("costPerKg", e.target.value)}
          />
          <Form.Input
            label="Cost Per Km"
            placeholder="Cost Per Km"
            required
            fluid
            search
            selection
            type="number"
            value={serviceDetails.costPerKm}
            width={7}
            onChange={(e) => updateServiceDetails("costPerKm", e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ justifyContent: "space-between" }}>
          <Form.Input
            label="Cost Per Length"
            placeholder="Cost Per Length"
            width={7}
            required
            fluid="true"
            type="number"
            value={serviceDetails.costPerLength}
            onChange={(e) =>
              updateServiceDetails("costPerLength", e.target.value)
            }
          />
          <Form.Input
            label="Cost Per Width"
            placeholder="Cost Per Width"
            width={7}
            required
            fluid="true"
            type="number"
            value={serviceDetails.costPerWidth}
            onChange={(e) =>
              updateServiceDetails("costPerWidth", e.target.value)
            }
          />
        </Form.Group>
        <Form.Group style={{ justifyContent: "space-between" }}>
          <Form.Input
            label="Cost Per Height"
            placeholder="Cost Per Height"
            width={7}
            required
            fluid
            value={serviceDetails.costPerHeight}
            onChange={(e) =>
              updateServiceDetails("costPerHeight", e.target.value)
            }
            type="number"
          />
          <Form.Input
            label="Cost Per Volume"
            placeholder="BCost Per Volume"
            width={7}
            required
            fluid
            value={serviceDetails.costPerVolume}
            type="number"
            onChange={(e) =>
              updateServiceDetails("costPerVolume", e.target.value)
            }
          />
        </Form.Group>
        <Form.Group style={{ justifyContent: "space-between" }}>
          <Form.Input
            label="Base Order Cost"
            placeholder="Base Order Cost"
            required
            fluid
            search
            selection
            type="number"
            value={serviceDetails.baseOrderCost}
            width={7}
            onChange={(e) =>
              updateServiceDetails("baseOrderCost", e.target.value)
            }
          />
          <Form.Input
            label="Transportation mode"
            placeholder="transportation mode"
            required
            fluid
            search
            selection
            value={serviceDetails.transportationMode}
            onChange={(e) =>
              updateServiceDetails("transportationMode", e.target.value)
            }
            width={7}
          />
        </Form.Group>
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          onClick={() => {
            setOpen(false);
            setServiceDetails({
              baseOrderCost: "",
              costPerHeight: "",
              costPerKg: "",
              costPerKm: "",
              costPerLength: "",
              costPerVolume: "",
              costPerWidth: "",
              description: "",
              serviceName: "",
              transportationMode: "",
            });
          }}
        >
          <Icon name="cancel" /> Cancel
        </Button>
        <Button primary type="Submit">
          <Icon name="save" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
function ShipperServices({ userId }) {
  const [open, setOpen] = useState(false);
  const [serviceDetails, setServiceDetails] = useState({
    baseOrderCost: "",
    costPerHeight: "",
    costPerKg: "",
    costPerKm: "",
    costPerLength: "",
    costPerVolume: "",
    costPerWidth: "",
    description: "",
    serviceName: "",
    transportationMode: "",
  });
  const updateServiceDetails = (type, value) => {
    if (type === "serviceName") {
      setServiceDetails({ ...serviceDetails, ...{ serviceName: value } });
    } else if (type === "description") {
      setServiceDetails({ ...serviceDetails, ...{ description: value } });
    } else if (type === "baseOrderCost") {
      setServiceDetails({ ...serviceDetails, ...{ baseOrderCost: value } });
    } else if (type === "costPerKg") {
      setServiceDetails({ ...serviceDetails, ...{ costPerKg: value } });
    } else if (type === "costPerKm") {
      setServiceDetails({ ...serviceDetails, ...{ costPerKm: value } });
    } else if (type === "costPerLength") {
      setServiceDetails({ ...serviceDetails, ...{ costPerLength: value } });
    } else if (type === "costPerWidth") {
      setServiceDetails({ ...serviceDetails, ...{ costPerWidth: value } });
    } else if (type === "costPerHeight") {
      setServiceDetails({ ...serviceDetails, ...{ costPerHeight: value } });
    } else if (type === "costPerVolume") {
      setServiceDetails({ ...serviceDetails, ...{ costPerVolume: value } });
    } else {
      setServiceDetails({
        ...serviceDetails,
        ...{ transportationMode: value },
      });
    }
  };

  const handleSubmit = () => {
    let body = { ...serviceDetails, userId: userId };
    axios
      .post(`${BASE_URL}/service-create`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
    setServiceDetails({
      baseOrderCost: "",
      costPerHeight: "",
      costPerKg: "",
      costPerKm: "",
      costPerLength: "",
      costPerVolume: "",
      costPerWidth: "",
      description: "",
      serviceName: "",
      transportationMode: "",
    });
  };
  return (
    <div style={{display: "flex", flexDirection: "row-reverse"}}>
      <OrderModal
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        updateServiceDetails={updateServiceDetails}
        serviceDetails={serviceDetails}
        setServiceDetails={setServiceDetails}
      />
      <Button
        style={{margin: "1.5rem 0"}}
        color="instagram"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Service
      </Button>
    </div>
  );
}

export default ShipperServices;
