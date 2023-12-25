import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import css from '../styles/empReviewModal.module.css';
import { handleCreateOrUpdateTransaction } from '../apis/transactionApi';

const EmployeeReviewModal = ({
    reviewModal,
    selectedOption,
    handleCloseReviewModal,
    array80C,
    array80D,
    array10,
    array24,
    array80CCD,
    setSuccess,
    setSuccessMessage,
}) => {
    const [display80C, setDisplay80C] = useState([])
    const [display80D, setDisplay80D] = useState([])
    const [display10, setDisplay10] = useState([])
    const [display24, setDisplay24] = useState([])
    const [display80CCD, setDisplay80CCD] = useState([])
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        maxHeight: "80%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        overflowY: 'auto',
        p: 4,
    };
    useEffect(() => {
        if (reviewModal) {
            if (selectedOption === "actual") {
                setDisplay80C(array80C.filter((item) => item.investmentSchedule === "actual" && !item.actualSubmission));
                setDisplay80D(array80D.filter((item) => item.investmentSchedule === "actual" && !item.actualSubmission));
                setDisplay10(array10.filter((item) => item.investmentSchedule === "actual" && !item.actualSubmission));
                setDisplay24(array24.filter((item) => item.investmentSchedule === "actual" && !item.actualSubmission));
                setDisplay80CCD(array80CCD.filter((item) => item.investmentSchedule === "actual" && !item.actualSubmission));
            }
            if (selectedOption === "provisional") {
                setDisplay80C(array80C.filter((item) => item.investmentSchedule === "provisional" && !item.isConverted));
                setDisplay80D(array80D.filter((item) => item.investmentSchedule === "provisional" && !item.isConverted));
                setDisplay10(array10.filter((item) => item.investmentSchedule === "provisional" && !item.isConverted));
                setDisplay24(array24.filter((item) => item.investmentSchedule === "provisional" && !item.isConverted));
                setDisplay80CCD(array80CCD.filter((item) => item.investmentSchedule === "provisional" && !item.isConverted));
            }
            else {
                return;
            }
        }

    }, [reviewModal])
    return (
        <Modal
            open={reviewModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {selectedOption === "provisional" ? <Box sx={modalStyle}>
                <h4 style={{ textAlign: "center" }}>Review Your Provisional Invesment Details Before Submitting</h4>
                {display80C?.length !== 0 && <div className={css.table_container}>
                    <h5>Section 80C</h5>
                    <table className={css.table}>
                        <thead>
                            <tr>
                                <th>Sub Section</th>
                                <th>S.No</th>
                                <th>Name of Assured</th>
                                <th>Relation</th>
                                <th>Policy No/ Bill No/ Document No.</th>
                                <th>Investment amount during the Year</th>
                                <th>Evidence Document (JPJ / PDF)</th>

                            </tr>
                        </thead>
                        {display80C?.map((item, index) => (
                            <tbody>
                                <td>{item.subSection}</td>
                                <td>{index + 1}</td>
                                <td>{item.nameOfAssured}</td>
                                <td>{item.relation}</td>
                                <td>{item.policyNo}</td>
                                <td>Rs {item.investment}</td>
                                <td>  {item.file.length} files</td>
                            </tbody>
                        ))}
                    </table>
                </div>}
                {display80D?.length !== 0 && <div className={css.table_container}>
                    <h5>Section 80D</h5>
                    <table className={css.table}>
                        <thead>
                            <tr>
                                <th>Sub Section</th>
                                <th>S.No</th>
                                <th>Name of Assured</th>
                                <th>Relation</th>
                                <th>Policy No/ Bill No/ Document No.</th>
                                <th>Investment amount during the Year</th>
                                <th>Evidence Document (JPJ / PDF)</th>

                            </tr>
                        </thead>
                        {display80D?.map((item, index) => (
                            <tbody>
                                <td>{item.subSection}</td>
                                <td>{index + 1}</td>
                                <td>{item.nameOfAssured}</td>
                                <td>{item.relation}</td>
                                <td>{item.policyNo}</td>
                                <td>Rs {item.investment}</td>
                                <td>  {item.file.length} files</td>
                            </tbody>
                        ))}
                    </table>
                </div>}
                {display10?.length !== 0 && <div className={css.table_container}>
                    <h5>Section 10</h5>
                    <table className={css.table}>
                        <thead>
                            <tr>
                                <th>Sub Section</th>
                                <th>S.No</th>
                                <th>Name of Assured</th>
                                <th>Relation</th>
                                <th>Policy No/ Bill No/ Document No.</th>
                                <th>Investment amount during the Year</th>
                                <th>PAN of Landlord</th>
                                <th>Name of Landlord</th>
                                <th>Address of Landlord</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Date of Birth</th>
                                <th>Child Allowance</th>
                                <th>Evidence Document (JPJ / PDF)</th>

                            </tr>
                        </thead>
                        {display10?.map((item, index) => (
                            <tbody>
                                <td>{item.subSection}</td>
                                <td>{index + 1}</td>
                                <td>{item.nameOfAssured}</td>
                                <td>{item.relation}</td>
                                <td>{item.policyNo}</td>
                                <td>Rs {item.investment}</td>
                                <td>{item.pan}</td>
                                <td>{item.landLoardName}</td>
                                <td>{item.landLoardAddress}</td>
                                <td>{item?.firstName}</td>
                                <td>{item?.lastName}</td>
                                <td>{item.gender ? (item.gender === "1" ? "Male" : "Female") : ""}</td>
                                <td>{item?.dob}</td>
                                <td>{item.childAllowance}</td>
                                <td>  {item.file.length} files</td>
                            </tbody>
                        ))}
                    </table>
                </div>}
                {display24?.length !== 0 && <div className={css.table_container}>
                    <h5>Section 24</h5>
                    <table className={css.table}>
                        <thead>
                            <tr>
                                <th>Sub Section</th>
                                <th>S.No</th>
                                <th>Name of Assured</th>
                                <th>Relation</th>
                                <th>Policy No/ Bill No/ Document No.</th>
                                <th>Investment amount during the Year</th>
                                <th>PAN of Financial Institute of Homeloan Lender</th>
                                <th>Name of Financial Institute of Homeloan Lender</th>
                                <th>Address of Homeloan Lender</th>
                                <th>Evidence Document (JPJ / PDF)</th>

                            </tr>
                        </thead>
                        {display24?.map((item, index) => (
                            <tbody>
                                <td>{item.subSection}</td>
                                <td>{index + 1}</td>
                                <td>{item.nameOfAssured}</td>
                                <td>{item.relation}</td>
                                <td>{item.policyNo}</td>
                                <td>Rs {item.investment}</td>
                                <td>{item.pan}</td>
                                <td>{item.landLoardName}</td>
                                <td>{item.landLoardAddress}</td>
                                <td>  {item.file.length} files</td>
                            </tbody>
                        ))}
                    </table>
                </div>}
                {display80CCD?.length !== 0 && <div className={css.table_container}>
                    <h5>Section 80CCD</h5>
                    <table className={css.table}>
                        <thead>
                            <tr>
                                <th>Sub Section</th>
                                <th>S.No</th>
                                <th>Name of Assured</th>
                                <th>Relation</th>
                                <th>Policy No/ Bill No/ Document No.</th>
                                <th>Investment amount during the Year</th>
                                <th>Evidence Document (JPJ / PDF)</th>

                            </tr>
                        </thead>
                        {display80CCD?.map((item, index) => (
                            <tbody>
                                <td>{item.subSection}</td>
                                <td>{index + 1}</td>
                                <td>{item.nameOfAssured}</td>
                                <td>{item.relation}</td>
                                <td>{item.policyNo}</td>
                                <td>Rs {item.investment}</td>
                                <td>  {item.file.length} files</td>
                            </tbody>
                        ))}
                    </table>
                </div>}
                <div className={css.button_container}>
                    <button style={{ backgroundColor: "lightgreen" }} onClick={() => handleCreateOrUpdateTransaction(array80C, array80D, array10, array24, array80CCD, setSuccess,
                        setSuccessMessage, handleCloseReviewModal)}>Submit</button>
                    <button onClick={() => handleCloseReviewModal()}>Go Back</button>
                </div>
            </Box> :
                <Box sx={modalStyle}>
                    <h4 style={{ textAlign: "center" }}>Review Your Actual Invesment Details Before Submitting</h4>
                    {display80C?.length !== 0 && <div className={css.table_container}>
                        <h5>Section 80C</h5>
                        <table className={css.table}>
                            <thead>
                                <tr>
                                    <th>Sub Section</th>
                                    <th>S.No</th>
                                    <th>Name of Assured</th>
                                    <th>Relation</th>
                                    <th>Policy No/ Bill No/ Document No.</th>
                                    <th>Investment amount during the Year</th>
                                    <th>Evidence Document (JPJ / PDF)</th>

                                </tr>
                            </thead>
                            {display80C?.map((item, index) => (
                                <tbody>
                                    <td>{item.subSection}</td>
                                    <td>{index + 1}</td>
                                    <td>{item.nameOfAssured}</td>
                                    <td>{item.relation}</td>
                                    <td>{item.policyNo}</td>
                                    <td>Rs {item.investment}</td>
                                    <td>  {item.file.length} files</td>
                                </tbody>
                            ))}
                        </table>
                    </div>}
                    {display80D?.length !== 0 && <div className={css.table_container}>
                        <h5>Section 80D</h5>
                        <table className={css.table}>
                            <thead>
                                <tr>
                                    <th>Sub Section</th>
                                    <th>S.No</th>
                                    <th>Name of Assured</th>
                                    <th>Relation</th>
                                    <th>Policy No/ Bill No/ Document No.</th>
                                    <th>Investment amount during the Year</th>
                                    <th>Evidence Document (JPJ / PDF)</th>

                                </tr>
                            </thead>
                            {display80D?.map((item, index) => (
                                <tbody>
                                    <td>{item.subSection}</td>
                                    <td>{index + 1}</td>
                                    <td>{item.nameOfAssured}</td>
                                    <td>{item.relation}</td>
                                    <td>{item.policyNo}</td>
                                    <td>Rs {item.investment}</td>
                                    <td>  {item.file.length} files</td>
                                </tbody>
                            ))}
                        </table>
                    </div>}
                    {display10?.length !== 0 && <div className={css.table_container}>
                        <h5>Section 10</h5>
                        <table className={css.table}>
                            <thead>
                                <tr>
                                    <th>Sub Section</th>
                                    <th>S.No</th>
                                    <th>Name of Assured</th>
                                    <th>Relation</th>
                                    <th>Policy No/ Bill No/ Document No.</th>
                                    <th>Investment amount during the Year</th>
                                    <th>PAN of Landlord</th>
                                    <th>Name of Landlord</th>
                                    <th>Address of Landlord</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                    <th>Child Allowance</th>
                                    <th>Evidence Document (JPJ / PDF)</th>

                                </tr>
                            </thead>
                            {display10?.map((item, index) => (
                                <tbody>
                                    <td>{item.subSection}</td>
                                    <td>{index + 1}</td>
                                    <td>{item.nameOfAssured}</td>
                                    <td>{item.relation}</td>
                                    <td>{item.policyNo}</td>
                                    <td>Rs {item.investment}</td>
                                    <td>{item.pan}</td>
                                    <td>{item.landLoardName}</td>
                                    <td>{item.landLoardAddress}</td>
                                    <td>{item?.firstName}</td>
                                    <td>{item?.lastName}</td>
                                    <td>{item.gender ? (item.gender === "1" ? "Male" : "Female") : ""}</td>
                                    <td>{item?.dob}</td>
                                    <td>{item.childAllowance}</td>
                                    <td>  {item.file.length} files</td>
                                </tbody>
                            ))}
                        </table>
                    </div>}
                    {display24?.length !== 0 && <div className={css.table_container}>
                        <h5>Section 24</h5>
                        <table className={css.table}>
                            <thead>
                                <tr>
                                    <th>Sub Section</th>
                                    <th>S.No</th>
                                    <th>Name of Assured</th>
                                    <th>Relation</th>
                                    <th>Policy No/ Bill No/ Document No.</th>
                                    <th>Investment amount during the Year</th>
                                    <th>PAN of Financial Institute of Homeloan Lender</th>
                                    <th>Name of Financial Institute of Homeloan Lender</th>
                                    <th>Address of Homeloan Lender</th>
                                    <th>Evidence Document (JPJ / PDF)</th>

                                </tr>
                            </thead>
                            {display24?.map((item, index) => (
                                <tbody>
                                    <td>{item.subSection}</td>
                                    <td>{index + 1}</td>
                                    <td>{item.nameOfAssured}</td>
                                    <td>{item.relation}</td>
                                    <td>{item.policyNo}</td>
                                    <td>Rs {item.investment}</td>
                                    <td>{item.pan}</td>
                                    <td>{item.landLoardName}</td>
                                    <td>{item.landLoardAddress}</td>
                                    <td>  {item.file.length} files</td>
                                </tbody>
                            ))}
                        </table>
                    </div>}
                    {display80CCD?.length !== 0 && <div className={css.table_container}>
                        <h5>Section 80CCD</h5>
                        <table className={css.table}>
                            <thead>
                                <tr>
                                    <th>Sub Section</th>
                                    <th>S.No</th>
                                    <th>Name of Assured</th>
                                    <th>Relation</th>
                                    <th>Policy No/ Bill No/ Document No.</th>
                                    <th>Investment amount during the Year</th>
                                    <th>Evidence Document (JPJ / PDF)</th>

                                </tr>
                            </thead>
                            {display80CCD?.map((item, index) => (
                                <tbody>
                                    <td>{item.subSection}</td>
                                    <td>{index + 1}</td>
                                    <td>{item.nameOfAssured}</td>
                                    <td>{item.relation}</td>
                                    <td>{item.policyNo}</td>
                                    <td>Rs {item.investment}</td>
                                    <td>  {item.file.length} files</td>
                                </tbody>
                            ))}
                        </table>
                    </div>}
                    <div className={css.button_container}>
                        <button style={{ backgroundColor: "lightgreen" }} onClick={() => handleCreateOrUpdateTransaction(array80C, array80D, array10, array24, array80CCD, setSuccess,
                            setSuccessMessage, handleCloseReviewModal, selectedOption)}>Submit</button>
                        <button onClick={() => handleCloseReviewModal()}>Go Back</button>
                    </div>
                </Box>}
        </Modal>
    )
}

export default EmployeeReviewModal