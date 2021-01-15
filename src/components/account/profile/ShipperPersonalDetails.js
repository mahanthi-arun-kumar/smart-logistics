import React, { useState } from "react";
import { List, Icon, Divider } from "semantic-ui-react";
import "./SellerProfileDetails.css";
import ProfileModal from "./ProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

function ShipperPersonalDetails({
  email,
  name,
  address,
  contact,
  password,
  OnChange,
  changePassword,
}) {
  return (
    <List>
      <List.Item className="">
        <div className="mail-with-icon">
          <Icon size={"large"} name="mail" />
          <div className="email">Email</div>
        </div>
        <div className="email-value">
          <div className="prof-val-cont">{email}</div>
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
          <ProfileModal onChange={OnChange} fieldValue={name} type="name" email={email} />
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
          {/* <Icon name="pencil alternate" /> */}
        </div>
        <Divider />
      </List.Item>
      <List.Item>
        <div style={{ margin: "0 0 1rem 0rem" }}>
          <ChangePasswordModal
            changePassword={changePassword}
            password={password}
          />
        </div>
      </List.Item>
    </List>
  );
}

export default ShipperPersonalDetails;
