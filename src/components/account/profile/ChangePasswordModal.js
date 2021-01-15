import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Modal, Form, Label } from "semantic-ui-react";
import { checkPassWordStrength } from "../../utils/Utils";
import "./ChangePasswordModal.css";
import { BASE_URL } from "../../utils/Constants";

function ChangePasswordModal({ changePassword, password, email }) {
  const [open, setOpen] = React.useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [cupFlag, setCupFlag] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [npsFlag, setNpsFlag] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [newCurrPswdSame, setNewCurrPswdSame] = useState(false);

  const [updateResponse, setUpdateResponse] = useState();

  const updatePassword = () => {
    setPasswordStrength(checkPassWordStrength(newPassword));
    if (password !== currentPassword) {
      setCupFlag(true);
      setNpsFlag(false);
    } else if (newPassword !== confirmPassword) {
      setCupFlag(false);
      setNpsFlag(true);
    } else if (newPassword === currentPassword) {
      setCupFlag(false);
      setNpsFlag(false);
      setNewCurrPswdSame(true);
    } else {
      let body = { password: newPassword };
      axios
        .patch(`${BASE_URL}/user/${email}`, body)
        .then((response) => setUpdateResponse(response))
        .catch((error) => setUpdateResponse(error.response));
      // setOpen(false);
      // setCupFlag(false);
      // setNpsFlag(false);
    }
  };
  const OnChange = (value, type) => {
    if (type === "currentPassword") {
      setCurrentPassword(value);
    } else if (type === "newPassword") {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  useEffect(() => {
    if (updateResponse && updateResponse.status === 200) {
      setOpen(false);
      setCupFlag(false);
      setNpsFlag(false);
      setNewCurrPswdSame(false);
    }
  }, [updateResponse]);

  return (
    <Modal
      className="modal-block"
      open={open}
      trigger={<Button color="instagram">update password</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
      as={Form}
      onSubmit={updatePassword}
    >
      <Header icon="edit" content="change passowrd" />
      <Modal.Content>
        <Form.Input
          label="Current Password"
          type="password"
          required
          autoFocus={true}
          onChange={(e) => {
            OnChange(e.target.value, "currentPassword");
          }}
        />
        {cupFlag && (
          <Label basic color="red" pointing className="label-margin">
            Enter your previous password correctly
          </Label>
        )}

        <Form.Input
          label="New Password"
          type="password"
          required
          onChange={(e) => {
            OnChange(e.target.value, "newPassword");
          }}
        />
        {passwordStrength === "weak" ? (
          <Label basic pointing color="red" className="label-margin">
            Password must contain atleast one lowercase, uppercase, special
            character, number and length must be more than 8
          </Label>
        ) : newCurrPswdSame ? (
          <Label basic pointing color="red" className="label-margin">
            New and Current password are same. Please give another password
          </Label>
        ) : null}
        {/* </Form.Field> */}
        <Form.Input
          label="Confirm New Password"
          type="password"
          required
          onChange={(e) => {
            OnChange(e.target.value, "confirmPassword");
          }}
        />
        {npsFlag && (
          <Label basic color="red" pointing className="label-margin">
            Confirm Password doesn't match with new Password
          </Label>
        )}
        {updateResponse && updateResponse !== 200 ? (
          <Label color="red">Some error occured!! Please try again</Label>
        ) : null}
        {/* </Form> */}
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          onClick={() => {
            setOpen(false);
            setCupFlag(false);
            setNpsFlag(false);
            setPasswordStrength("");
            setNewCurrPswdSame(false);
          }}
        >
          <Icon name="remove" /> No
        </Button>
        <Button color="green" type="Submit">
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ChangePasswordModal;
