import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    maxHeight: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'auto',
    p: 2
};

const ContactInfoModel = ({
    openContactInfoModal,
    handleCloseContactInfoModal,
    phoneNumber
}) => {


    return (
        <Modal
            open={openContactInfoModal}
            onClose={handleCloseContactInfoModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <h4>Contact Details :- {phoneNumber.length === 0 ? phoneNumber : "Contact Info Not Provided"}</h4>
            </Box>
        </Modal>
    )
}

export default ContactInfoModel