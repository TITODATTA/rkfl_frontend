import React, { useEffect, useState } from 'react';
import css from '../styles/mainSectionTable.module.css';
import { IconButton, Tooltip } from '@mui/material';
import { Add, Delete, Edit, Error, Loop } from '@mui/icons-material';
import { handleAddRow, shouldDisplaySubmitButton, handleDeleteRow, handleDeleteRow2, handleDropdownChange, handleFileUpload, handleFileChange, handleSaveData, handleOpenReviewModal, handleCloseReviewModal, handleOpenEditModal, handleActualConversion, handleOpenCommentsModel } from '../utils/mainSectionTableFunction';
import ErrorSnackbar from './ErrorSnackbar';
import SuccessSnackbar from './SuccessSnackbar';
import EmployeeReviewModal from './EmployeeReviewModal';
import { handleCreateOrUpdateTransaction, handleGetTransaction, handleUpdateOneTransaction } from '../apis/transactionApi';
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





const MainSectionTable = ({ rows, setRows, subSection, mainSection, selectedOption, openyear }) => {
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
    const [viewOption, setViewOption] = useState("provisional");
    const [finalActualSubmission, setFinalActualSubmission] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [entryStatus, setEntryStatus] = useState("")
    const [comments, setComments] = useState("")
    const [commentsModel, setCommentsModel] = useState(false)
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;

    useEffect(() => {
        setIsLoading(true)
        handleGetTransaction(setArray80C, setArray80D, setArray10, setArray24, setArray80CCD, setIsLoading, setFinalActualSubmission)
    }, [])

    const handleCloseCommentsModel = () => {
        setCommentsModel(false)
        setEntryStatus("")
        setComments("")
    }

    console.log(array80C)

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
                                <th>Sub Section</th>
                                <th>S.No</th>
                                <th>Name of Assured</th>
                                <th>Relation</th>
                                <th>Policy No/ Bill No/ Document No.</th>
                                <th>Investment amount during the Year</th>
                                {mainSection === "Section 10" &&
                                    <><th>PAN of Landlord</th>
                                        <th>Name of Landlord</th>
                                        <th>Address of Landlord</th></>
                                }
                                {mainSection === "Section 24" &&
                                    <>
                                        <th>PAN of Financial Institute of Homeloan Lender</th>
                                        <th>Name of Financial Institute of Homeloan Lender</th>
                                        <th>Address of Homeloan Lender</th>
                                    </>
                                }
                                <th>Invesment Type</th>
                                <th>Evidence Document
                                    (JPJ / PDF)</th>
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
                                                {item.investment}
                                            </td>
                                            <td className={css.word_break}>
                                                {item.investmentSchedule}
                                            </td>
                                            <td className={css.word_break}>
                                                You have uploaded  {item.file.length} files
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

                                                {item?.actualSubmission === "true" ? <>
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
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>
                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
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
                                            {!item.actualSubmission && <>
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
                                            {!item.actualSubmission && <>
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
                                            {!item.actualSubmission && <>
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
                                            {!item.actualSubmission && <>
                                                <IconButton onClick={() => handleOpenEditModal(array80CCD.indexOf(item), setEditIndex, setEditModal)}>
                                                    <Edit />
                                                </IconButton>
                                                <Tooltip title="Delete the Entry" placement="left" >
                                                    <IconButton onClick={() => handleDeleteRow2(array80CCD.indexOf(item), mainSection, array80C, setArray80C, array80D,
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
                                                    const selectedInvestmentCode = e.target.options[e.target.selectedIndex].getAttribute("data-investmentCode");
                                                    const selectedDivision = e.target.options[e.target.selectedIndex].getAttribute("data-division")
                                                    rows[index].subSectionValue = selectedValue;
                                                    rows[index].subSection = selectedSubSection;
                                                    rows[index].investmentCode = selectedInvestmentCode;
                                                    rows[index].division = selectedDivision
                                                    setRows([...rows])
                                                    handleDropdownChange(e, setSubSectionValue)
                                                }}
                                                value={row.subSectionValue}
                                            >
                                                <option value="" >Select</option>
                                                {subSection.map((item) => (
                                                    <option
                                                        value={item.subSectionCode}
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
                                            {index + 1}
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
                                                <option value="Mother">Mother</option>
                                                <option value="Father">Father</option>
                                                <option value="Sister">Sister</option>
                                                <option value="Son">Son</option>
                                            </select>
                                        </td>
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
                                            {fileList.length !== 0 ? (
                                                <>
                                                    {fileList.map((file, index) => (
                                                        <>
                                                            <a href={`${url}/file/${file.file}`} target="_blank" rel="noreferrer">
                                                                Uploaded  File {index + 1}
                                                            </a>
                                                            <IconButton onClick={() => deleteFile(file, index, fileList, setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage)}>
                                                                <CloseIcon fontSize='small' />
                                                            </IconButton>
                                                            <br />
                                                        </>
                                                    ))}
                                                    <label className={css.customFileInput}>
                                                        upload More
                                                        <input
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            multiple
                                                            onChange={(e) => uploadFile(e.target.files[0], setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage)}
                                                        // onChange={(e) => {
                                                        //     handleFileUpload(index, e.target.files, rows, setRows);
                                                        // }}
                                                        />
                                                    </label>
                                                    {/* <button onClick={() => handleFileChange(index, rows, setRows)}>Change</button> */}
                                                </>
                                            ) : (
                                                <>
                                                    <label className={css.customFileInput}>
                                                        Choose a File
                                                        <input
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            multiple
                                                            onChange={(e) => uploadFile(e.target.files[0], setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage)}
                                                        // onChange={(e) => {
                                                        //     handleFileUpload(index, e.target.files, rows, setRows);
                                                        // }}
                                                        />
                                                    </label>
                                                </>
                                            )}
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
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>
                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
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
                                            {item.investment}
                                        </td>
                                        <td className={css.word_break}>
                                            {item.investmentSchedule}
                                        </td>
                                        <td className={css.word_break}>
                                            You have uploaded  {item.file.length} files
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
                                {/*  */}
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td contentEditable="true">
                                            <select
                                                className={css.custom_select}
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    const selectedSubSection = e.target.options[e.target.selectedIndex].getAttribute("data-subSection");
                                                    const selectedInvestmentCode = e.target.options[e.target.selectedIndex].getAttribute("data-investmentCode");
                                                    const selectedDivision = e.target.options[e.target.selectedIndex].getAttribute("data-division")
                                                    rows[index].subSectionValue = selectedValue;
                                                    rows[index].subSection = selectedSubSection;
                                                    rows[index].investmentCode = selectedInvestmentCode;
                                                    rows[index].division = selectedDivision
                                                    setRows([...rows])
                                                    handleDropdownChange(e, setSubSectionValue)
                                                }}
                                                value={row.subSectionValue}
                                            >
                                                <option value="" >Select</option>
                                                {subSection.map((item) => (
                                                    <option
                                                        value={item.subSectionCode}
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
                                            {index + 1}
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
                                                <option value="Mother">Mother</option>
                                                <option value="Father">Father</option>
                                                <option value="Sister">Sister</option>
                                                <option value="Son">Son</option>
                                            </select>
                                        </td>
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
                                            {fileList.length !== 0 ? (
                                                <>
                                                    {fileList.map((file, index) => (
                                                        <>
                                                            <a href={`${url}/file/${file.file}`} target="_blank" rel="noreferrer">
                                                                Uploaded  File {index + 1}
                                                            </a>
                                                            <IconButton onClick={() => deleteFile(file, index, fileList, setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage)}>
                                                                <CloseIcon fontSize='small' />
                                                            </IconButton>
                                                            <br />
                                                        </>
                                                    ))}
                                                    <label className={css.customFileInput}>
                                                        upload More
                                                        <input
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            multiple
                                                            onChange={(e) => uploadFile(e.target.files[0], setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage)}
                                                        // onChange={(e) => {
                                                        //     handleFileUpload(index, e.target.files, rows, setRows);
                                                        // }}
                                                        />
                                                    </label>
                                                    {/* <button onClick={() => handleFileChange(index, rows, setRows)}>Change</button> */}
                                                </>
                                            ) : (
                                                <>
                                                    <label className={css.customFileInput}>
                                                        Choose a File
                                                        <input
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            multiple
                                                            onChange={(e) => uploadFile(e.target.files[0], setFileList, setSuccess, setSuccessMessage, setError, setErrorMessage)}
                                                        // onChange={(e) => {
                                                        //     handleFileUpload(index, e.target.files, rows, setRows);
                                                        // }}
                                                        />
                                                    </label>
                                                </>
                                            )}
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
                                            alphanumericPattern, fileList, setFileList, openyear)}>
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
