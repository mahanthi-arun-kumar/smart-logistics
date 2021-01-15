import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Input, Modal, Label } from "semantic-ui-react";
import "./ProfileModal.css";
import { IsMobileNumber } from "../../utils/Utils";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants";

function ProfileModal({ onChange, fieldValue, type, email }) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState(fieldValue);
  const [inputErrorFlag, setInputErrorFlag] = useState(false);
  function updateField() {
    if (type === "contact") {
      if (IsMobileNumber(inputValue)) {
        setOpen(false);
        setInputErrorFlag(false);
        onChange(inputValue, type);
      } else {
        setInputErrorFlag(true);
      }
    } else {
      setOpen(false);
      onChange(inputValue, type);
    }
  }

  const [updateResponse, setUpdateResponse] = useState();

  function updateProfile() {
    let body = "";
    if (type === "contact") {
      body = { contact: inputValue };
    } else if (type === "address") {
      body = { address: inputValue };
    } else {
      body = { name: inputValue };
    }

    axios
      .patch(`${BASE_URL}/user/${email}`, body)
      .then((response) => setUpdateResponse(response))
      .catch((error) => setUpdateResponse(error.response));
  }

  useEffect(() => {
    if (updateResponse && updateResponse.status === 200) {
      updateField();
    }
  }, [updateResponse]);

  return (
    <Modal
      className="modal-block"
      open={open}
      trigger={<Icon name="edit" />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
    >
      <Header icon="edit" content={type} />
      <Modal.Content>
        <Input
          className="edit-input"
          value={inputValue}
          autoFocus={true}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        {inputErrorFlag && (
          <Label basic color="red" pointing className="label-margin">
            Enter a valid {type}
          </Label>
        )}
        {updateResponse && updateResponse.status !== 200 ? (
          <Label basic color="red">
            {updateResponse.data.message}
          </Label>
        ) : null}
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          onClick={() => {
            setInputValue(fieldValue);
            setOpen(false);
          }}
        >
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={() => updateProfile()}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ProfileModal;
