import React, { useState } from "react";
import { Menu, Segment, List, Icon, Divider } from "semantic-ui-react";
//import "./SellerProfileDetails.css";
import ProfileModal from "./ProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import ShipperPersonalDetails from "./ShipperPersonalDetails";
import LogisticsDetails from "./LogisticsDetails";
import CostDetails from "./CostDetails";

function ShipperProfileDetails({ logInDetails }) {
  const [activeItem, setActiveItem] = useState("Personal Details");

  const [email, setEmail] = useState(logInDetails.userDetail.email);
  const [name, setName] = useState(logInDetails.userDetail.name);
  const [address, setAddress] = useState(logInDetails.userDetail.address);
  const [contact, setContact] = useState(logInDetails.userDetail.contact);
  const [password, setNewPassword] = useState(logInDetails.userDetail.password);
  const [description, setDescription] = useState(logInDetails.description);
  const [locations, setLocations] = useState(logInDetails.areaOperationList);
  const [baseCost, setBaseCost] = useState(logInDetails.baseOrderCost);
  const [costPerKm, setCostPerKm] = useState(logInDetails.costPerKm);
  const [costPerKg, setCostPerKg] = useState(logInDetails.costPerKg);
  const [costPerVolume, setCostPerVolume] = useState(
    logInDetails.costPerVolume
  );
  const [costPerHeight, setCostPerHeight] = useState(
    logInDetails.costPerHeight
  );
  const [costPerWidth, setCostPerWidth] = useState(logInDetails.costPerWidth);
  const [costPerLength, setCostPerLength] = useState(
    logInDetails.costPerLength
  );
  const OnChange = (value, typeOfUpdation) => {
    if (typeOfUpdation === "contact") {
      setContact(value);
    } else if (typeOfUpdation === "address") {
      setAddress(value);
    } else if (typeOfUpdation === "Base Cost") {
      setBaseCost(value);
    } else if (typeOfUpdation === "Cost Per Kg") {
      setCostPerKg(value);
    } else if (typeOfUpdation === "Cost Per Km") {
      setCostPerKm(value);
    } else if (typeOfUpdation === "Cost Per Volume") {
      setCostPerVolume(value);
    } else if (typeOfUpdation === "Cost Per Height") {
      setCostPerHeight(value);
    } else if (typeOfUpdation === "Cost Per Length") {
      setCostPerLength(value);
    } else if (typeOfUpdation === "Cost Per Width") {
      setCostPerWidth(value);
    } else {
      setName(value);
    }
  };
  const changePassword = (value) => {
    setNewPassword(value);
  };
  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <div>
      <Menu tabular>
        <Menu.Item
          name="Personal Details"
          active={activeItem === "Personal Details"}
          icon="user"
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Logistic Details"
          icon="truck"
          active={activeItem === "Logistic Details"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Cost Details"
          icon="money"
          active={activeItem === "Cost Details"}
          onClick={handleItemClick}
        />
      </Menu>
      <Segment>
        <main>
          {activeItem === "Personal Details" && (
            <ShipperPersonalDetails
              email={email}
              name={name}
              address={address}
              contact={contact}
              password={password}
              OnChange={OnChange}
              changePassword={changePassword}
            />
          )}
          {activeItem === "Logistic Details" && (
            <LogisticsDetails
              description={description}
              locations={locations}
              userId={logInDetails.userDetail.userId}
            />
          )}
          {activeItem === "Cost Details" && (
            <CostDetails
              baseCost={baseCost}
              costPerKm={costPerKm}
              costPerKg={costPerKg}
              costPerVolume={costPerVolume}
              costPerWidth={costPerWidth}
              costPerHeight={costPerHeight}
              costPerLength={costPerLength}
              OnChange={OnChange}
              userId={logInDetails.userDetail.userId}
            />
          )}
        </main>
      </Segment>
    </div>
  );
}

export default ShipperProfileDetails;
