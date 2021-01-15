import axios from "axios";
import React, { useState } from "react";
import { List, Icon, Divider } from "semantic-ui-react";
import ChangePasswordModal from "./ChangePasswordModal";
import PaymentDetails from "./PaymentDetails";
import ProfileModal from "./ProfileModal";
import "./SellerProfileDetails.css";

function SellerProfileDetails(props) {
  const { logInDetails } = props;
  const [email, setEmail] = useState(logInDetails.email);
  const [name, setName] = useState(logInDetails.name);
  const [address, setAddress] = useState(logInDetails.address);
  const [contact, setContact] = useState(logInDetails.contact);
  const [password, setNewPassword] = useState(logInDetails.password);
  const OnChange = (value, typeOfUpdation) => {
    if (typeOfUpdation === "contact") {
      setContact(value);
    } else if (typeOfUpdation === "address") {
      setAddress(value);
    } else {
      setName(value);
    }
  };
  const changePassword = (value) => {
    setNewPassword(value);
  };

  return (
    <main>
      <List className="profile-details">
        <List.Item className="">
          <div className="mail-with-icon">
            <Icon size={"large"} name="mail" />
            <div className="email">Email</div>
          </div>
          <div className="email-value">
            <div>{email}</div>
          </div>
          <Divider />
        </List.Item>
        <List.Item className="">
          <div className="mail-with-icon">
            <Icon size={"large"} name="user circle outline" />
            <div className="email">User Name</div>
          </div>
          <div className="email-value">
            <div>{name}</div>
            <ProfileModal
              onChange={OnChange}
              fieldValue={name}
              type="name"
              email={email}
            />
          </div>
          <Divider />
        </List.Item>
        <List.Item className="">
          <div className="mail-with-icon">
            <Icon size={"large"} name="location arrow" />
            <div className="email">Address</div>
          </div>
          <div className="email-value">
            <div>{address}</div>
            <ProfileModal
              onChange={OnChange}
              fieldValue={address}
              type="address"
              email={email}
            />
          </div>
          <Divider />
        </List.Item>
        <List.Item className="">
          <div className="mail-with-icon">
            <Icon size={"large"} name="phone" />
            <div className="email">Contact</div>
          </div>
          <div className="email-value">
            <div>{contact}</div>
            <ProfileModal
              onChange={OnChange}
              fieldValue={contact}
              type="contact"
              email={email}
            />
          </div>
          <Divider />
        </List.Item>
        <List.Item>
          <div style={{ margin: "0 0 1rem 0rem" }}>
            <ChangePasswordModal
              changePassword={changePassword}
              password={password}
              email={email}
            />
          </div>
        </List.Item>
      </List>
    </main>
  );
}

export default SellerProfileDetails;
