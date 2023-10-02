import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from '../styles/commentsModel.module.css';

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
                <h4 className={styles.modal_header}>Status: <span style={{ color: "red" }}>{entryStatus}ed</span></h4>
                <h4 className={styles.modal_text}>Accountants Comments: <span style={{ fontWeight: "lighter" }}>{comments}</span></h4>
                <div className={styles.button_container}>
                    <button className={styles.close_button} onClick={() => handleCloseCommentsModel()}>Close</button>
                </div>

            </Box>
        </Modal>
    )
}

export default CommentsModel