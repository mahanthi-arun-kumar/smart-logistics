import React from "react";
import { Button, Grid, Modal } from "semantic-ui-react";
import "./OrderExtraDetails.css";

function OrderExtraDetails({ open, setOpen, pastOrdersData }) {
  return (
    <div>
      <Modal open={open}>
        <Modal.Header>Order other details</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid padded>
              <Grid.Row columns={3}>
                <Grid.Column className="extra-details-container">
                  <div className="extra-details-label">Reciever Name: </div>
                  <div className="extra-details-value">
                    {pastOrdersData.receiverName}
                  </div>
                </Grid.Column>
                <Grid.Column className="extra-details-container">
                  <div className="extra-details-label">Reciever Contact: </div>
                  <div className="extra-details-value">
                    {pastOrdersData.receiverContact}
                  </div>
                </Grid.Column>
                <Grid.Column className="extra-details-container">
                  <div className="extra-details-label">Shipper Name: </div>
                  <div className="extra-details-value">
                    {pastOrdersData.shipper.userDetail.name}
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column className="extra-details-container">
                  <div className="extra-details-label">Pickup Area: </div>
                  <div className="extra-details-value">
                    {pastOrdersData.pickupArea.areaName},{" "}
                    {pastOrdersData.pickupArea.postalCode}
                  </div>
                </Grid.Column>
                <Grid.Column className="extra-details-container">
                  <div className="extra-details-label">Drop Area: </div>
                  <div className="extra-details-value">
                    {pastOrdersData.dropArea.areaName},{" "}
                    {pastOrdersData.dropArea.postalCode}
                  </div>
                </Grid.Column>
                <Grid.Column className="extra-details-container">
                  <div className="extra-details-label">Shipper Contact: </div>
                  <div className="extra-details-value">
                    {pastOrdersData.shipper.userDetail.contact}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="instagram"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default OrderExtraDetails;
