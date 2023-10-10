import React, { useEffect, useState } from 'react';
import css from '../styles/mainSectionTable.module.css';
import { IconButton, Tooltip } from '@mui/material';
import { Add, Delete, Edit, Error, Loop } from '@mui/icons-material';
import { handleAddRow, shouldDisplaySubmitButton, handleDeleteRow, handleDeleteRow2, handleDropdownChange, handleSaveData, handleOpenReviewModal, handleCloseReviewModal, handleOpenEditModal, handleActualConversion, handleOpenCommentsModel } from '../utils/mainSectionTableFunction';
import ErrorSnackbar from './ErrorSnackbar';
import SuccessSnackbar from './SuccessSnackbar';
import EmployeeReviewModal from './EmployeeReviewModal';
import { handleGetTransaction, handleUpdateOneTransaction } from '../apis/transactionApi';
import CircularProgress from '@mui/material/CircularProgress';
import EditModal from './EditModal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { uploadFile, deleteFile } from '../apis/fileUpload';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import CommentsModel from './CommentsModel';
import { url } from '../utils/constants';





const MainSectionTable = ({ rows, setRows, subSection, mainSection, selectedOption, openyear, doj, phoneNumber }) => {
    const [subSectionValue, setSubSectionValue] = useState("");
    const [addState, setAddState] = useState(false)
    const [array80C, setArray80C] = useState([])
    const [array80D, setArray80D] = useState([])
    const [array10, setArray10] = useState([])
    const [array24, setArray24] = useState([])
    const [array80CCD, setArray80CCD] = useState([])
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [reviewModal, setReviewModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [viewOption, setViewOption] = useState(selectedOption);
    const [finalActualSubmission, setFinalActualSubmission] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [entryStatus, setEntryStatus] = useState("")
    const [comments, setComments] = useState("")
    const [commentsModel, setCommentsModel] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;
    // const minDate = '2023-01-01'; // Replace with your desired minimum date
    const maxYear = parseInt(openyear) + 1
    const maxDate = `${maxYear}-12-31`
    // const minDate = doj.split('-').reverse().join('-')
    const minDate = `2023-04-01`

    useEffect(() => {
        setIsLoading(true)
        handleGetTransaction(
            setArray80C,
            setArray80D,
            setArray10,
            setArray24,
            setArray80CCD,
            setIsLoading,
            setFinalActualSubmission,
            openyear
        )
    }, [])

    const handleCloseCommentsModel = () => {
        setCommentsModel(false)
        setEntryStatus("")
        setComments("")
    }
    console.log(array10)

    return (
        <>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setViewOption(e.target.value)}
                    value={viewOption}
                >
                    <FormControlLabel value="actual" control={<Radio />} label="Actual" />
                    <FormControlLabel value="provisional" control={<Radio />} label="Provisional" />
                </RadioGroup>
            </FormControl>

            {isLoading ?
                <div className={css.loaderContainer}> <CircularProgress /></div> :
                <div className={css.table_container}>
                    <table className={css.data_table}>
                        <thead>
                            <tr>
                                <th className={css.custom_th}>Sub Section<span style={{ color: "red" }}>(*)</span></th>
                                <th>S.No</th>
                                <th>Name of Assured<span style={{ color: "red" }}>(*)</span></th>
                                <th>Relation<span style={{ color: "red" }}>(*)</span></th>
                                {mainSection === "Section 10" &&
                                    <>
                                        <th>Start Date<span style={{ color: "red" }}>(*)</span></th>
                                        <th>End Date<span style={{ color: "red" }}>(*)</span></th>
                                        <th>Accommodation Type<br /><span style={{ color: "brown" }}>(1:-Rented Accommodation)</span></th>
                                        <th>City Category<br /><span style={{ color: "brown" }}>(1:-Metro,Blank:Non Metro)</span></th>
                                    </>
                                }
                                {mainSection === "Section 24" &&
                                    <>
                                        <th>House Location<span style={{ color: "red" }}>(*)</span></th>
                                        <th>Property Type</th>
                                        <th>Eligible For 80EEA</th>
                                        <th>Possession Obtained</th>
                                    </>
                                }
                                <th>
                                    Policy No/ Bill No/ Document No.
                                    {selectedOption === "actual" && <span style={{ color: "red" }}>(*)</span>}
                                </th>
                                {mainSection === "Section 80C" || mainSection === "Section 80D" ?
                                    <th>
                                        Invesment Payment Date
                                        {selectedOption === "actual" && <span style={{ color: "red" }}>(*)</span>}
                                    </th> : <></>}

                                <th>Investment amount during the {mainSection === "Section 10" ? "Monthly" : "Year"}<span style={{ color: "red" }}>(*)</span></th>
                                {mainSection === "Section 10" &&
                                    <><th>PAN of Landlord</th>
                                        <th>Name of Landlord</th>
                                        <th>Address of Landlord</th></>
                                }
                                {mainSection === "Section 24" &&
                                    <>
                                        <th>PAN of Financial Institute of Homeloan Lender<span style={{ color: "red" }}>(*)</span></th>
                                        <th>Name of Financial Institute of Homeloan Lender<span style={{ color: "red" }}>(*)</span></th>
                                        <th>Address of Homeloan Lender<span style={{ color: "red" }}>(*)</span></th>
                                    </>
                                }
                                <th>Invesment Type</th>
                                <th>Evidence Document
                                    (JPJ / PDF)
                                    {selectedOption === "actual" && <span style={{ color: "red" }}>(*)</span>}
                                </th>
                                <th>Status</th>
                                {viewOption === "actual" &&
                                    <>
                                        <th>Adjusted Invesment By Accountant</th>
                                        <th>Accountant Comments</th>
                                    </>}


                                {/* {viewOption === "actual" &&
                                    <>
                                        <th>Adjusted Investment</th>
                                        <th>Adjusted Comments</th>
                                    </>} */}
                            </tr>
                        </thead>
                        {viewOption === "actual" &&
                            <tbody>
                                {mainSection === "Section 80C" &&
                                    array80C.filter((item) => item.investmentSchedule === viewOption && item.financialyear === openyear).map((item, index) => (
                                        <tr key={index}>
                                            <td className={css.word_break}>
                                                {item.subSection}
                                            </td>
                                            <td className={css.word_break}>
                                                {index + 1}
                                            </td>
                                            <td className={css.word_break}>
                                                {item.nameOfAssured}
                                            </td>
                                            <td className={css.word_break}>
                                                {item.relation}
                                            </td>
                                            <td className={css.word_break}>
                                                {item.policyNo}
                                            </td>
                                            <td className={css.word_break}>
                                                {item.paymentDate}
                                            </td>
                                            <td className={css.word_break}>
                                                {item.investment}
                                            </td>
                                            <td className={css.word_break}>
                                                {item.investmentSchedule}
                                            </td>
                                            <td className={css.word_break}>
                                                You have uploaded  {item.file.length} files
                                            </td>
                                            <td className={css.word_break}>
                                                {item?.status}
                                            </td>
                                            <td className={css.word_break}>
                                                {item?.adjustedInvestment}
                                            </td>
                                            <td className={css.word_break}>
                                                {item?.adjustedComments}
                                            </td>
                                            <td>
                                                {item?.isEdit === true ?
                                                    <IconButton onClick={() => handleOpenCommentsModel(item, setCommentsModel, setEntryStatus, setComments)}>
                                                        <Error sx={{ color: 'red' }} />
                                                    </IconButton> : ""}
                                                {item?.isEdit === true ?
                                                    <IconButton onClick={() => handleOpenEditModal(array80C.indexOf(item), setEditIndex, setEditModal)}>
                                                        <Edit />
                                                    </IconButton> : ""}
                                                {item?.isEdit === true ?
                                                    <IconButton onClick={() => handleUpdateOneTransaction(mainSection, item, setSuccess, setError, setSuccessMessage, setErrorMessage)}>
                                                        <CheckIcon />
                                                    </IconButton> : ""}

                                                {item?.actualSubmission === true ? <>
                                                </> : <>
                                                    <IconButton onClick={() => handleOpenEditModal(array80C.indexOf(item), setEditIndex, setEditModal)}>
                                                        <Edit />
                                                    </IconButton>
                                                    <Tooltip title="Delete the Entry" placement="left" >
                                                        <IconButton onClick={() => handleDeleteRow2(array80C.indexOf(item), mainSection, array80C, setArray80C, array80D,
                                                            setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </Tooltip>
                                                </>}
                                            </td>
                                        </tr>
                                    ))}
                                {mainSection === "Section 80D" && array80D.filter((item) => item.investmentSchedule === viewOption && item.financialyear === openyear).map((item, index) => (
                                    <tr key={index}>
                                        <td className={css.word_break}>
                                            {item.subSection}
                                        </td>
                                        <td className={css.word_break}>
                                            {index + 1}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.nameOfAssured}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.relation}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.policyNo}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.paymentDate}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>
                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
                                        </td>
                                        <td className={css.word_break}>
                                            {item?.status}
                                        </td>
                                        <td>
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleOpenCommentsModel(item, setCommentsModel, setEntryStatus, setComments)}>
                                                    <Error sx={{ color: 'red' }} />
                                                </IconButton> : ""}
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleOpenEditModal(array80D.indexOf(item), setEditIndex, setEditModal)}>
                                                    <Edit />
                                                </IconButton> : ""}
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleUpdateOneTransaction(mainSection, item, setSuccess, setError, setSuccessMessage, setErrorMessage)} >
                                                    <CheckIcon />
                                                </IconButton> : ""}
                                            {item?.actualSubmission === true ? <>
                                            </> : <>
                                                <IconButton onClick={() => handleOpenEditModal(array80D.indexOf(item), setEditIndex, setEditModal)}>
                                                    <Edit />
                                                </IconButton>
                                                <Tooltip title="Delete the Entry" placement="left" >
                                                    <IconButton onClick={() => handleDeleteRow2(array80D.indexOf(item), mainSection, array80C, setArray80C, array80D,
                                                        setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </>}
                                        </td>
                                    </tr>
                                ))}
                                {mainSection === "Section 10" && array10.filter((item) => item.investmentSchedule === viewOption && item.financialyear === openyear).map((item, index) => (
                                    <tr key={index}>
                                        <td className={css.word_break}>
                                            {item.subSection}
                                        </td>
                                        <td className={css.word_break}>
                                            {index + 1}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.nameOfAssured}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.relation}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.startDate}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.endDate}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.accommodationType}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.cityCategory}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.policyNo}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.pan ? item.pan : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.landLoardName ? item.landLoardName : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.landLoardAddress ? item.landLoardAddress : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>
                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
                                        </td>
                                        <td className={css.word_break}>
                                            {item?.status}
                                        </td>
                                        <td>
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleOpenCommentsModel(item, setCommentsModel, setEntryStatus, setComments)}>
                                                    <Error sx={{ color: 'red' }} />
                                                </IconButton> : ""}
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleOpenEditModal(array10.indexOf(item), setEditIndex, setEditModal)}>
                                                    <Edit />
                                                </IconButton> : ""}
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleUpdateOneTransaction(mainSection, item, setSuccess, setError, setSuccessMessage, setErrorMessage)}>
                                                    <CheckIcon />
                                                </IconButton> : ""}
                                            {item?.actualSubmission === true ? <>
                                            </> : <>
                                                <IconButton onClick={() => handleOpenEditModal(array10.indexOf(item), setEditIndex, setEditModal)}>
                                                    <Edit />
                                                </IconButton>
                                                <Tooltip title="Delete the Entry" placement="left" >
                                                    <IconButton onClick={() => handleDeleteRow2(array10.indexOf(item), mainSection, array80C, setArray80C, array80D,
                                                        setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </>}
                                        </td>
                                    </tr>
                                ))}
                                {mainSection === "Section 24" && array24.filter((item) => item.investmentSchedule === viewOption && item.financialyear === openyear).map((item, index) => (
                                    <tr key={index}>
                                        <td className={css.word_break}>
                                            {item.subSection}
                                        </td>
                                        <td className={css.word_break}>
                                            {index + 1}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.nameOfAssured}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.relation}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.city}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.propertyType === "1" && "Self-occupied/Deemed Self occupied/Under Construction"}
                                            {item.propertyType === "2" && "Partly Let out House Property"}
                                            {item.propertyType === "3" && "Wholly Let out House Property"}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.eligible80EEA}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.possession.length === 0 && ""}
                                            {item.possession === "1" && "Yes"}
                                            {item.possession === "2" && "No"}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.policyNo}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.pan ? item.pan : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.landLoardName ? item.landLoardName : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.landLoardAddress ? item.landLoardAddress : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>
                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
                                        </td>
                                        <td className={css.word_break}>
                                            {item?.status}
                                        </td>
                                        <td>
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleOpenCommentsModel(item, setCommentsModel, setEntryStatus, setComments)}>
                                                    <Error sx={{ color: 'red' }} />
                                                </IconButton> : ""}
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleOpenEditModal(array24.indexOf(item), setEditIndex, setEditModal)}>
                                                    <Edit />
                                                </IconButton> : ""}
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleUpdateOneTransaction(mainSection, item, setSuccess, setError, setSuccessMessage, setErrorMessage)}>
                                                    <CheckIcon />
                                                </IconButton> : ""}
                                            {item?.actualSubmission === true ? <>
                                            </> : <>
                                                <IconButton onClick={() => handleOpenEditModal(array24.indexOf(item), setEditIndex, setEditModal)}>
                                                    <Edit />
                                                </IconButton>
                                                <Tooltip title="Delete the Entry" placement="left" >
                                                    <IconButton onClick={() => handleDeleteRow2(array24.indexOf(item), mainSection, array80C, setArray80C, array80D,
                                                        setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </>}
                                        </td>
                                    </tr>
                                ))}
                                {mainSection === "Section 80CCD" && array80CCD.filter((item) => item.investmentSchedule === viewOption && item.financialyear === openyear).map((item, index) => (
                                    <tr key={index}>
                                        <td className={css.word_break} >
                                            {item.subSection}
                                        </td>
                                        <td className={css.word_break}>
                                            {index + 1}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.nameOfAssured}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.relation}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.policyNo}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>
                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
                                        </td>
                                        <td className={css.word_break}>
                                            {item?.status}
                                        </td>
                                        <td>
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleOpenCommentsModel(item, setCommentsModel, setEntryStatus, setComments)}>
                                                    <Error sx={{ color: 'red' }} />
                                                </IconButton> : ""}
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleOpenEditModal(array80CCD.indexOf(item), setEditIndex, setEditModal)}>
                                                    <Edit />
                                                </IconButton> : ""}
                                            {item?.isEdit === true ?
                                                <IconButton onClick={() => handleUpdateOneTransaction(mainSection, item, setSuccess, setError, setSuccessMessage, setErrorMessage)}>
                                                    <CheckIcon />
                                                </IconButton> : ""}
                                            {item?.actualSubmission === true ? <>
                                            </> : <>
                                                <IconButton onClick={() => handleOpenEditModal(array80C.indexOf(item), setEditIndex, setEditModal)}>
                                                    <Edit />
                                                </IconButton>
                                                <Tooltip title="Delete the Entry" placement="left" >
                                                    <IconButton onClick={() => handleDeleteRow2(array80C.indexOf(item), mainSection, array80C, setArray80C, array80D,
                                                        setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </>}
                                        </td>
                                    </tr>
                                ))}
                                {/*  */}
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td contentEditable="true">
                                            <select
                                                className={css.custom_select}
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    const selectedSubSection = e.target.options[e.target.selectedIndex].getAttribute("data-subSection");
                                                    const selectedSubSectionCode = e.target.options[e.target.selectedIndex].getAttribute("data-subSectionCode");
                                                    const selectedInvestmentCode = e.target.options[e.target.selectedIndex].getAttribute("data-investmentCode");
                                                    const selectedDivision = e.target.options[e.target.selectedIndex].getAttribute("data-division")
                                                    rows[index].subSectionValue = selectedSubSectionCode;
                                                    rows[index].subSection = selectedSubSection;
                                                    rows[index].investmentCode = selectedInvestmentCode;
                                                    rows[index].division = selectedDivision;
                                                    rows[index].selectValue = selectedValue
                                                    setRows([...rows])
                                                    handleDropdownChange(e, setSubSectionValue)
                                                }}
                                                value={row.selectValue}
                                            >
                                                <option value="" >Select</option>
                                                {subSection.map((item) => (
                                                    <option
                                                        value={item._id}
                                                        data-subSectionCode={item.subSectionCode}
                                                        data-subSection={item.subSection}
                                                        data-investmentCode={item?.investmentCode || ""}
                                                        data-division={item?.division || ""}
                                                    >
                                                        {item.subSection} ({item.investmentCode ? item?.investmentCode : item?.subSectionCode}  {item?.division})
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className={css.word_break} >

                                        </td>
                                        <td contentEditable="true" className={css.word_break} onChange={(e) => {
                                            const updatedRows = [...rows];
                                            updatedRows[index].nameOfAssured = e.currentTarget.textContent;
                                            setRows(updatedRows);
                                        }}
                                            onBlur={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].nameOfAssured = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                        >
                                            {row.nameOfAssured}
                                        </td>
                                        <td contentEditable="true">
                                            <select
                                                className={css.custom_select}
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    rows[index].relation = selectedValue;
                                                    setRows([...rows])
                                                }}
                                                value={row.relation}
                                            >
                                                <option value="" >Select</option>
                                                <option value="Self">Self</option>
                                                <option value="Parent/Guardian">Parent/Guardian</option>
                                                <option value="Spouse/Partner">Spouse/Partner</option>
                                                <option value="Son/Daughter">Son/Daughter</option>
                                            </select>
                                        </td>
                                        {mainSection === "Section 10" && <td contentEditable="true" className={css.word_break}
                                        >
                                            <input type='date'
                                                className={css.input_date}
                                                min={minDate}
                                                max={maxDate}
                                                onChange={(e) => {
                                                    const updatedRows = [...rows];
                                                    const newValue = e.target.value;
                                                    updatedRows[index].startDate = newValue;
                                                    setRows(updatedRows);
                                                }} />
                                        </td>}
                                        {mainSection === "Section 10" && <td contentEditable="true" className={css.word_break}
                                        >
                                            <input type='date'
                                                className={css.input_date}
                                                min={minDate}
                                                max={maxDate}
                                                onChange={(e) => {
                                                    const updatedRows = [...rows];
                                                    const newValue = e.target.value;
                                                    updatedRows[index].endDate = newValue;
                                                    setRows(updatedRows);
                                                }} />
                                        </td>}
                                        {mainSection === "Section 10" && <>
                                            <td contentEditable>
                                                1
                                            </td>
                                        </>}
                                        {mainSection === "Section 10" && <tr>
                                            <td>
                                                <select
                                                    className={css.custom_select}
                                                    onChange={(e) => {
                                                        const selectedValue = e.target.value;
                                                        rows[index].cityCategory = selectedValue;
                                                        setRows([...rows])
                                                    }}
                                                    value={row.cityCategory}
                                                >
                                                    <option value="" >Non Metro</option>
                                                    <option value="1" >Metro</option>
                                                </select>
                                            </td>

                                        </tr>}
                                        {mainSection === "Section 24" && <>
                                            <td contentEditable="true" className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].city = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].city = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.city}
                                            </td>
                                            <td>
                                                <select
                                                    className={css.custom_select}
                                                    onChange={(e) => {
                                                        const selectedValue = e.target.value;
                                                        rows[index].propertyType = selectedValue;
                                                        setRows([...rows])
                                                    }}
                                                    value={row.propertyType}
                                                >
                                                    <option value="1" >Self-occupied/Deemed Self occupied/Under Construction</option>
                                                    <option value="2" >Partly Let out House Property</option>
                                                    <option value="3" >Wholly Let out House Property</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    className={css.custom_checkbox}
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        rows[index].eligible80EEA = isChecked ? 'X' : ''; // Set 'X' when checked, '' when unchecked
                                                        setRows([...rows]);
                                                    }}
                                                    checked={row.eligible80EEA === 'X'} // Check the checkbox if propertyType is 'X'
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    className={css.custom_select}
                                                    onChange={(e) => {
                                                        const selectedValue = e.target.value;
                                                        rows[index].possession = selectedValue;
                                                        setRows([...rows])
                                                    }}
                                                    value={row.possession}
                                                >
                                                    <option value="" >None</option>
                                                    <option value="1" >Yes</option>
                                                    <option value="2" >No</option>
                                                </select>
                                            </td>

                                        </>}

                                        <td contentEditable="true" className={css.word_break} onChange={(e) => {
                                            const updatedRows = [...rows];
                                            updatedRows[index].policyNo = e.currentTarget.textContent;
                                            setRows(updatedRows);
                                        }}
                                            onBlur={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].policyNo = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                        >
                                            {row.policyNo}
                                        </td>
                                        {mainSection === "Section 80C" || mainSection === "Section 80D" ? <td contentEditable="true" className={css.word_break}
                                        >
                                            <input type='date' className={css.input_date}
                                                onChange={(e) => {
                                                    const updatedRows = [...rows];
                                                    const newValue = e.target.value;
                                                    updatedRows[index].paymentDate = newValue;
                                                    setRows(updatedRows);
                                                }} />
                                        </td> : <></>}
                                        <td contentEditable="true" className={css.word_break} onChange={(e) => {
                                            const updatedRows = [...rows];
                                            updatedRows[index].investment = e.currentTarget.textContent;
                                            setRows(updatedRows);
                                        }}
                                            onBlur={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].investment = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                        >
                                            {row.investment}
                                        </td>

                                        {mainSection === "Section 10" && <>
                                            <td contentEditable={subSectionValue === "13A" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].pan = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].pan = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.pan}
                                            </td>
                                            <td contentEditable={subSectionValue === "13A" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].landLoardName = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].landLoardName = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.landLoardName}
                                            </td>
                                            <td contentEditable={subSectionValue === "13A" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].landLoardAddress = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].landLoardAddress = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.landLoardAddress}
                                            </td>
                                        </>}
                                        {mainSection === "Section 24" && <>
                                            <td contentEditable={subSectionValue === "B" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].pan = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].pan = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.pan}
                                            </td>
                                            <td contentEditable={subSectionValue === "B" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].landLoardName = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].landLoardName = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.landLoardName}
                                            </td>
                                            <td contentEditable={subSectionValue === "B" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].landLoardAddress = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].landLoardAddress = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.landLoardAddress}
                                            </td>
                                        </>}
                                        <td className={css.word_break}>
                                            {selectedOption}
                                        </td>
                                        <td className={css.word_break}>
                                            {uploadLoading ? <CircularProgress size={30} /> : <>
                                                {fileList.length !== 0 ? (
                                                    <>
                                                        {fileList.map((file, index) => (
                                                            <>
                                                                <a href={`${url}/file/${file.file}`} target="_blank" rel="noreferrer">
                                                                    Uploaded  File {index + 1}
                                                                </a>
                                                                <IconButton onClick={() => deleteFile(file, index, fileList, setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage, setUploadLoading)}>
                                                                    <CloseIcon fontSize='small' />
                                                                </IconButton>
                                                                <br />
                                                            </>
                                                        ))}
                                                        <label className={css.customFileInput}>
                                                            upload More
                                                            <input
                                                                type="file"
                                                                multiple
                                                                onChange={(e) => uploadFile(e.target.files[0], setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage, setUploadLoading)}
                                                            />
                                                        </label>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label className={css.customFileInput}>
                                                            Choose a File
                                                            <input
                                                                type="file"
                                                                multiple
                                                                onChange={(e) => uploadFile(e.target.files[0], setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage, setUploadLoading)}
                                                            />
                                                        </label>
                                                    </>
                                                )}
                                            </>}
                                        </td>
                                        <td className={css.word_break}>

                                        </td>
                                        <td className={css.word_break}>

                                        </td>
                                        <td className={css.word_break}>

                                        </td>
                                        <td>
                                            {/* <IconButton onClick={() => handleEditRow(index)}>
                                    <Edit />
                                </IconButton> */}
                                            <Tooltip title="Delete the Entry" placement="left" >
                                                <IconButton onClick={() => handleDeleteRow(index, rows, setRows, setSubSectionValue, setAddState, fileList, setFileList)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>}
                        {viewOption === "provisional" &&
                            <tbody>
                                {mainSection === "Section 80C" && array80C.filter((item) => item.investmentSchedule === viewOption && item.financialyear === openyear).map((item, index) => (
                                    <tr key={index}>
                                        <td className={css.word_break}>
                                            {item.subSection}
                                        </td>
                                        <td className={css.word_break}>
                                            {index + 1}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.nameOfAssured}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.relation}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.policyNo}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.paymentDate}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>
                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
                                        </td>
                                        <td className={css.word_break}>
                                            {item?.status}
                                        </td>
                                        <td>

                                            {
                                                item.investmentSchedule === "provisional"
                                                && selectedOption === "actual"
                                                && !item.isConverted && !finalActualSubmission &&
                                                <IconButton onClick={() => handleActualConversion(array80C.indexOf(item), array80C, setArray80C, setError, setErrorMessage, setSuccess, setSuccessMessage)}>
                                                    <Loop />
                                                </IconButton>
                                            }
                                            {!item.isConverted && !finalActualSubmission && <IconButton onClick={() => handleOpenEditModal(array80C.indexOf(item), setEditIndex, setEditModal)}>
                                                <Edit />
                                            </IconButton>}

                                            {!item.isConverted && !finalActualSubmission && <Tooltip title="Delete the Entry" placement="left" >
                                                <IconButton onClick={() => handleDeleteRow2(array80C.indexOf(item), mainSection, array80C, setArray80C, array80D,
                                                    setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>}

                                        </td>
                                    </tr>
                                ))}
                                {mainSection === "Section 80D" && array80D.filter((item) => item.investmentSchedule === viewOption && item.financialyear === openyear).map((item, index) => (
                                    <tr key={index}>
                                        <td className={css.word_break}>
                                            {item.subSection}
                                        </td>
                                        <td className={css.word_break}>
                                            {index + 1}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.nameOfAssured}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.relation}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.policyNo}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.paymentDate}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>

                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
                                        </td>
                                        <td className={css.word_break}>
                                            {item?.status}
                                        </td>
                                        <td>
                                            {
                                                item.investmentSchedule === "provisional" && selectedOption === "actual" && !item.isConverted && !finalActualSubmission &&
                                                <IconButton onClick={() => handleActualConversion(array80D.indexOf(item), array80D, setArray80D, setError, setErrorMessage, setSuccess, setSuccessMessage)}>
                                                    <Loop />
                                                </IconButton>
                                            }
                                            {!item.isConverted && !finalActualSubmission && <IconButton onClick={() => handleOpenEditModal(array80D.indexOf(item), setEditIndex, setEditModal)}>
                                                <Edit />
                                            </IconButton>}
                                            {!item.isConverted && !finalActualSubmission && <Tooltip title="Delete the Entry" placement="left" >
                                                <IconButton onClick={() => handleDeleteRow2(array80D.indexOf(item), mainSection, array80C, setArray80C, array80D,
                                                    setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>}
                                        </td>
                                    </tr>
                                ))}
                                {mainSection === "Section 10" && array10.filter((item) => item.investmentSchedule === viewOption && item.financialyear === openyear).map((item, index) => (
                                    <tr key={index}>
                                        <td className={css.word_break}>
                                            {item.subSection}
                                        </td>
                                        <td className={css.word_break}>
                                            {index + 1}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.nameOfAssured}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.relation}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.startDate}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.endDate}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.accommodationType}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.cityCategory}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.policyNo}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.pan ? item.pan : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.landLoardName ? item.landLoardName : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.landLoardAddress ? item.landLoardAddress : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>
                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
                                        </td>
                                        <td className={css.word_break}>
                                            {item?.status}
                                        </td>
                                        <td>
                                            {
                                                item.investmentSchedule === "provisional" && selectedOption === "actual" && !item.isConverted && !finalActualSubmission &&
                                                <IconButton onClick={() => handleActualConversion(array10.indexOf(item), array10, setArray10, setError, setErrorMessage, setSuccess, setSuccessMessage)} >
                                                    <Loop />
                                                </IconButton>
                                            }
                                            {!item.isConverted && !finalActualSubmission && <IconButton onClick={() => handleOpenEditModal(array10.indexOf(item), setEditIndex, setEditModal)}>
                                                <Edit />
                                            </IconButton>}
                                            {!item.isConverted && !finalActualSubmission && <Tooltip title="Delete the Entry" placement="left" >
                                                <IconButton onClick={() => handleDeleteRow2(array10.indexOf(item), mainSection, array80C, setArray80C, array80D,
                                                    setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>}
                                        </td>
                                    </tr>
                                ))}
                                {mainSection === "Section 24" && array24.filter((item) => item.investmentSchedule === viewOption && item.financialyear === openyear).map((item, index) => (
                                    <tr key={index}>
                                        <td className={css.word_break}>
                                            {item.subSection}
                                        </td>
                                        <td className={css.word_break}>
                                            {index + 1}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.nameOfAssured}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.relation}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.city}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.propertyType === "1" && "Self-occupied/Deemed Self occupied/Under Construction"}
                                            {item.propertyType === "2" && "Partly Let out House Property"}
                                            {item.propertyType === "3" && "Wholly Let out House Property"}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.eligible80EEA}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.possession.length === 0 && ""}
                                            {item.possession === "1" && "Yes"}
                                            {item.possession === "2" && "No"}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.policyNo}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.pan ? item.pan : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.landLoardName ? item.landLoardName : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.landLoardAddress ? item.landLoardAddress : ""}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>

                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
                                        </td>
                                        <td className={css.word_break}>
                                            {item?.status}
                                        </td>
                                        <td>
                                            {
                                                item.investmentSchedule === "provisional" && selectedOption === "actual" && !item.isConverted && !finalActualSubmission &&
                                                <IconButton onClick={() => handleActualConversion(array24.indexOf(item), array24, setArray24, setError, setErrorMessage, setSuccess, setSuccessMessage)}>
                                                    <Loop />
                                                </IconButton>
                                            }
                                            {!item.isConverted && !finalActualSubmission && <IconButton onClick={() => handleOpenEditModal(array24.indexOf(item), setEditIndex, setEditModal)}>
                                                <Edit />
                                            </IconButton>}
                                            {!item.isConverted && !finalActualSubmission && <Tooltip title="Delete the Entry" placement="left" >
                                                <IconButton onClick={() => handleDeleteRow2(array24.indexOf(item), mainSection, array80C, setArray80C, array80D,
                                                    setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>}
                                        </td>
                                    </tr>
                                ))}
                                {mainSection === "Section 80CCD" && array80CCD.filter((item) => item.investmentSchedule === viewOption && item.financialyear === openyear).map((item, index) => (
                                    <tr key={index}>
                                        <td className={css.word_break} >
                                            {item.subSection}
                                        </td>
                                        <td className={css.word_break}>
                                            {index + 1}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.nameOfAssured}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.relation}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.policyNo}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>

                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
                                        </td>
                                        <td className={css.word_break}>
                                            {item?.status}
                                        </td>
                                        <td>
                                            {
                                                item.investmentSchedule === "provisional" && selectedOption === "actual" && !item.isConverted && !finalActualSubmission &&
                                                <IconButton onClick={() => handleActualConversion(array80CCD.indexOf(item), array80CCD, setArray80CCD, setError, setErrorMessage, setSuccess, setSuccessMessage)}>
                                                    <Loop />
                                                </IconButton>
                                            }
                                            {!item.isConverted && !finalActualSubmission && <IconButton onClick={() => handleOpenEditModal(array80CCD.indexOf(item), setEditIndex, setEditModal)}>
                                                <Edit />
                                            </IconButton>}

                                            {!item.isConverted && !finalActualSubmission && <Tooltip title="Delete the Entry" placement="left" >
                                                <IconButton onClick={() => handleDeleteRow2(array80CCD.indexOf(item), mainSection, array80C, setArray80C, array80D,
                                                    setArray80D, array10, setArray10, array24, setArray24, array80CCD, setArray80CCD)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>}

                                        </td>
                                    </tr>
                                ))}
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td contentEditable="true">
                                            <select
                                                className={css.custom_select}
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    const selectedSubSection = e.target.options[e.target.selectedIndex].getAttribute("data-subSection");
                                                    const selectedSubSectionCode = e.target.options[e.target.selectedIndex].getAttribute("data-subSectionCode");
                                                    const selectedInvestmentCode = e.target.options[e.target.selectedIndex].getAttribute("data-investmentCode");
                                                    const selectedDivision = e.target.options[e.target.selectedIndex].getAttribute("data-division")
                                                    rows[index].selectValue = selectedValue
                                                    rows[index].subSectionValue = selectedSubSectionCode;
                                                    rows[index].subSection = selectedSubSection;
                                                    rows[index].investmentCode = selectedInvestmentCode;
                                                    rows[index].division = selectedDivision
                                                    setRows([...rows])
                                                    handleDropdownChange(e, setSubSectionValue)
                                                }}
                                                value={row.selectValue}
                                            >
                                                <option value="" >Select</option>
                                                {subSection.map((item) => (
                                                    <option
                                                        value={item._id}
                                                        data-subSection={item.subSection}
                                                        data-subSectionCode={item.subSectionCode}
                                                        data-investmentCode={item?.investmentCode || ""}
                                                        data-division={item?.division || ""}
                                                    >
                                                        {item.subSection} ({item.investmentCode ? item?.investmentCode : item?.subSectionCode}  {item?.division})
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className={css.word_break} >

                                        </td>
                                        <td contentEditable="true" className={css.word_break} onChange={(e) => {
                                            const updatedRows = [...rows];
                                            updatedRows[index].nameOfAssured = e.currentTarget.textContent;
                                            setRows(updatedRows);
                                        }}
                                            onBlur={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].nameOfAssured = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                        >
                                            {row.nameOfAssured}
                                        </td>
                                        <td contentEditable="true">
                                            <select
                                                className={css.custom_select}
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    rows[index].relation = selectedValue;
                                                    setRows([...rows])
                                                }}
                                                value={row.relation}
                                            >
                                                <option value="" >Select</option>
                                                <option value="Self">Self</option>
                                                <option value="Parent/Guardian">Parent/Guardian</option>
                                                <option value="Spouse/Partner">Spouse/Partner</option>
                                                <option value="Son/Daughter">Son/Daughter</option>
                                            </select>
                                        </td>
                                        {mainSection === "Section 10" && <td contentEditable="true" className={css.word_break}
                                        >
                                            <input type='date'
                                                className={css.input_date}
                                                min={minDate}
                                                max={maxDate}
                                                onChange={(e) => {
                                                    const updatedRows = [...rows];
                                                    const newValue = e.target.value;
                                                    updatedRows[index].startDate = newValue;
                                                    setRows(updatedRows);
                                                }} />
                                        </td>}
                                        {mainSection === "Section 10" && <td contentEditable="true" className={css.word_break}
                                        >
                                            <input type='date'
                                                className={css.input_date}
                                                min={minDate}
                                                max={maxDate}
                                                onChange={(e) => {
                                                    const updatedRows = [...rows];
                                                    const newValue = e.target.value;
                                                    updatedRows[index].endDate = newValue;
                                                    setRows(updatedRows);
                                                }} />
                                        </td>}
                                        {mainSection === "Section 10" && <>
                                            <td>
                                                1
                                            </td>
                                        </>}
                                        {mainSection === "Section 10" && <tr>
                                            <td>
                                                <select
                                                    className={css.custom_select}
                                                    onChange={(e) => {
                                                        const selectedValue = e.target.value;
                                                        rows[index].cityCategory = selectedValue;
                                                        setRows([...rows])
                                                    }}
                                                    value={row.cityCategory}
                                                >
                                                    <option value="" >Non Metro</option>
                                                    <option value="1" >Metro</option>
                                                </select>
                                            </td>

                                        </tr>}
                                        {mainSection === "Section 24" && <>
                                            <td contentEditable="true" className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].city = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].city = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.city}
                                            </td>
                                            <td>
                                                <select
                                                    className={css.custom_select}
                                                    onChange={(e) => {
                                                        const selectedValue = e.target.value;
                                                        rows[index].propertyType = selectedValue;
                                                        setRows([...rows])
                                                    }}
                                                    value={row.propertyType}
                                                >
                                                    <option value="1">Self-occupied/Deemed Self occupied/Under Construction</option>
                                                    <option value="2" >Partly Let out House Property</option>
                                                    <option value="3" >Wholly Let out House Property</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    className={css.custom_checkbox}
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        rows[index].eligible80EEA = isChecked ? 'X' : ''; // Set 'X' when checked, '' when unchecked
                                                        setRows([...rows]);
                                                    }}
                                                    checked={row.eligible80EEA === 'X'} // Check the checkbox if propertyType is 'X'
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    className={css.custom_select}
                                                    onChange={(e) => {
                                                        const selectedValue = e.target.value;
                                                        rows[index].possession = selectedValue;
                                                        setRows([...rows])
                                                    }}
                                                    value={row.possession}
                                                >
                                                    <option value="">None</option>
                                                    <option value="1" >Yes</option>
                                                    <option value="2" >No</option>
                                                </select>
                                            </td>

                                        </>}
                                        <td contentEditable="true" className={css.word_break} onChange={(e) => {
                                            const updatedRows = [...rows];
                                            updatedRows[index].policyNo = e.currentTarget.textContent;
                                            setRows(updatedRows);
                                        }}
                                            onBlur={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].policyNo = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                        >
                                            {row.policyNo}
                                        </td>
                                        {mainSection === "Section 80C" || mainSection === "Section 80D" ? <td contentEditable="true" className={css.word_break}
                                        >
                                            <input type='date' className={css.input_date}
                                                onChange={(e) => {
                                                    const updatedRows = [...rows];
                                                    const newValue = e.target.value;
                                                    updatedRows[index].paymentDate = newValue;
                                                    setRows(updatedRows);
                                                }} />
                                        </td> : <></>}
                                        <td contentEditable="true" className={css.word_break} onChange={(e) => {
                                            const updatedRows = [...rows];
                                            updatedRows[index].investment = e.currentTarget.textContent;
                                            setRows(updatedRows);
                                        }}
                                            onBlur={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].investment = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                        >
                                            {row.investment}
                                        </td>

                                        {mainSection === "Section 10" && <>
                                            <td contentEditable={subSectionValue === "13A" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].pan = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].pan = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.pan}
                                            </td>
                                            <td contentEditable={subSectionValue === "13A" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].landLoardName = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].landLoardName = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.landLoardName}
                                            </td>
                                            <td contentEditable={subSectionValue === "13A" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].landLoardAddress = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].landLoardAddress = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.landLoardAddress}
                                            </td>
                                        </>}
                                        {mainSection === "Section 24" && <>
                                            <td contentEditable={subSectionValue === "B" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].pan = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].pan = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.pan}
                                            </td>
                                            <td contentEditable={subSectionValue === "B" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].landLoardName = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].landLoardName = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.landLoardName}
                                            </td>
                                            <td contentEditable={subSectionValue === "B" ? "true" : "false"} className={css.word_break} onChange={(e) => {
                                                const updatedRows = [...rows];
                                                updatedRows[index].landLoardAddress = e.currentTarget.textContent;
                                                setRows(updatedRows);
                                            }}
                                                onBlur={(e) => {
                                                    const updatedRows = [...rows];
                                                    updatedRows[index].landLoardAddress = e.currentTarget.textContent;
                                                    setRows(updatedRows);
                                                }}
                                            >
                                                {row.landLoardAddress}
                                            </td>
                                        </>}
                                        <td className={css.word_break}>
                                            {selectedOption}
                                        </td>
                                        <td className={css.word_break}>
                                            {uploadLoading ? <CircularProgress size={30} /> : <>
                                                {fileList.length !== 0 ? (
                                                    <>
                                                        {fileList.map((file, index) => (
                                                            <>
                                                                <a href={`${url}/file/${file.file}`} target="_blank" rel="noreferrer">
                                                                    Uploaded  File {index + 1}
                                                                </a>
                                                                <IconButton onClick={() => deleteFile(file, index, fileList, setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage, setUploadLoading)}>
                                                                    <CloseIcon fontSize='small' />
                                                                </IconButton>
                                                                <br />
                                                            </>
                                                        ))}
                                                        <label className={css.customFileInput}>
                                                            upload More
                                                            <input
                                                                type="file"
                                                                multiple
                                                                onChange={(e) => uploadFile(e.target.files[0], setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage, setUploadLoading)}
                                                            />
                                                        </label>
                                                    </>
                                                ) : (
                                                    <>
                                                        <label className={css.customFileInput}>
                                                            Choose a File
                                                            <input
                                                                type="file"
                                                                multiple
                                                                onChange={(e) => uploadFile(e.target.files[0], setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage, setUploadLoading)}
                                                            />
                                                        </label>
                                                    </>
                                                )}
                                            </>}


                                        </td>
                                        <td className={css.word_break}>

                                        </td>
                                        <td>
                                            {/* <IconButton onClick={() => handleEditRow(index)}>
                                    <Edit />
                                </IconButton> */}
                                            <Tooltip title="Delete the Entry" placement="left" >
                                                <IconButton onClick={() => handleDeleteRow(index, rows, setRows, setSubSectionValue, setAddState, fileList, setFileList)}>
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>}

                    </table>
                    {!finalActualSubmission && <Tooltip title="Add a Entry" placement="left" >
                        {addState ?
                            <IconButton disabled >
                                <Add />
                            </IconButton> :
                            <IconButton onClick={() => handleAddRow(setRows, rows, setAddState)}>
                                <Add />
                            </IconButton>
                        }

                    </Tooltip>}

                    {rows.length !== 0 &&
                        <div className={css.final_button_container}>
                            <div className={css.saveButtonContainer}>
                                <button className={css.saveButton}
                                    onClick={() =>
                                        handleSaveData(subSectionValue, rows, selectedOption,
                                            setError, setErrorMessage, mainSection,
                                            setArray80C, setArray80D,
                                            setArray10, setArray24,
                                            setArray80CCD, setRows, setAddState, setSubSectionValue,
                                            alphanumericPattern, fileList, setFileList, openyear, phoneNumber)}>
                                    Save
                                </button>
                            </div>
                            {/* <div className={css.backButtonContainer}>
                        <Tooltip title="Delete All the Entries" placement="left" >
                            <IconButton className={css.backButton} onClick={handleBackChange}>
                                <Delete />
                            </IconButton>
                        </Tooltip>

                    </div> */}
                        </div>}
                    {!finalActualSubmission && <div className={css.submit_button_container} style={{ display: shouldDisplaySubmitButton(rows, array80C, array80D, array10, array24, array80CCD) ? 'flex' : 'none' }}>
                        {addState ? <button disabled >Save to Submit</button>
                            : <button onClick={() => handleOpenReviewModal(
                                selectedOption,
                                array80C,
                                array80D,
                                array10,
                                array24,
                                array80CCD,
                                openyear,
                                setReviewModal,
                                setError,
                                setErrorMessage)}>
                                {selectedOption === "actual" ? "Submit Your Final Actual Data" : "Submit Your Provisional Data"}
                            </button>}

                    </div>}

                    <EmployeeReviewModal
                        reviewModal={reviewModal}
                        selectedOption={selectedOption}
                        handleCloseReviewModal={() => handleCloseReviewModal(setReviewModal)}
                        array80C={array80C}
                        array80D={array80D}
                        array10={array10}
                        array24={array24}
                        array80CCD={array80CCD}
                        setSuccess={setSuccess}
                        setSuccessMessage={setSuccessMessage}
                    />
                    <EditModal
                        editModal={editModal}
                        setEditModal={setEditModal}
                        mainSection={mainSection}
                        subSection={subSection}
                        editIndex={editIndex}
                        array80C={array80C}
                        setArray80C={setArray80C}
                        array80D={array80D}
                        setArray80D={setArray80D}
                        array10={array10}
                        setArray10={setArray10}
                        array24={array24}
                        setArray24={setArray24}
                        array80CCD={array80CCD}
                        setArray80CCD={setArray80CCD}
                        setError={setError}
                        setErrorMessage={setErrorMessage}
                        setSuccess={setSuccess}
                        setSuccessMessage={setSuccessMessage}
                    />
                    <CommentsModel commentsModel={commentsModel} entryStatus={entryStatus} comments={comments} handleCloseCommentsModel={handleCloseCommentsModel} />
                    <ErrorSnackbar state={error} setState={setError} errorMessage={errorMessage} />
                    <SuccessSnackbar state={success} setState={setSuccess} successMessage={successMessage} />

                </div >}

        </>

    );
};

export default MainSectionTable;
