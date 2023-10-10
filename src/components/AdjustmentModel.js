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

const AdjustmentModel = ({
    openAdjustment,
    adjustedObjectIndex,
    handleCloseAdjustmentModel,
    adjustedInvestment,
    adjustedComments,
    setAdjustedInvestment,
    setAdjustedComments,
    adjustedObject,
    transactions,
    setTransactions
}) => {
    const handleSubmitAdjustment = () => {
        const updatedData = [...transactions];
        if (adjustedInvestment === adjustedObject.investment) {
            handleCloseAdjustmentModel()
            if (updatedData[adjustedObjectIndex].adjustedComments) {
                updatedData[adjustedObjectIndex].adjustedInvestment = adjustedInvestment;
                updatedData[adjustedObjectIndex].adjustedComments = ""
                setTransactions(updatedData)
                handleCloseAdjustmentModel()
            }

        }
        else {
            if (adjustedComments.length === 0) {
                alert("Investment Was Adjusted , Please Comment your reason")
            }
            else {
                updatedData[adjustedObjectIndex].adjustedInvestment = adjustedInvestment;
                updatedData[adjustedObjectIndex].adjustedComments = adjustedComments
                setTransactions(updatedData)
                handleCloseAdjustmentModel()
            }
        }
    }


    return (
        <Modal
            open={openAdjustment}
            onClose={handleCloseAdjustmentModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <h3 style={{ textAlign: "center" }}>Adjustment Model</h3>
                <br />
                <div style={{ display: "flex" }}>
                    <h5>Adjusted Invesment</h5> :<input type='number' inputMode="numeric" value={adjustedInvestment} onChange={(e) => setAdjustedInvestment(e.target.value)} />
                </div>
                <br />
                <div style={{ display: "flex" }}>
                    <h5>Adjusted Comments</h5> :<input type="text" value={adjustedComments} onChange={(e) => setAdjustedComments(e.target.value)} />
                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button onClick={handleSubmitAdjustment}>Submit</button>
                </div>

            </Box>
        </Modal>
    )
}

export default AdjustmentModel