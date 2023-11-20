import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import css from "../styles/adminPage.module.css"
import logo from "../assests/Logo_main-removebg-preview.png"
import { IconButton, Tooltip } from '@mui/material'
import { Logout } from '@mui/icons-material'
import { handleGetFinancialsAdmin, updateInvestmentTypeToActual } from '../apis/financialApi'
import { handleDeleteTaxation, handleDuplicateTaxtationYear } from '../apis/taxationApi'
import { CircularProgress } from '@mui/material'
import { handleCopyTransaction, handleGetAllTransactionForCsv } from '../apis/transactionApi'
import { handleDeleteEmployeeData, handleUpdateEmployeePlant } from '../apis/employeeUpdate'

const AdminPage = () => {
    const user = JSON.parse(sessionStorage.getItem('userData'))
    const role = sessionStorage.getItem('role')
    const [openYear, setOpenYear] = useState("");
    const [taxYear, setTaxYear] = useState('');
    const [investmentType, setInvestmentType] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const [isLoading3, setIsLoading3] = useState(false)
    const [isLoading4, setIsLoading4] = useState(false)
    const [isLoading5, setIsLoading5] = useState(false)
    const [isLoading6, setIsLoading6] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (!role || !user) {
            navigate("/login")
        }
        else if (role !== "Administrator") {
            navigate("/login")
        }
        else {
            handleGetFinancialsAdmin(setOpenYear, setInvestmentType)
        }
    }, [])
    const handleLogout = () => {
        navigate("/login")
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('userData');
    }

    const handleChangeToActual = () => {
        const confirmed = window.confirm('Are You sure you want to change the investment schedule to ACTUAL');
        if (confirmed) {
            updateInvestmentTypeToActual()
        }
    }
    const handleDuplicateTaxation = () => {
        const confirmed = window.confirm('Are You sure you want to duplicate the entries for the New Financial Year?');
        if (confirmed) {
            handleDuplicateTaxtationYear(parseInt(openYear) + 1, setIsLoading)
        }
    }

    const handleActualToProvisionalConverstion = () => {
        const confirmed = window.confirm('Are you sure you want to convert the entries for the New Financial Year');
        if (confirmed) {
            handleCopyTransaction(openYear, setIsLoading2)
        }
    }

    const handleYearChange = (e) => {
        // Remove non-numeric characters and limit to 4 digits
        const inputYear = e.target.value.replace(/\D/g, '').slice(0, 4);
        setTaxYear(inputYear);
    };

    return (
        <div className={css.page_container}>
            <div className={css.header_container}>
                <div className={css.logo_container}>
                    <img src={logo} width="100%" height="100%" alt="img" />
                </div>
                <h1 className={css.welcome_tag}>
                    Administrator Dashboard
                </h1>
                <div className={css.logout_button_container}>
                    <Tooltip title="Log out" placement="left">
                        <IconButton className={css.logout_button} onClick={() => handleLogout()} >
                            <Logout />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className={css.personal_info_container}>
                <h3>Name :- {user?.employeeName}</h3>
                <h3>Employee Code :- {user?.employeeCode}</h3>
                <h3>Department :- {user?.department}</h3>
                <h3>Designation :- {user?.designation}</h3>
                <h3>Plant :- {user?.plant}</h3>

            </div>
            <h3 className={css.container_header}>
                Current Financial Year :- {openYear}
                <p style={{ fontWeight: "lighter" }}>Note :<span style={{ color: "red" }}>Step 1 </span> : Duplicate ,<span style={{ color: "red" }}>Step 2</span>: Convert,<span style={{ color: "red" }}>Step 3 </span>: Change In MongoCompass</p>
            </h3>
            <div className={css.functional_container}>
                <div className={css.left_container}>
                    <div className={css.investment_container}>
                        <h3>Investment Schedule : <span style={{ color: "blue" }}>
                            {investmentType.toUpperCase()}
                        </span>
                        </h3>
                        {investmentType === 'provisional' &&
                            <button onClick={() => { handleChangeToActual() }}
                            >Change To Actual
                            </button>
                        }

                    </div>
                    {investmentType === 'actual' &&
                        <div className={css.investment_container2}>
                            <h3>Duplication of Taxation Data of All Employees For New Financial Year</h3>
                            <button onClick={() => handleDuplicateTaxation()}>
                                {isLoading ? <CircularProgress size={20} /> : "Duplicate"}
                            </button>
                        </div>}
                    {investmentType === 'actual' &&
                        <div className={css.investment_container2}>
                            <h3>Conversion of Actual to Provisional Investments for New Financial Year</h3>
                            <button onClick={() => handleActualToProvisionalConverstion()}>
                                {isLoading2 ? <CircularProgress size={20} /> : "Convert To Provisional"}
                            </button>
                        </div>}
                    {investmentType === 'actual' && <div className={css.investment_container1}>
                        <h3>
                            <span style={{ color: "red" }}>Reminder:</span>
                            <br />
                            <span style={{ color: "red" }}>Close</span> Year {openYear} and <span style={{ color: "blue" }}>Open</span> Year {parseInt(openYear) + 1} ON MONGO DB COMPASS(Hit Reload once done)
                        </h3>
                    </div>}
                    <div className={css.investment_container3}>
                        <h3>Create Your CSV/JSON Data In MongoDb Compass</h3>
                        <button onClick={() => handleGetAllTransactionForCsv(setIsLoading3)}>
                            {isLoading3 ? <CircularProgress size={20} /> : "Create"}
                        </button>
                    </div>
                </div>
                <div className={css.right_container}>
                    <div className={css.investment_container}>
                        <h3>Update <span style={{ color: "red" }}>Employee</span> Master Table(UPLOAD JSON IN MONGO)</h3>
                        <button onClick={() => handleDeleteEmployeeData(setIsLoading4)}>
                            {isLoading4 ? <CircularProgress size={20} /> : "Update"}
                        </button>
                    </div>
                    <div className={css.investment_container3}>
                        <h3>Updatation/Checking of <span style={{ color: "red" }}>Plant</span> after Employee Master Table Updation</h3>
                        <button onClick={() => handleUpdateEmployeePlant(setIsLoading6)}>
                            {isLoading6 ? <CircularProgress size={20} /> : "Check/update"}
                        </button>
                    </div>
                    <div className={css.investment_container3}>
                        <h3>Update <span style={{ color: "red" }}>Taxation</span> Master Table(UPLOAD JSON IN MONGO)</h3>
                        <input
                            type="text"  // Use type 'text' to allow maxlength
                            inputMode="numeric"
                            placeholder="Enter the Year"
                            value={taxYear}
                            onChange={handleYearChange}
                        />
                        <button disabled={taxYear.length === 0 ? true : false} onClick={() => handleDeleteTaxation(taxYear, setIsLoading5, setTaxYear)}>
                            {isLoading5 ? <CircularProgress size={20} /> : "Update"}
                        </button>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default AdminPage