import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../../sass/components/popupModal.scss";

const ConfirmationPopup = ({ show, onCancel, onConfirm, itemName }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton className="popup-header">
        <Modal.Title>Remove Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="popup-message">
          Are you sure you want to remove <strong>{itemName}</strong> from the
          cart?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-cancel" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="btn-remove" onClick={onConfirm}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationPopup;
