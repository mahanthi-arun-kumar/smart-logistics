import React, { useEffect, useState } from "react";
import { Form, Button, Step, Icon, Label, Popup } from "semantic-ui-react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { checkPassWordStrength, IsMobileNumber } from "../utils/Utils";
import { BASE_URL } from "../utils/Constants";

function Register() {
  const [step, setStep] = useState(0);
  const [confirmPswd, setConfirmPswd] = useState(true);
  const [validContact, setValidContact] = useState(true);
  const [pswdLabel, setpswdLabel] = useState(false);
  const [area, setArea] = useState(true);
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    contact: "",
    type: "seller",
    password: "",
    confirmPassword: "",
    address: "",
    description: "",
    area: [],
    base_order_cost: "",
    per_kg_cost: "",
    per_km_cost: "",
    cost_per_volume: "",
    cost_per_width: "",
    cost_per_height: "",
    cost_per_length: "",
  });

  function updateRegistration(field, value) {
    setRegistration(() => {
      let regClone = { ...registration };
      regClone[field] = value;
      return regClone;
    });
  }

  function onNavHandler() {
    if (step === 0) {
      if (
        registration.name !== "" &&
        registration.email.includes("@") &&
        registration.password !== "" &&
        confirmPswd &&
        registration.address !== "" &&
        registration.contact !== "" &&
        registration.password === registration.confirmPassword
      ) {
        if (IsMobileNumber(registration.contact)) {
          if (checkPassWordStrength(registration.password) !== "weak") {
            setStep(step + 1);
          }
          setValidContact(true);
        } else {
          setValidContact(false);
        }
      }
    } else if (step === 1) {
      if (registration.area.length !==0) {
        setStep(step + 1);
      } else {
        setArea(false);
      }
    }
  }

  const [response, setResponse] = useState();
  const [load, setLoad] = useState(false);

  const history = useHistory();

  async function registerUser() {
    setLoad(true);
    if (IsMobileNumber(registration.contact)) {
      if (checkPassWordStrength(registration.password !== "weak")) {
        setValidContact(true);
        if (registration.type === "seller") {
          axios
            .post(`${BASE_URL}/create-seller`, {
              name: registration.name,
              email: registration.email,
              contact: registration.contact,
              userType: registration.type,
              password: registration.password,
              address: registration.address,
            })
            .then((response) => {
              setResponse(response);
            })
            .catch((error) => {
              setResponse(error.response);
            })
            .then(() => setLoad(false));
        } else if (registration.type === "shipper") {
          let userId = "";
          await axios
            .post(`${BASE_URL}/user-register`, {
              name: registration.name,
              email: registration.email,
              contact: registration.contact,
              userType: registration.type,
              password: registration.password,
              address: registration.address,
            })
            .then((response) => {
              userId = response.data.userId;
            })
            .catch((error) => console.log(error));

          const areas = [];
          areaResponse.forEach((item) => {
            if (registration.area.includes(item.areaId)) {
              areas.push(item);
            }
          });

          axios
            .post(`${BASE_URL}/create-shipper`, {
              areaOperationList: areas,
              baseOrderCost: registration.base_order_cost,
              costPerHeight: registration.cost_per_height,
              costPerKg: registration.per_kg_cost,
              costPerKm: registration.per_km_cost,
              costPerLength: registration.cost_per_length,
              costPerVolume: registration.cost_per_volume,
              costPerWidth: registration.cost_per_width,
              description: registration.description,
              userId: userId,
            })
            .then((response) => setResponse(response))
            .catch((error) => setResponse(error.response))
            .then(setLoad(false));
        }
      }
    } else {
      setValidContact(false);
      setLoad(false);
    }
  }

  useEffect(() => {
    if (response && response.status === 200) {
      if (response.data.userDetail.userType === "seller") {
        history.push("/account/orders", response.data);
      } else if (response.data.userDetail.userType === "shipper") {
        history.push("/account/requests", response.data);
      }
    }
  }, [response]);

  const [areaResponse, setAreaResponse] = useState();
  const [areaOptions, setAreaOptions] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/get-all-areas`)
      .then((res) => {
        setAreaResponse(res.data);
        const options = [];
        res.data.forEach((element) => {
          options.push({
            key: element.areaId,
            value: element.areaId,
            text: element.areaName,
          });
        });
        setAreaOptions(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {registration.type === "shipper" ? (
        <>
          <Step.Group stackable="tablet" size="tiny">
            <Step active={step === 0}>
              <Step.Content>
                <Step.Description>Personal Details</Step.Description>
              </Step.Content>
            </Step>

            <Step active={step === 1}>
              <Step.Content>
                <Step.Description>Logistic Details</Step.Description>
              </Step.Content>
            </Step>

            <Step disabled active={step === 2}>
              <Step.Content>
                <Step.Description>Cost Details</Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>
        </>
      ) : null}
      <Form>
        {step === 0 ? (
          <>
            <Form.Input
              fluid
              label="Name"
              placeholder="Name"
              required
              onChange={(e) => {
                updateRegistration("name", e.target.value);
              }}
              value={registration.name}
            />
            <Form.Input
              label="Email"
              placeholder="Email"
              type="email"
              required
              onChange={(e) => {
                updateRegistration("email", e.target.value);
              }}
              value={registration.email}
            />
            <Popup
              style={{opacity: "0.8", backgroundColor: "aliceblue"}}
              content="Password should contain atleast one numeric, alphanumeric, special character, uppercase, lowercase and should be more than 8 characters"
              trigger={
                <Form.Input
                  label="Password"
                  placeholder="Password"
                  type="password"
                  required
                  onChange={(e) => {
                    updateRegistration("password", e.target.value);
                    setpswdLabel(true);
                  }}
                  value={registration.password}
                />
              }
            />
            {pswdLabel ? (
              checkPassWordStrength(registration.password) === "strong" ? (
                <Label pointing color="green" className="no-space">
                  Password Strength Strong
                </Label>
              ) : checkPassWordStrength(registration.password) === "good" ? (
                <Label pointing color="yellow" className="no-space">
                  Password Stength Good
                </Label>
              ) : (
                <Label pointing color="red" className="no-space">
                  Weak Password!! Please change
                </Label>
              )
            ) : null}
            <Form.Input
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              required
              value={registration.confirmPassword}
              onChange={(e) => {
                updateRegistration("confirmPassword", e.target.value);
                registration.password === e.target.value
                  ? setConfirmPswd(true)
                  : setConfirmPswd(false);
              }}
            />
            {confirmPswd === false ? (
              <Label pointing color="red" className="no-space">
                Password and Confirm Password doesn't match
              </Label>
            ) : null}
            <Form.Input
              label="Mobile No."
              placeholder="Mobile No."
              type="number"
              required
              onChange={(e) => {
                updateRegistration("contact", e.target.value);
              }}
              value={registration.contact}
            />
            {!validContact ? (
              <Label pointing color="red" className="no-space">
                Please enter valid mobile number
              </Label>
            ) : null}
            <Form.TextArea
              label="Address"
              placeholder="Address"
              required
              onChange={(e) => {
                updateRegistration("address", e.target.value);
              }}
              value={registration.address}
            />
          </>
        ) : null}
        {step === 1 ? (
          <>
            <Form.TextArea label="Description" placeholder="Description" />
            <Form.Dropdown
              label="Area"
              placeholder="Select Area"
              required
              fluid
              search
              multiple
              selection
              options={areaOptions}
              onChange={(e, data) => {
                updateRegistration("area", data.value);
                data.value.length !== 0 ? setArea(true) : setArea(false);
              }}
            />
            {area === false ? (
              <Label pointing color="red" className="no-space">
                Area is a required field
              </Label>
            ) : null}
          </>
        ) : null}
        {step === 2 ? (
          <>
            <Form.Group>
              <Form.Input
                label="Base Cost"
                placeholder="in Rs"
                type="number"
                required
                width="8"
                value={registration.base_order_cost}
                onChange={(e) => {
                  updateRegistration("base_order_cost", e.target.value);
                }}
                min={1}
              />
              <Form.Input
                label="Cost per kg"
                placeholder="in Rs"
                type="number"
                required
                width="8"
                value={registration.per_kg_cost}
                onChange={(e) => {
                  updateRegistration("per_kg_cost", e.target.value);
                }}
                min={1}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Cost per km"
                placeholder="in Rs"
                type="number"
                required
                width="8"
                value={registration.per_km_cost}
                onChange={(e) => {
                  updateRegistration("per_km_cost", e.target.value);
                }}
                min={1}
              />
              <Form.Input
                label="Cost per volume"
                placeholder="in Rs"
                type="number"
                width="8"
                required
                value={registration.cost_per_volume}
                onChange={(e) => {
                  updateRegistration("cost_per_volume", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Cost per width"
                placeholder="in Rs"
                type="number"
                width="8"
                required
                value={registration.cost_per_width}
                onChange={(e) => {
                  updateRegistration("cost_per_width", e.target.value);
                }}
              />
              <Form.Input
                label="Cost per height"
                placeholder="in Rs"
                type="number"
                width="8"
                required
                value={registration.cost_per_height}
                onChange={(e) => {
                  updateRegistration("cost_per_height", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Input
              label="Cost per length"
              placeholder="in Rs"
              type="number"
              width="8"
              required
              value={registration.cost_per_length}
              onChange={(e) => {
                updateRegistration("cost_per_length", e.target.value);
              }}
            />
          </>
        ) : null}
        {registration.type === "seller" ? (
          <div className="space">
            <Button.Group>
              <Button
                color="blue"
                onClick={() => registerUser()}
                loading={load}
              >
                SignUp
              </Button>
              {response && response.status !== 200 ? (
                <>
                  <Label color="red">{response.data.message}</Label>
                </>
              ) : null}
              <Button.Or />
              <Button
                onClick={() => {
                  updateRegistration("type", "shipper");
                }}
              >
                Sign Up as a Shipper
              </Button>
            </Button.Group>
          </div>
        ) : step === 2 ? (
          <div className="nav-container">
            <Button
              animated
              basic
              color="blue"
              onClick={() => (step !== 0 ? setStep(step - 1) : null)}
            >
              <Button.Content visible>Previous</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow left" />
              </Button.Content>
            </Button>
            <Button color="blue" onClick={() => registerUser()} loading={load}>
              SignUp
            </Button>
          </div>
        ) : (
          <div className="nav-container">
            <Button
              animated
              basic
              color="blue"
              onClick={() => (step !== 0 ? setStep(step - 1) : null)}
            >
              <Button.Content visible>Previous</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow left" />
              </Button.Content>
            </Button>
            <Button animated basic color="blue" onClick={() => onNavHandler()}>
              <Button.Content visible>Next</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Register;
