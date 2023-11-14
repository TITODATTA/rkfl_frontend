import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { handleGetCombinedTransactionAccountant } from '../apis/transactionApi';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'auto',
    p: 2
};

const PastDataModel = ({
    openPastData,
    handleClosePastDataModel,
    plants,
    financialYears,
}) => {
    const containerStyle = {
        // display: 'flex',
        justifyContent: 'space-between',
        width: '400px', // Adjust the width as needed
    };

    const inputGroupStyle = {
        flex: '1',
        marginRight: '10px', // Adjust the spacing between name and input/select fields
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '5px',
        boxSizing: 'border-box',
    };

    const [year, setYear] = useState(financialYears[0]?.financialYear.toString())
    const [plant, setPlant] = useState(plants[0])
    const [type, setType] = useState("provisional")
    const [mainSection, setMainSection] = useState("")

    const handleChangeFunction = (e, setValue) => {
        setValue(e.target.value)
    }

    return (
        <Modal
            open={openPastData}
            onClose={handleClosePastDataModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <h4 style={{ textAlign: "center" }}>Download Past Data</h4>
                <div style={containerStyle}>
                    <div style={inputGroupStyle}>
                        <label htmlFor="name">Financial Year:</label>
                        <select style={inputStyle} onChange={(e) => { handleChangeFunction(e, setYear) }}>
                            {financialYears.map((year) => (
                                <option value={year.financialYear}>{year.financialYear}</option>
                            ))}
                        </select>
                    </div>

                    <div style={inputGroupStyle}>
                        <label htmlFor="country">Plant:</label>
                        <select style={inputStyle} onChange={(e) => { handleChangeFunction(e, setPlant) }}>
                            {plants.map((plant) => (
                                <option value={plant}>{plant}</option>
                            ))}
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div style={inputGroupStyle}>
                        <label htmlFor="country">Invesment Type:</label>
                        <select style={inputStyle} onChange={(e) => { handleChangeFunction(e, setType) }}>
                            <option value="provisional" selected>Provisional</option>
                            <option value="actual">Actual</option>
                        </select>
                    </div>
                    <div style={inputGroupStyle}>
                        <label htmlFor="country">Main Section:</label>
                        <select style={inputStyle} value={mainSection} onChange={(e) => { handleChangeFunction(e, setMainSection) }}>
                            <option value="" selected>All</option>
                            <option value="Section 80C">Section 80C</option>
                            <option value="Section 80D">Section 80D</option>
                            <option value="Section 10">Section 10</option>
                            <option value="Section 24">Section 24</option>
                        </select>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button style={{ marginTop: "10px" }} onClick={() => { handleGetCombinedTransactionAccountant(plant, year, type, mainSection) }}> Download CSV</button>
                </div>

            </Box>
        </Modal>
    )
}

export default PastDataModel