import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from './Stores/modalSlice';


function PopUpModal (props) {

  const redux = useSelector((state) => state.modal || {});
  const dispatch = useDispatch();

  // Prefer explicit props if provided; otherwise fall back to redux slice
  const open = (typeof props.open !== 'undefined') ? props.open : redux.isOpen;
  const description = props.description ?? redux.description ?? '';
  const color = props.color ?? redux.color ?? '';
  const confirmAction = props.confirmAction ?? redux.confirmAction ?? (() => {});
  const handleClose = props.onClose ?? (() => dispatch(closeModal()));

  if (!open) return null;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '45%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 240,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <label style={{ color: color, fontSize: "20px", textAlign: "center" }}>{description}</label>
        </div>
        <br />
      
      
        <div style={{ marginLeft: "210px" }}>
            {props.color == "red" ? 
          <Button style={{ border: "1px solid", marginRight: "5px" }} onClick={handleClose}>Cancel</Button>
          : null }
          <Button style={{ border: "1px solid" }} onClick={() => { confirmAction(); handleClose(); }}>Confirm</Button>
        </div>
      </Box>
    </Modal>
  );
}

export default PopUpModal;