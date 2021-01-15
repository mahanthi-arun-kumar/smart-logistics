import React from "react";
import { Modal, Button } from "semantic-ui-react";

function warningModal(props) {
  return (
    <div>
      <Modal
        centered={false}
        size="tiny"
        open={props.open}
      >
        <Modal.Header>Order Confirmation</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to place the order with selected Shipper?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => {
              props.setOpen(false);
            }}
          >
            No
          </Button>
          <Button
            positive
            onClick={() => {
              props.setOpen(false);
              props.updateOrderList(props.shId)
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default warningModal;
