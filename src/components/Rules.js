import React from 'react'
import css from "../styles/rules.module.css"
import { Add, Delete, Edit, Error, Loop } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';

const Rules = ({ selectedOption }) => {
    return (
        <div className={css.main_container}>
            <h3>Instructions To Follow</h3>
            <h5>1)Choose the <span style={{ color: "blue" }}>Main Section</span> Dropdown to View/Edit/Delete your investment</h5>
            <h5>2)Fill up the <span style={{ color: "red" }}>Contact Details for Accountant Communication</span> before filling up the form</h5>
            <h5>3)Details Marked with <span style={{ color: "red" }}>*</span> are mandatory fields</h5>
            <h5>4)Press <span style={{ color: "blue" }}>"Submit your {selectedOption} Data"</span> positively before logging out or exiting from the page otherwise your investment data will not be saved</h5>
            <h5>5)In Section 10 for <span style={{ color: "blue" }}>"House Rent Allowance"</span> if your investment amount per month is<span style={{ color: "red" }}> more than Rs 8333</span> , then <span style={{ color: "red" }}>Pan,Pan Photocopy(During Actual),Name,Address of Landlord</span> is <span style={{ color: "red" }}>mandatory</span>.</h5>
            <h5>6)In Section 24 for <span style={{ color: "blue" }}>"Home Loan Interest"</span><span style={{ color: "red" }}></span><span style={{ color: "red" }}>Pan,Name,Address of Financial Institution</span> is <span style={{ color: "red" }}>mandatory</span>.</h5>
            <h5>7)If something was <span style={{ color: "blue" }}>Edited</span> remember to submit the data by clicking "Submit" , otherwise changes wont be saved.</h5>
            {selectedOption === "provisional" &&
                <>
                    <h5>8)Mutiple Files can be uploaded for a single investment by clicking on Upload more in the Edit Mode or in the table while adding a investment </h5>
                    <h5>9)<span style={{ color: "blue" }}>File Name</span> needs to have a correct format :- <span style={{ color: "blue" }}>"EmployeeCode(In Number)_FileName(text)"</span></h5>
                    <h5>10)<span style={{ color: "blue" }}>File Size</span> needs to below <span style={{ color: "blue" }}>300KB</span></h5>
                </>
            }
            {selectedOption === "actual" && <>
                <h5>8)To upload files , click on edit option , and choose the button "Choose File".</h5>
                <h5>9)Mutiple Files can be uploaded for a single investment by clicking on upload more in the edit option</h5>
                <h5>10)<span style={{ color: "blue" }}>File Name</span> needs to have a correct format :- <span style={{ color: "blue" }}>"EmployeeCode(In Number)_FileName(text)"</span></h5>
                <h5>11)<span style={{ color: "blue" }}>File Size</span> needs to below <span style={{ color: "blue" }}>300KB</span></h5>
                <h5>12)<span style={{ color: "blue" }}>Conversion Process</span> needs to carried out for all sections and investments</h5>
                <h5>13)<span style={{ color: "blue" }}>After conversion,</span> you cannot edit or delete the provisional entry .</h5>
                <h5>14)<span style={{ color: "blue" }}>After Final submission</span> you can add entries ,but cannot edit or delete</h5>
                <h5>16)To check click the Actual Radio Button , for verification/edit/delete</h5>
            </>}

            <h5>
                {selectedOption === "provisional" ? "11" : "16"})Symbols :
                <IconButton><Add fontSize='small' /></IconButton>(Add)
                <IconButton><Edit fontSize='small' /></IconButton>(Edit)
                <IconButton><Delete fontSize='small' /></IconButton>(Delete)
                {selectedOption === "actual" &&
                    <>
                        <IconButton><Loop fontSize='small' /></IconButton>(Provisional To Actual Conversion)
                    </>}
            </h5>
            {selectedOption === "actual" &&
                <h5>
                    <IconButton><Error sx={{ color: 'red' }} fontSize='small' /></IconButton> :
                    Denotes that the Invesment Entry <span style={{ color: "red" }}>Rejected</span>  , click on it to view the comments by the accountant.
                    For Correction , Edit the Entry, and then click on the <IconButton><CheckIcon /></IconButton> to resubmit the entry.
                </h5>}

            <h1></h1>
        </div>
    )
}

export default Rules