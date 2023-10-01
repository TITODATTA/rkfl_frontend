import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { modalStyle, handleCloseEditModal, handleFileChange, handleFileRemove, handleChangeInputFileds, handleEdit } from "../utils/editModalFunctions"
import css from '../styles/editModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { uploadFile, deleteFile } from '../apis/fileUpload';
import { url } from '../utils/constants';

const EditModal = ({
    editModal,
    setEditModal,
    mainSection,
    editIndex,
    array80C,
    setArray80C,
    array80D,
    setArray80D,
    array10,
    setArray10,
    array24,
    setArray24,
    array80CCD,
    setArray80CCD,
    setError,
    setErrorMessage,
    setSuccess,
    setSuccessMessage,
}) => {


    const [subSectionValue, setSubSectionValue] = useState("")
    const [subSectionCode, setSubSectionCode] = useState("")
    const [name, setName] = useState("")
    const [relation, setRelation] = useState("")
    const [policy, setPolicy] = useState("")
    const [investment, setInvestment] = useState(null)
    const [pan, setPan] = useState("")
    const [address, setAddress] = useState("")
    const [name1, setName1] = useState("")
    const [cityCategory, setCityCategory] = useState("")
    const [file, setFile] = useState([])
    const [propertyType, setPropertyType] = useState("")
    const [eligible80EEA, setEligible80EEA] = useState("")
    const [possession, setPossession] = useState("")
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [type, setType] = useState("")
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;

    useEffect(() => {
        if (editModal) {
            if (mainSection === "Section 80C") {
                setSubSectionCode(array80C[editIndex]?.subSectionCode)
                setSubSectionValue(array80C[editIndex]?.subSection)
                setName(array80C[editIndex]?.nameOfAssured)
                setRelation(array80C[editIndex]?.relation)
                setPolicy(array80C[editIndex]?.policyNo)
                setInvestment(array80C[editIndex]?.investment)
                setFile(array80C[editIndex]?.file)
                setType(array80C[editIndex]?.investmentSchedule)
                if (array80C[editIndex]?.file.length !== 0) {
                    setIsFileUploaded(true)
                }
            }
            else if (mainSection === "Section 80D") {
                setSubSectionCode(array80D[editIndex]?.subSectionCode)
                setSubSectionValue(array80D[editIndex]?.subSection)
                setName(array80D[editIndex]?.nameOfAssured)
                setRelation(array80D[editIndex]?.relation)
                setPolicy(array80D[editIndex]?.policyNo)
                setInvestment(array80D[editIndex]?.investment)
                setFile(array80D[editIndex]?.file)
                setType(array80D[editIndex]?.investmentSchedule)
                if (array80D[editIndex]?.file.length !== 0) {
                    setIsFileUploaded(true)
                }
            }
            else if (mainSection === "Section 10") {
                setSubSectionCode(array10[editIndex]?.subSectionCode)
                setSubSectionValue(array10[editIndex]?.subSection)
                setName(array10[editIndex]?.nameOfAssured)
                setRelation(array10[editIndex]?.relation)
                setPolicy(array10[editIndex]?.policyNo)
                setInvestment(array10[editIndex]?.investment)
                setPan(array10[editIndex]?.pan)
                setName1(array10[editIndex]?.landLoardName)
                setAddress(array10[editIndex]?.landLoardAddress)
                setFile(array10[editIndex]?.file)
                setType(array10[editIndex]?.investmentSchedule)
                setCityCategory(array10[editIndex]?.cityCategory)
                if (array10[editIndex]?.file.length !== 0) {
                    setIsFileUploaded(true)
                }
            }
            else if (mainSection === "Section 24") {
                setSubSectionCode(array24[editIndex]?.subSectionCode)
                setSubSectionValue(array24[editIndex]?.subSection)
                setName(array24[editIndex]?.nameOfAssured)
                setRelation(array24[editIndex]?.relation)
                setPolicy(array24[editIndex]?.policyNo)
                setInvestment(array24[editIndex]?.investment)
                setPan(array24[editIndex]?.pan)
                setName1(array24[editIndex]?.landLoardName)
                setAddress(array24[editIndex]?.landLoardAddress)
                setFile(array24[editIndex]?.file)
                setType(array24[editIndex]?.investmentSchedule)
                setPropertyType(array24[editIndex]?.propertyType)
                setEligible80EEA(array24[editIndex]?.eligible80EEA)
                setPossession(array24[editIndex]?.possession)
                if (array24[editIndex]?.file.length !== 0) {
                    setIsFileUploaded(true)
                }
            }
            else {
                setSubSectionCode(array80CCD[editIndex]?.subSectionCode)
                setSubSectionValue(array80CCD[editIndex]?.subSection)
                setName(array80CCD[editIndex]?.nameOfAssured)
                setRelation(array80CCD[editIndex]?.relation)
                setPolicy(array80CCD[editIndex]?.policyNo)
                setInvestment(array80CCD[editIndex]?.investment)
                setFile(array80CCD[editIndex]?.file)
                setType(array80CCD[editIndex]?.investmentSchedule)
                if (array80CCD[editIndex]?.file.length !== 0) {
                    setIsFileUploaded(true)
                }
            }
        }
    }, [editModal])

    console.log(eligible80EEA)

    return (
        <Modal
            open={editModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <div className={css.edit_container}>
                    <h4>Edit your Entry
                        <br />
                        <span className={css.editSpan}>* Note :If You Nothing to edit ,just click on submit.*</span>
                    </h4>

                    <div className={css.edit_info}>
                        <h5>Name of Assured</h5>
                        <input type="text" value={name} onChange={(e) => handleChangeInputFileds(e, setName)} />
                    </div>
                    <div className={css.edit_info1}>
                        <h5>Relation</h5>
                        <select value={relation} onChange={(e) => handleChangeInputFileds(e, setRelation)}>
                            <option value="Self">Self</option>
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Sister">Sister</option>
                            <option value="Son">Son</option>
                        </select>
                    </div>
                    <div className={css.edit_info}>
                        <h5>Policy No/ Bill No/ Document No.</h5>
                        <input type="text" value={policy} onChange={(e) => handleChangeInputFileds(e, setPolicy)} />
                    </div>
                    <div className={css.edit_info}>
                        <h5>Investment amount during the Year</h5>
                        <input type="text" value={investment} onChange={(e) => handleChangeInputFileds(e, setInvestment)} />
                    </div>
                    {mainSection === "Section 10" &&
                        <>
                            <div className={css.edit_info}>
                                <h5 >City Category</h5>
                                <select value={cityCategory} onChange={(e) => handleChangeInputFileds(e, setCityCategory)}>
                                    <option value="">Non Metro</option>
                                    <option value="1">Metro</option>
                                </select>
                                {/* {subSectionCode === "13A" ? <input type="text" value={cityCategory} onChange={(e) => handleChangeInputFileds(e, setCityCategory)} />
                                    : <input type="text" disabled />} */}
                            </div>
                            <div className={css.edit_info}>
                                <h5>PAN of Landlord</h5>
                                {subSectionCode === "13A" ? <input type="text" value={pan} onChange={(e) => handleChangeInputFileds(e, setPan)} />
                                    : <input type="text" disabled />}

                            </div>
                            <div className={css.edit_info}>
                                <h5>Name of Landlord</h5>
                                {subSectionCode === "13A" ? <input type="text" value={name1} onChange={(e) => handleChangeInputFileds(e, setName1)} />
                                    : <input type="text" disabled />}
                            </div>
                            <div className={css.edit_info}>
                                <h5>Address of Landlord</h5>
                                {subSectionCode === "13A" ?
                                    <input type="text" value={address} onChange={(e) => handleChangeInputFileds(e, setAddress)} />
                                    : <input type="text" disabled />}
                            </div>
                        </>}
                    {mainSection === "Section 24" &&
                        <>
                            <div className={css.edit_info}>
                                <h5>Property Type</h5>
                                <select value={propertyType} onChange={(e) => handleChangeInputFileds(e, setPropertyType)}
                                >
                                    <option value="1">Self-occupied/Deemed Self occupied/Under Construction</option>
                                    <option value="2" >Partly Let out House Property</option>
                                    <option value="3" >Wholly Let out House Property</option>
                                </select>
                            </div>
                            <div className={css.edit_info}>
                                <h5>Eligible 80EEA</h5>
                                <input
                                    onChange={() => setEligible80EEA(eligible80EEA === 'X' ? "" : 'X')}
                                    type="checkbox"
                                    className={css.custom_checkbox}
                                    checked={eligible80EEA === 'X'} // Check the checkbox if propertyType is 'X'
                                />
                            </div>
                            <div className={css.edit_info}>
                                <h5>Possession Obtained</h5>
                                <select value={possession} onChange={(e) => handleChangeInputFileds(e, setPossession)}
                                >
                                    <option value="">None</option>
                                    <option value="1" >Yes</option>
                                    <option value="2" >No</option>
                                </select>
                            </div>
                            <div className={css.edit_info}>
                                <h5>Name of Financial Institute of Homeloan Lender</h5>
                                <input type="text" value={name1} onChange={(e) => handleChangeInputFileds(e, setName1)} />
                            </div>
                            <div className={css.edit_info}>
                                <h5>Address of Homeloan Lender</h5>
                                <input type="text" value={address} onChange={(e) => handleChangeInputFileds(e, setAddress)} />
                            </div>
                        </>}

                    <div className={css.edit_info2}>
                        <h5>Evidence Document
                            (JPJ / PDF)</h5>

                        {file.length === 0 && (
                            <input
                                type="file"
                                className={css.inputFile}
                                accept=".jpg,.jpeg,.png,.pdf"
                                onChange={(e) => uploadFile(e.target.files[0], setFile, setSuccess, setSuccessMessage, setError, setErrorMessage)}
                            />
                        )}


                        {/* Display the uploaded file and a button to remove/change it */}
                        {file.length !== 0 && (
                            <div className={css.imageInfo}>
                                {file.map((item, index) => (
                                    <div>
                                        <a href={`${url}/file/${item.file}`} target="_blank" rel="noopener noreferrer">
                                            View Uploaded File {index + 1}
                                        </a>
                                        <IconButton onClick={() => deleteFile(item, index, file, setFile, setSuccess, setSuccessMessage, setError, setErrorMessage)}>
                                            <CloseIcon fontSize='small' />
                                        </IconButton>
                                    </div>
                                ))}
                                <label className={css.customFileInput}>
                                    Upload More
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        multiple
                                        onChange={(e) => uploadFile(e.target.files[0], setFile, setSuccess, setSuccessMessage, setError, setErrorMessage)}
                                    />
                                </label>
                            </div>

                        )}
                    </div>
                    <div className={css.button_container}>
                        <button style={{ backgroundColor: "lightgreen" }}
                            onClick={() =>
                                handleEdit(
                                    type,
                                    mainSection,
                                    editIndex,
                                    name,
                                    investment,
                                    pan,
                                    address,
                                    name1,
                                    file,
                                    cityCategory,
                                    propertyType,
                                    eligible80EEA,
                                    possession,
                                    policy,
                                    relation,
                                    subSectionCode,
                                    subSectionValue,
                                    array80C,
                                    array80D,
                                    array10,
                                    array24,
                                    array80CCD,
                                    alphanumericPattern,
                                    setEditModal,
                                    setName,
                                    setName1,
                                    setPan,
                                    setAddress,
                                    setPolicy,
                                    setInvestment,
                                    setRelation,
                                    setFile,
                                    setCityCategory,
                                    setSubSectionCode,
                                    setSubSectionValue,
                                    setIsFileUploaded,
                                    setArray80C,
                                    setArray80D,
                                    setArray10,
                                    setArray24,
                                    setArray80CCD,
                                    setError,
                                    setErrorMessage,
                                )}>
                            Submit</button>
                        {/* <button onClick={() => handleCloseEditModal(
                            setEditModal,
                            setSubSectionValue,
                            setSubSectionCode,
                            setName,
                            setRelation,
                            setPolicy,
                            setInvestment,
                            setFile,
                            setPan,
                            setName1,
                            setAddress,
                            setIsFileUploaded,
                        )}>Cancel</button> */}
                    </div>
                </div>
            </Box>
        </Modal >
    )
}

export default EditModal