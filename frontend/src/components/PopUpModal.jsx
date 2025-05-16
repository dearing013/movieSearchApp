import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';


function PopUpModal (props) {

    
    
  const handleClose = () => {
    props.onClose()

    console.log(props.open)
  }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '45%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        height:  240,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };




    return (

        <div>
            
            <Modal
              open={props.open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">

            <Box sx={style}>
            <div style={{display:"flex",flexDirection: "column",marginLeft: "140px"}}>
                <label style={{color: "green",fontSize: "20px"}}>{props.description}</label>
            </div>
            <br></br>
            <div style={{marginLeft: "210px"}}>
                <Button style={{border: "1px solid",marginRight: "5px"}} onClick={handleClose} >Close</Button>
            </div>
            </Box>
            </Modal>
        </div>
    )
}
export default PopUpModal;