import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    maxHeight: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'auto',
    p: 2
};

const CommentsModel = ({
    commentsModel, entryStatus, comments, handleCloseCommentsModel
}) => {

    return (
        <Modal
            open={commentsModel}
            onClose={handleCloseCommentsModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <h4>Status : {entryStatus}</h4>
                <h4>Accountents Comments : {comments}</h4>
                <button onClick={() => handleCloseCommentsModel()}>Close</button>
            </Box>
        </Modal>
    )
}

export default CommentsModel