import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
function AreasModel() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      open={open}
      trigger={<Icon name="edit" />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
    >
      <Header icon="edit" content="Archive Old Messages" />
      <Modal.Content>
        <p>edit areas</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default AreasModel;
