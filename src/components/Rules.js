import React from 'react'
import css from "../styles/rules.module.css"
import { Add, Delete, Edit, Loop, PlusOne } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const Rules = ({ selectedOption }) => {
    return (
        <div className={css.main_container}>
            <h3>Instructions To Follow</h3>
            <h4>1)Choose the <span style={{ color: "blue" }}>Main Section</span> Dropdown to view/edit/delete your entries</h4>
            <h4>2)Details Marked with <span style={{ color: "red" }}>*</span> are mandatory fields</h4>
            <h4>
                3) Press <span style={{ color: "blue" }}>"Submit Your {selectedOption} Data"</span> positively before logging out or exiting from the page otherwise your investment data will not be saved
            </h4>
            <h4>
                4) In Section 10 for <span style={{ color: "blue" }}>"House Rent Allowance"</span> if your investment amount per month is more than Rs 8333, then <span style={{ color: "red" }}>Pan,Name,Address of Landlord</span> is <span style={{ color: "red" }}>mandatory</span>.
            </h4>
            <h4>Mutiple Files can be uploaded for a single investment by clicking on upload more in the edit </h4>
            {selectedOption === "actual" && <>
                <h4> To upload files , click on edit option , and choose the button "Choose File".</h4>
                <h4>Mutiple Files can be uploaded for a single investment by clicking on upload more in the edit option</h4>
                <h4> File needs to have a correct format "EmployeeCode(In Number)_FileName(text)"</h4>
                <h4> File Size needs to below 200kb</h4>
                <h4> Conversion Process needs to carried out for all sections and investments</h4>
                <h4>After conversion, you cannot edit or  delete the provisional entry .</h4>
                <h4>After Final subbmission you can add entries ,but cant edit or delete</h4>
                <h4> To check click the Actual Radio Button , for verification/edit/delete</h4>
            </>}

            <h4>
                Symbols :
                <IconButton><Add fontSize='small' /></IconButton>(Add)
                <IconButton><Edit fontSize='small' /></IconButton>(Edit)
                <IconButton><Delete fontSize='small' /></IconButton>(Delete)
                {selectedOption === "actual" && <><IconButton><Loop fontSize='small' /></IconButton>(Provisional To Actual)</>}
            </h4>
            <h1></h1>
        </div>
    )
}

export default Rules