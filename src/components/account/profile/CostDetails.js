import React, { useState, useEffect } from "react";
import { List, Icon, Divider, Grid } from "semantic-ui-react";
import ProfileModal from "./ProfileModal";
import "./CostDetails.css";
import ShipperServices from "./ShipperServices";
import SelectService from "./SelectService";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants";

function CostDetails({
  baseCost,
  costPerKm,
  costPerKg,
  costPerVolume,
  costPerWidth,
  costPerHeight,
  costPerLength,
  OnChange,
  userId,
}) {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [selectedService, setSelectedService] = useState("Default service");
  const [choosedServiceDetails, setChoosedServiceDetails] = useState({
    baseOrderCost: "",
    costPerHeight: "",
    costPerKg: "",
    costPerKm: "",
    costPerLength: "",
    costPerVolume: "",
    costPerWidth: "",
  });
  useEffect(async () => {
    await axios
      .get(`${BASE_URL}/services-get/shipper/${userId}`)
      .then((res) => {
        setServiceDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column>
            <SelectService
              serviceDetails={serviceDetails}
              choosedServiceDetails={choosedServiceDetails}
              setChoosedServiceDetails={setChoosedServiceDetails}
            />
          </Grid.Column>
          <Grid.Column>
            <ShipperServices userId={userId} />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {choosedServiceDetails && (
        <List>
          <List.Item className="cost-details">
            <div className="with-icon">
              <Icon size={"large"} name="rupee" />
              <div className="email">Base Cost</div>
            </div>
            <div className="email-value">
              <div>{choosedServiceDetails.baseOrderCost}</div>

              <ProfileModal
                onChange={OnChange}
                fieldValue={baseCost}
                type="Base Cost"
              />
            </div>
            <Divider />
          </List.Item>
          <List.Item className="cost-details">
            <div className="with-icon">
              <Icon size="large" name="rupee" />
              <div className="email">Cost Per Km</div>
            </div>
            <div className="email-value">
              <div>{choosedServiceDetails.costPerKm}</div>
              <ProfileModal
                onChange={OnChange}
                fieldValue={costPerKm}
                type="Cost Per Km"
              />
            </div>
            <Divider />
          </List.Item>
          <List.Item className="cost-details">
            <div className="with-icon">
              <Icon size={"large"} name="rupee" />
              <div className="email">Cost Per Kg</div>
            </div>
            <div className="email-value">
              <div>{choosedServiceDetails.costPerKg}</div>

              <ProfileModal
                onChange={OnChange}
                fieldValue={costPerKg}
                type="Cost Per Kg"
              />
            </div>
            <Divider />
          </List.Item>
          <List.Item className="cost-details">
            <div className="with-icon">
              <Icon size={"large"} name="rupee" />
              <div className="email">Cost Per Volume</div>
            </div>
            <div className="email-value">
              <div>{choosedServiceDetails.costPerVolume}</div>

              <ProfileModal
                onChange={OnChange}
                fieldValue={costPerVolume}
                type="Cost Per Volume"
              />
            </div>
            <Divider />
          </List.Item>
          <List.Item className="cost-details">
            <div className="with-icon">
              <Icon size={"large"} name="rupee" />
              <div className="email">Cost Per Width</div>
            </div>
            <div className="email-value">
              <div>{choosedServiceDetails.costPerWidth}</div>
              <ProfileModal
                onChange={OnChange}
                fieldValue={costPerWidth}
                type="Cost Per Width"
              />
            </div>
            <Divider />
          </List.Item>
          <List.Item className="cost-details">
            <div className="with-icon">
              <Icon size={"large"} name="rupee" />
              <div className="email">Cost Per Height</div>
            </div>
            <div className="email-value">
              <div>{choosedServiceDetails.costPerHeight}</div>
              <ProfileModal
                onChange={OnChange}
                fieldValue={costPerHeight}
                type="Cost Per Height"
              />
            </div>
            <Divider />
          </List.Item>
          <List.Item className="cost-details">
            <div className="with-icon">
              <Icon size={"large"} name="rupee" />
              <div className="email">Cost Per Length</div>
            </div>
            <div className="email-value">
              <div>{choosedServiceDetails.costPerLength}</div>
              <ProfileModal
                onChange={OnChange}
                fieldValue={costPerLength}
                type="Cost Per Length"
              />
            </div>
            <Divider />
          </List.Item>
        </List>
      )}
    </div>
  );
}

export default CostDetails;
