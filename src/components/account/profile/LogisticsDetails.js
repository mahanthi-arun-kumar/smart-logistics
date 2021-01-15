import React from "react";
import { Label, Card, Header, Divider } from "semantic-ui-react";
import ProfileModal from "./ProfileModal";
import "./LogisticDetails.css";
import AreasModel from "./AreasModel";
import ShipperServices from "./ShipperServices";
function LogisticsDetails({ description, locations, userId }) {
  return (
    <section>
      <Header className="with-icon">Description</Header>
      <div className="card-with-edit">
        <Card
          className="description-card"
          fluid
          description={description}
          label="description"
        />
        <div className="logistic-edit">
          <AreasModel />
        </div>
      </div>

      <Divider />
      <Header className="with-icon">Area of Operations</Header>
      <div className="areas-with-edit">
        <div>
          {locations.map((location) => (
            <Label as="a" color={"blue"}>
              {location.areaName}
            </Label>
          ))}
        </div>
        <div className="logistic-edit">
          <AreasModel />
        </div>
      </div>
    </section>
  );
}

export default LogisticsDetails;
