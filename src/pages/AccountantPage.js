import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import css from "../styles/accountantPage.module.css"
import logo from "../assests/Logo_main-removebg-preview.png"
import { IconButton, Tooltip } from '@mui/material'
import { Build, ContactsOutlined, Logout } from '@mui/icons-material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { handleGetCombinedTransaction, handleUpdateAcceptedTransaction, handleUpdateTransaction } from "../apis/transactionApi";
import CircularProgress from '@mui/material/CircularProgress';
import { handleGetFinancialsAccountant } from '../apis/financialApi'
import { url } from '../utils/constants'
import RulesAccount from '../components/RulesAccount'
import AdjustmentModel from '../components/AdjustmentModel'
import { handleGetEmployeeContactAccountant } from '../apis/employeeUpdate'
import ContactInfoModel from '../components/ContactInfoModel'
import PastDataModel from '../components/PastDataModel'

const AccountantPage = () => {
    const role = sessionStorage.getItem('role')
    const userDetails = JSON.parse(sessionStorage.getItem('userData'))
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [investmentType, setInvestmentType] = useState("")
    const [plant, setPlant] = useState("");
    const [mainSection, setMainSection] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [openAdjustment, setOpenAdjustment] = useState(false)
    const [data, setData] = useState([]);
    const [submitButtonState, setSubmitButtonState] = useState(false);
    const [openYear, setOpenYear] = useState("");
    const [filter, setFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("")
    const [adjustedObject, setAdjustedObject] = useState({})
    const [adjustedObjectIndex, setAdjustedObjectIndex] = useState(null)
    const [adjustedInvestment, setAdjustedInvestment] = useState("")
    const [adjustedComments, setAdjustedComments] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [openContactInfoModal, setOpenContactInfoModal] = useState(false)
    const [openPastData, setOpenPastData] = useState(false)
    const [financialYears, setFinancialYears] = useState([])


    useEffect(() => {
        if (!role || !userDetails) {
            navigate("/login")
        }
        else if (role !== "Accountant") {
            navigate("/login")
        }
        else {
            handleGetFinancialsAccountant(setOpenYear, setFinancialYears)
        }
    }, [])
    // Calculate the total number of pages
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    // Calculate the starting and ending indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the transactions array to display only the items for the current page
    let currentItems = transactions.slice(startIndex, endIndex);

    const plants = userDetails?.acctRolePlant.split(',') || []

    // Function to handle page changes
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleItemsPerPage = (e) => {
        setItemsPerPage(e.target.value)
    }
    const handleInvestmentChange = (e) => {
        setInvestmentType(e.target.value)
    }
    const handlePlantChange = (e) => {
        setPlant(e.target.value)
    }
    const handleLogout = () => {
        navigate("/login")
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('userData');
    }
    const handleRadioChange = (index, status, item) => {
        const updatedData = [...transactions];

        if (updatedData[index].hasOwnProperty('checked')) {
            if (updatedData[index].checked === false) {
                const reason = window.prompt("Please specify a reason:");
                if (reason === null) {
                    // User clicked Cancel, set checked to false
                    updatedData[index].checked = false;

                } else if (reason.trim() === "") {
                    // User provided an empty reason, set checked to false
                    updatedData[index].checked = false;
                } else {
                    // User provided a non-empty reason, set checked to true
                    updatedData[index].checked = true;
                    updatedData[index].accountantsComments = reason
                    updatedData[index].isEdit = true
                }
                setTransactions(updatedData);
            }
            else {
                updatedData[index].checked = !updatedData[index].checked;
                updatedData[index].accountantsComments = ""
                updatedData[index].isEdit = false
                setTransactions(updatedData);
            }

        } else {
            const reason = window.prompt("Please specify a reason:");
            if (reason === null) {
                // User clicked Cancel, set checked to false
                updatedData[index].checked = false;
            } else if (reason.trim() === "") {
                // User provided an empty reason, set checked to false
                updatedData[index].checked = false;
            } else {
                // User provided a non-empty reason, set checked to true
                updatedData[index].checked = true;
                updatedData[index].accountantsComments = reason
                updatedData[index].isEdit = true
            }

            setTransactions(updatedData);
        }
    };
    const handleRadioChangeAccpeted = (index, status, item) => {
        const updatedData = [...transactions];
        if (updatedData[index].hasOwnProperty('checked1')) {
            delete updatedData[index].checked1;
            setTransactions(updatedData);
        } else {
            updatedData[index].checked1 = true;
            setTransactions(updatedData);
        }
    };

    const handleSearchEmployee = () => {
        if (searchTerm.length === 0) {
            alert("Employee Code is empty")
        }
        else {
            const filteredData = transactions.filter((item) =>
                item.employeeCode.toString() === searchTerm
            );
            if (filteredData.length === 0) {
                alert("Employee Does not exist , or Employee Has not done any Entry")
            }
            else {
                setTransactions(filteredData);
            }
        }

    }




    const handleBackButton = () => {
        setTransactions([])
        setSubmitButtonState(false);
        setData([])
        setItemsPerPage(5)
        setFilter("")
        setPlant("")
        setInvestmentType("")
        setMainSection("")
        setSearchTerm("")
    }
    const handleBackButton2 = () => {
        setSearchTerm("")
    }

    const handleSubmit = () => {
        handleUpdateTransaction(transactions, setTransactions, setSubmitButtonState, setData)
        setFilter("")
    }
    const handleChangeFilter = (e) => {
        setFilter(e.target.value)
    }

    const handleSubmitAcceptedTransaction = () => {
        const hasCheckedTrue = transactions.some(item => item.checked === true);
        // const hasChecked1Property = transactions.every(item => item.hasOwnProperty('checked1'));
        if (hasCheckedTrue) {
            alert("Rejected Documents Need To be Submitted First");
            return; // Exit the function
        }
        // if (!hasChecked1Property) {
        //     alert("Error, Not all documents have been Accepted")
        //     return;
        // }
        let acceptedArray = transactions.filter(item => item.checked1 === true);
        if (acceptedArray.length === 0) {
            alert("No Accepted Transactions");
            return;
        }
        // if (transactions.some(item => item.hasOwnProperty('checked'))) {
        //     // Filter based on the 'checked' key if it exists
        //     acceptedArray = transactions.filter(item => item.checked === false);
        // } else {
        //     // Filter based on the 'status' key if 'checked' doesn't exist
        //     acceptedArray = transactions.filter(item => !item.status || item.status === "Resubmitted");
        // }
        handleUpdateAcceptedTransaction(acceptedArray, setTransactions, setSubmitButtonState)
        setFilter("")
    }

    const handleCloseAdjustmentModel = () => {
        setOpenAdjustment(false)
    }
    const handleOpenAdjustmentModel = (index) => {
        setAdjustedObjectIndex(index)
        setAdjustedObject(transactions[index])
        setAdjustedInvestment(transactions[index].adjustedInvestment)
        setOpenAdjustment(true)
        setAdjustedComments(transactions[index].adjustedComments || "")
    }
    const handleClosePastDataModel = () => {
        setOpenPastData(false)
    }

    const handleGetEmployeeContactInfo = (employeeCode) => {
        handleGetEmployeeContactAccountant(employeeCode, setPhoneNumber)
        setOpenContactInfoModal(true)
    }
    const handleCloseContactInfoModal = () => {
        setOpenContactInfoModal(false)
    }
    return (
        <div className={css.page_container}>
            <div className={css.header_container}>
                <div className={css.logo_container}>
                    <img src={logo} width="100%" height="100%" alt="img" />
                </div>
                <h1 className={css.welcome_tag}>
                    Accountants Dashboard
                </h1>
                <div className={css.logout_button_container}>
                    <Tooltip title="Log out" placement="left">
                        <IconButton className={css.logout_button} onClick={() => handleLogout()} >
                            <Logout />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className={css.base_container}>
                <div className={css.personal_info_container}>
                    <h3>Name :- {userDetails?.employeeName}</h3>
                    <h3>Employee Code :- {userDetails?.employeeCode}</h3>
                    <h3>Department :- {userDetails?.department}</h3>
                    <h3>Designation :- {userDetails?.designation}</h3>
                    <h3>Plant :- {userDetails?.plant}</h3>
                    <h3>Financial Year :- {openYear} (<a onClick={() => setOpenPastData(true)} style={{ color: "blue", textDecoration: "underline", cursor: "pointer", fontWeight: "lighter" }}>Check Past Data</a>)</h3>
                </div>
                <RulesAccount />
            </div>
            <div className={css.filter_option_container}>
                <h4 >Select Filter Options</h4>
                <hr />
                <ArrowForwardIosIcon fontSize='small' className={css.arrow_icon} />
                <h4 className={css.filter_text}>Plant<span style={{ color: "red" }}>(*)</span></h4>
                <select value={plant} disabled={submitButtonState ? true : false} onChange={(e) => { handlePlantChange(e) }}>
                    <option value="" selected disabled hidden>Choose Plant</option>
                    {plants.map((plant) => (
                        <option value={plant}>{plant}</option>
                    ))}

                </select>
                <h4 className={css.filter_text}>Investment Schedule<span style={{ color: "red" }}>(*)</span></h4>
                <select value={investmentType} disabled={submitButtonState ? true : false} onChange={(e) => { handleInvestmentChange(e) }}>
                    <option value="" selected hidden>Choose Investment</option>
                    <option value="Actual">Actual</option>
                    <option value="Provisional">Provisional</option>
                </select>
                <h4 className={css.filter_text}>Main Section</h4>
                <select value={mainSection} disabled={submitButtonState ? true : false} onChange={(e) => setMainSection(e.target.value)}>
                    <option value="">All</option>
                    <option value="Section 80C">Section 80C</option>
                    <option value="Section 80D">Section 80D</option>
                    <option value="Section 10">Section 10</option>
                    <option value="Section 24">Section 24</option>
                    {/* <option value="Section 80CCD">Section 80CCD</option> */}
                </select>
                {submitButtonState ? <button
                    className={css.submit_button} disabled>Submit</button> : <button
                        className={css.submit_button}
                        onClick={() => { handleGetCombinedTransaction(setTransactions, plant, investmentType, mainSection, openYear, setIsLoading, setSubmitButtonState) }}>Submit</button>}

                {currentItems.length !== 0 &&
                    <>
                        <h4 className={css.filter_text}>Number of Entries Per Page</h4>
                        <select value={itemsPerPage} onChange={(e) => handleItemsPerPage(e)}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                        </select>
                    </>}


            </div>
            {submitButtonState &&
                <div className={css.filter_option_container}>
                    <h4 className={css.filter_text}>Search By Employee Code :-</h4>
                    <input type='number' inputMode="numeric" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className={css.submit_button} onClick={handleSearchEmployee} >Submit</button>
                    <button className={css.submit_button} onClick={handleBackButton2} >Reset</button>
                </div>}

            {investmentType === 'Actual' && submitButtonState &&
                <div className={css.filter_option_container}>
                    <h4 >Rejected/Accepted/Resubmitted/New Actual Entry Filter Options</h4>
                    <hr />
                    <ArrowForwardIosIcon fontSize='small' className={css.arrow_icon} />
                    <select value={filter} onChange={(e) => handleChangeFilter(e)}>
                        <option value="">All</option>
                        <option value="reject">Rejected</option>
                        <option value="accept">Accepted</option>
                        <option value="resubmit">Resubmitted</option>
                        <option value="notChecked">Not Checked Entries</option>
                        <option value="new">New Actual Entry</option>
                    </select>
                </div>}
            <div className={css.table_container}>
                <table className={css.data_table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Employee Code</th>
                            <th>Financial Year</th>
                            <th>Employe Name</th>
                            <th>Main Section</th>
                            <th>Sub Section </th>
                            <th>Division</th>
                            <th>Investment</th>
                            <th>Investment Details</th>
                            <th>Name Of Assured</th>
                            <th>Relation</th>
                            <th>House Location</th>
                            <th>Investment Amount</th>
                            <th>Investment Payment Date</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Pan of Landloard</th>
                            <th>Name of  Landloard</th>
                            <th>Address of  Landloard</th>
                            <th>PAN of Financial Institute of Homeloan Lender</th>
                            <th>Name of Financial Institute of Homeloan Lender</th>
                            <th>Address of Financial Institute of Homeloan Lender</th>
                            <th>EvidenceDocument(JPJ/PDF)</th>
                            <th>Policy Number/Document Number</th>
                            <th>Create Date/Time</th>
                            <th>Edit Date/Time</th>
                            <th>Conversion Date/Time</th>
                            {investmentType === 'Actual' && <>
                                <th>Status(Accept/Reject)</th>
                                <th>Accounts Comments</th>
                                <th>Adjusted Invesment</th>
                                <th>Adjusted Comments</th>
                            </>}
                            <th>Contact Info</th>

                            {/* Add more table headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && <div className={css.loader_container}>
                            <CircularProgress />
                        </div>}

                        {!isLoading && filter.length === 0 && currentItems.map((item, index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{item.employeeCode}</td>
                                <td>{item.financialyear}</td>
                                <td>{item.employeeName}</td>
                                <td>{item.mainSection}</td>
                                <td>{item?.subSectionCode}</td>
                                <td>{item?.division}</td>
                                <td>{item?.investmentCode}</td>
                                <td>{item.subSection}</td>
                                <td>{item.nameOfAssured}</td>
                                <td>{item.relation}</td>
                                <td>{item?.city}</td>
                                <td>{item.investment}</td>
                                <td>{item?.paymentDate}</td>
                                <td>{item?.startDate}</td>
                                <td>{item?.endDate}</td>
                                {item.subSectionCode === "13A" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }

                                {item.subSectionCode === "B" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                                <td>
                                    {item?.file.map((item, index) => (
                                        <>
                                            <a href={`${url}/file/${item.file}`} target="_blank" rel="noreferrer">Uploaded Document {index + 1}</a>
                                            <br />
                                        </>

                                    ))}
                                </td>
                                <td>{item?.policyNo}</td>
                                <td>{item?.createTimestamp}</td>
                                <td>{item?.editTimestamp}</td>
                                <td>{item?.conversionTimestamp}</td>
                                {investmentType === 'Actual' &&
                                    <>
                                        <td className={css.status_td}>
                                            {item?.status === 'Reject' ? <span style={{ color: "red", fontWeight: "bold" }}>Reject</span> :
                                                <>
                                                    {item?.status}{" "}
                                                    {item.status === "Resubmitted" ? item?.resubmissionCounter : ""}
                                                    <br />
                                                    {item?.status !== 'Accept' &&
                                                        <>
                                                            <div className={css.checkbox_container}>
                                                                <h4>Accept</h4>
                                                                <input type='checkbox' checked={item.checked1 ? true : false} disabled={item.checked ? true : false} className={css.checkbox1} onClick={() => handleRadioChangeAccpeted(transactions.indexOf(item))} />
                                                            </div>
                                                            <div className={css.checkbox_container1}>
                                                                <h4>Reject</h4>
                                                                <input type='checkbox' checked={item.checked ? true : false} disabled={item.checked1 ? true : false} className={css.checkbox} onClick={() => handleRadioChange(transactions.indexOf(item), 'Reject', item)} />
                                                            </div>
                                                        </>

                                                    }

                                                </>
                                            }
                                        </td>
                                        <td >
                                            {item?.accountantsComments}
                                        </td>
                                        <td>
                                            <br />
                                            {item.adjustedInvestment}
                                            <br />
                                            <IconButton disabled={item?.status === 'Reject' || item.checked || item.status === 'Accept' ? true : false} onClick={() => handleOpenAdjustmentModel(transactions.indexOf(item))}>
                                                <Build fontSize='small' />
                                            </IconButton>
                                        </td>
                                        <td>
                                            {item?.adjustedComments}
                                        </td>
                                    </>
                                }
                                <td>
                                    <IconButton onClick={() => handleGetEmployeeContactInfo(item.employeeCode)}><ContactsOutlined fontSize='small' /></IconButton>
                                </td>
                            </tr>
                        ))}
                        {filter === "reject" && currentItems.filter((item) => item.checked === true || item?.status === "Reject").map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.employeeCode}</td>
                                <td>{item.financialyear}</td>
                                <td>{item.employeeName}</td>
                                <td>{item.mainSection}</td>
                                <td>{item?.subSectionCode}</td>
                                <td>{item?.division}</td>
                                <td>{item?.investmentCode}</td>
                                <td>{item.subSection}</td>
                                <td>{item.nameOfAssured}</td>
                                <td>{item.relation}</td>
                                <td>{item?.city}</td>
                                <td>{item.investment}</td>
                                <td>{item?.paymentDate}</td>
                                <td>{item?.startDate}</td>
                                <td>{item?.endDate}</td>
                                {item.subSectionCode === "13A" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }

                                {item.subSectionCode === "B" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                                <td>
                                    {item?.file.map((item, index) => (
                                        <>
                                            <a href={`${url}/file/${item.file}`} target="_blank" rel="noreferrer">Uploaded Document {index + 1}</a>
                                            <br />
                                        </>

                                    ))}
                                </td>
                                <td>{item?.policyNo}</td>
                                <td>{item?.createTimestamp}</td>
                                <td>{item?.editTimestamp}</td>
                                <td>{item?.conversionTimestamp}</td>
                                {investmentType === 'Actual' && <td className={css.status_td}>
                                    {item?.status === 'Reject' ? <span style={{ color: "red", fontWeight: "bold" }}>Reject</span> :
                                        <>
                                            {item?.status}{" "}{item?.resubmissionCounter}
                                            <br />
                                            <>
                                                <div className={css.checkbox_container}>
                                                    <h4>Accept</h4>
                                                    <input type='checkbox' checked={item.checked1 ? true : false} disabled={item.checked ? true : false} className={css.checkbox1} onClick={() => handleRadioChangeAccpeted(transactions.indexOf(item))} />
                                                </div>
                                                <div className={css.checkbox_container1}>
                                                    <h4>Reject</h4>
                                                    <input type='checkbox' checked={item.checked ? true : false} disabled={item.checked1 ? true : false} className={css.checkbox} onClick={() => handleRadioChange(transactions.indexOf(item), 'Reject', item)} />
                                                </div>
                                            </>

                                        </>
                                    }

                                </td>}

                                <td >
                                    {item?.accountantsComments}
                                </td>
                                <td>
                                    {item.adjustedInvestment}
                                    <br />
                                    <IconButton disabled={item?.status === 'Reject' || item.checked ? true : false} onClick={() => handleOpenAdjustmentModel(transactions.indexOf(item))}>
                                        <Build />
                                    </IconButton>
                                </td>
                                <td >
                                    {item?.adjustedComments}
                                </td>
                                <td><IconButton onClick={() => handleGetEmployeeContactInfo(item.employeeCode)}><ContactsOutlined fontSize='small' /></IconButton></td>

                                {/* Add more table cells as needed */}
                            </tr>
                        ))}
                        {filter === "accept" && currentItems.filter((item) => item?.status === "Accept" || item?.checked1 === true).map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.employeeCode}</td>
                                <td>{item.financialyear}</td>
                                <td>{item.employeeName}</td>
                                <td>{item.mainSection}</td>
                                <td>{item?.subSectionCode}</td>
                                <td>{item?.division}</td>
                                <td>{item?.investmentCode}</td>
                                <td>{item.subSection}</td>
                                <td>{item.nameOfAssured}</td>
                                {/* <td>{item.nameOfAssured}</td> */}
                                <td>{item.relation}</td>
                                <td>{item?.city}</td>
                                <td>{item.investment}</td>
                                <td>{item?.paymentDate}</td>
                                <td>{item?.startDate}</td>
                                <td>{item?.endDate}</td>
                                {item.subSectionCode === "13A" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }

                                {item.subSectionCode === "B" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                                <td>
                                    {item?.file.map((item, index) => (
                                        <>
                                            <a href={`${url}/file/${item.file}`} target="_blank" rel="noreferrer">Uploaded Document {index + 1}</a>
                                            <br />
                                        </>

                                    ))}
                                </td>
                                <td>{item?.policyNo}</td>
                                <td>{item?.createTimestamp}</td>
                                <td>{item?.editTimestamp}</td>
                                <td>{item?.conversionTimestamp}</td>
                                <td className={css.status_td}>{item.status ? "Accept" : <>
                                    <div className={css.checkbox_container}>
                                        <h4>Accept</h4>
                                        <input type='checkbox' checked={item.checked1 ? true : false} disabled={item.checked ? true : false} className={css.checkbox1} onClick={() => handleRadioChangeAccpeted(transactions.indexOf(item))} />
                                    </div>
                                    <div className={css.checkbox_container1}>
                                        <h4>Reject</h4>
                                        <input type='checkbox' checked={item.checked ? true : false} disabled={item.checked1 ? true : false} className={css.checkbox} onClick={() => handleRadioChange(transactions.indexOf(item), 'Reject', item)} />
                                    </div>
                                </>}

                                </td>
                                <td >
                                    {item?.accountantsComments}
                                </td>
                                <td>
                                    <br />
                                    {item.adjustedInvestment}
                                    <br />
                                    <IconButton disabled={item?.status === 'Reject' || item.checked || item.status === 'Accept' ? true : false} onClick={() => handleOpenAdjustmentModel(transactions.indexOf(item))}>
                                        <Build fontSize='small' />
                                    </IconButton>
                                </td>
                                <td >
                                    {item?.adjustedComments}
                                </td>
                                <td><IconButton onClick={() => handleGetEmployeeContactInfo(item.employeeCode)}><ContactsOutlined fontSize='small' /></IconButton></td>


                                {/* Add more table cells as needed */}
                            </tr>
                        ))}
                        {filter === "resubmit" && currentItems.filter((item) => item?.status === "Resubmitted").map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.employeeCode}</td>
                                <td>{item.financialyear}</td>
                                <td>{item.employeeName}</td>
                                <td>{item.mainSection}</td>
                                <td>{item?.subSectionCode}</td>
                                <td>{item?.division}</td>
                                <td>{item?.investmentCode}</td>
                                <td>{item.subSection}</td>
                                <td>{item.nameOfAssured}</td>
                                <td>{item.relation}</td>
                                <td>{item?.city}</td>
                                <td>{item.investment}</td>
                                <td>{item?.paymentDate}</td>
                                <td>{item?.startDate}</td>
                                <td>{item?.endDate}</td>
                                {item.subSectionCode === "13A" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }

                                {item.subSectionCode === "B" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                                <td>
                                    {item?.file.map((item, index) => (
                                        <>
                                            <a href={`${url}/file/${item.file}`} target="_blank" rel="noreferrer">Uploaded Document {index + 1}</a>
                                            <br />
                                        </>

                                    ))}
                                </td>
                                <td>{item?.policyNo}</td>
                                <td>{item?.createTimestamp}</td>
                                <td>{item?.editTimestamp}</td>
                                <td>{item?.conversionTimestamp}</td>
                                {investmentType === 'Actual' && <td className={css.status_td}>
                                    {item?.status === 'Reject' ? <span style={{ color: "red", fontWeight: "bold" }}>Reject</span> :
                                        <>
                                            {item?.status}{" "}{item?.resubmissionCounter}
                                            <br />
                                            <>
                                                <div className={css.checkbox_container}>
                                                    <h4>Accept</h4>
                                                    <input type='checkbox' checked={item.checked1 ? true : false} disabled={item.checked ? true : false} className={css.checkbox1} onClick={() => handleRadioChangeAccpeted(transactions.indexOf(item))} />
                                                </div>
                                                <div className={css.checkbox_container1}>
                                                    <h4>Reject</h4>
                                                    <input type='checkbox' checked={item.checked ? true : false} disabled={item.checked1 ? true : false} className={css.checkbox} onClick={() => handleRadioChange(transactions.indexOf(item), 'Reject', item)} />
                                                </div>
                                            </>
                                        </>
                                    }

                                </td>}

                                <td >
                                    {item?.accountantsComments}
                                </td>
                                <td>
                                    {item.adjustedInvestment}
                                    <br />
                                    <IconButton disabled={item?.status === 'Reject' || item.checked ? true : false} onClick={() => handleOpenAdjustmentModel(transactions.indexOf(item))}>
                                        <Build />
                                    </IconButton>
                                </td>
                                <td >
                                    {item?.adjustedComments}
                                </td>
                                <td><IconButton onClick={() => handleGetEmployeeContactInfo(item.employeeCode)}><ContactsOutlined fontSize='small' /></IconButton></td>


                                {/* Add more table cells as needed */}
                            </tr>
                        ))}
                        {filter === "notChecked" && currentItems.filter((item) => !item?.checked1 && !item?.checked && !item.status).map((item, index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{item.employeeCode}</td>
                                <td>{item.financialyear}</td>
                                <td>{item.employeeName}</td>
                                <td>{item.mainSection}</td>
                                <td>{item?.subSectionCode}</td>
                                <td>{item?.division}</td>
                                <td>{item?.investmentCode}</td>
                                <td>{item.subSection}</td>
                                <td>{item.nameOfAssured}</td>
                                <td>{item.relation}</td>
                                <td>{item?.city}</td>
                                <td>{item.investment}</td>
                                <td>{item?.paymentDate}</td>
                                <td>{item?.startDate}</td>
                                <td>{item?.endDate}</td>
                                {item.subSectionCode === "13A" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }

                                {item.subSectionCode === "B" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                                <td>
                                    {item?.file.map((item, index) => (
                                        <>
                                            <a href={`${url}/file/${item.file}`} target="_blank" rel="noreferrer">Uploaded Document {index + 1}</a>
                                            <br />
                                        </>

                                    ))}
                                </td>
                                <td>{item?.policyNo}</td>
                                <td>{item?.createTimestamp}</td>
                                <td>{item?.editTimestamp}</td>
                                <td>{item?.conversionTimestamp}</td>
                                {investmentType === 'Actual' &&
                                    <>
                                        <td className={css.status_td}>
                                            {item?.status === 'Reject' ? <span style={{ color: "red", fontWeight: "bold" }}>Reject</span> :
                                                <>
                                                    {item?.status}{" "}
                                                    {item.status === "Resubmitted" ? item?.resubmissionCounter : ""}
                                                    <br />
                                                    {item?.status !== 'Accept' &&
                                                        <>
                                                            <div className={css.checkbox_container}>
                                                                <h4>Accept</h4>
                                                                <input type='checkbox' checked={item.checked1 ? true : false} disabled={item.checked ? true : false} className={css.checkbox1} onClick={() => handleRadioChangeAccpeted(transactions.indexOf(item))} />
                                                            </div>
                                                            <div className={css.checkbox_container1}>
                                                                <h4>Reject</h4>
                                                                <input type='checkbox' checked={item.checked ? true : false} disabled={item.checked1 ? true : false} className={css.checkbox} onClick={() => handleRadioChange(transactions.indexOf(item), 'Reject', item)} />
                                                            </div>
                                                        </>

                                                    }

                                                </>
                                            }
                                        </td>
                                        <td >
                                            {item?.accountantsComments}
                                        </td>
                                        <td>
                                            <br />
                                            {item.adjustedInvestment}
                                            <br />
                                            <IconButton disabled={item?.status === 'Reject' || item.checked || item.status === 'Accept' ? true : false} onClick={() => handleOpenAdjustmentModel(transactions.indexOf(item))}>
                                                <Build fontSize='small' />
                                            </IconButton>
                                        </td>
                                        <td>
                                            {item?.adjustedComments}
                                        </td>
                                    </>
                                }
                                <td>
                                    <IconButton onClick={() => handleGetEmployeeContactInfo(item.employeeCode)}><ContactsOutlined fontSize='small' /></IconButton>
                                </td>
                            </tr>
                        ))}
                        {filter === "new" && currentItems.filter((item) => !item?.status && !item.checked).map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.employeeCode}</td>
                                <td>{item.financialyear}</td>
                                <td>{item.employeeName}</td>
                                <td>{item.mainSection}</td>
                                <td>{item?.subSectionCode}</td>
                                <td>{item?.division}</td>
                                <td>{item?.investmentCode}</td>
                                <td>{item.subSection}</td>
                                <td>{item.nameOfAssured}</td>
                                <td>{item.relation}</td>
                                <td>{item?.city}</td>
                                <td>{item.investment}</td>
                                <td>{item?.paymentDate}</td>
                                <td>{item?.startDate}</td>
                                <td>{item?.endDate}</td>
                                {item.subSectionCode === "13A" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }

                                {item.subSectionCode === "B" ?
                                    <>
                                        <td>{item?.pan}</td>
                                        <td>{item?.landLoardName}</td>
                                        <td>{item?.landLoardAddress}</td>
                                    </> :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                                <td>
                                    {item?.file.map((item, index) => (
                                        <>
                                            <a href={`${url}/file/${item.file}`} target="_blank" rel="noreferrer">Uploaded Document {index + 1}</a>
                                            <br />
                                        </>

                                    ))}
                                </td>
                                <td>{item?.policyNo}</td>
                                <td>{item?.createTimestamp}</td>
                                <td>{item?.editTimestamp}</td>
                                <td>{item?.conversionTimestamp}</td>
                                {investmentType === 'Actual' && <td className={css.status_td}>
                                    {item?.status === 'Reject' ? <span style={{ color: "red", fontWeight: "bold" }}>Reject</span> :
                                        <>
                                            {item?.status}{" "}{item?.resubmissionCounter}
                                            <br />
                                            <div className={css.checkbox_container}>
                                                <h4>Accept</h4>
                                                <input type='checkbox' checked={item.checked1 ? true : false} disabled={item.checked ? true : false} className={css.checkbox1} onClick={() => handleRadioChangeAccpeted(transactions.indexOf(item))} />
                                            </div>
                                            <div className={css.checkbox_container1}>
                                                <h4>Reject</h4>
                                                <input type='checkbox' checked={item.checked ? true : false} disabled={item.checked1 ? true : false} className={css.checkbox} onClick={() => handleRadioChange(transactions.indexOf(item), 'Reject', item)} />
                                            </div>
                                        </>
                                    }

                                </td>}
                                <td>
                                    {item?.accountantsComments}
                                </td>
                                <td>
                                    {item.adjustedInvestment}
                                    <br />
                                    <IconButton disabled={item?.status === 'Reject' || item.checked ? true : false} onClick={() => handleOpenAdjustmentModel(transactions.indexOf(item))}>
                                        <Build />
                                    </IconButton>
                                </td>
                                <td >
                                    {item?.adjustedComments}
                                </td>
                                <td><IconButton onClick={() => handleGetEmployeeContactInfo(item.employeeCode)}><ContactsOutlined fontSize='small' /></IconButton></td>

                                {/* Add more table cells as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={css.pagination}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                {submitButtonState && <div className={css.button_containers}>
                    <button className={css.back_button} onClick={handleBackButton}>Back</button>
                    {investmentType === 'Actual' && <>
                        <button className={css.submit_button2} onClick={handleSubmit}>Submit Rejected</button>
                        <button className={css.submit_button2} onClick={handleSubmitAcceptedTransaction}>Submit Accepted/Resubmitted To SAP</button>
                    </>}

                </div>}

            </div>
            <AdjustmentModel
                openAdjustment={openAdjustment}
                adjustedObjectIndex={adjustedObjectIndex}
                handleCloseAdjustmentModel={handleCloseAdjustmentModel}
                adjustedInvestment={adjustedInvestment}
                adjustedComments={adjustedComments}
                setAdjustedInvestment={setAdjustedInvestment}
                setAdjustedComments={setAdjustedComments}
                adjustedObject={adjustedObject}
                transactions={transactions}
                setTransactions={setTransactions}
            />
            <PastDataModel openPastData={openPastData} handleClosePastDataModel={handleClosePastDataModel} plants={plants} financialYears={financialYears} />
            <ContactInfoModel openContactInfoModal={openContactInfoModal} handleCloseContactInfoModal={handleCloseContactInfoModal} phoneNumber={phoneNumber} />
        </div>
    )
}

export default AccountantPage