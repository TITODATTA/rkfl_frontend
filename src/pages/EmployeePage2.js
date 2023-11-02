import { useEffect, useState } from 'react'
import empPageCss from "../styles/employeePage2.module.css"
import logo from "../assests/Logo_main-removebg-preview.png"
import { useNavigate } from "react-router-dom"
import { handleGetFinancials } from '../apis/financialApi'
import { handleGetSection } from '../apis/sectionApi'
import MainSectionTable from '../components/MainSectionTable'
import { IconButton, Tooltip } from '@mui/material'
import { Edit, Logout } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress';
import Rules from '../components/Rules'
import { handleCreateTaxtaion } from '../apis/taxationApi'
import { handleDownloadCsv } from '../utils/mainSectionTableFunction'
import { handleGetInvestmentRejectedTransaction, handleGetInvestmentTransaction } from '../apis/transactionApi'
import { handleGetEmployeeContact, handleUpdateEmployeeContact } from '../apis/employeeUpdate'

const EmployeePage2 = () => {
    const role = sessionStorage.getItem('role')
    const user = JSON.parse(sessionStorage.getItem('userData'))
    const [openyear, setOpenYear] = useState("")
    const [mainSection, setMainSection] = useState("")
    const [subSection, setSubSection] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption1, setSelectedOption1] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const [isLoading3, setIsLoading3] = useState(false)
    const [rows, setRows] = useState([]);
    const [newEntry, setNewEntry] = useState(false)
    const [taxOption, setTaxOption] = useState("")
    const [invesment80C, setInvestment80C] = useState(0)
    const [invesment80D, setInvestment80D] = useState(0)
    const [invesment10, setInvestment10] = useState(0)
    const [invesment24, setInvestment24] = useState(0)
    const [isContactInfo, setIsContactInfo] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [rejected80C, setRejected80C] = useState([])
    const [rejected80D, setRejected80D] = useState([])
    const [rejected10, setRejected10] = useState([])
    const [rejected24, setRejected24] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!role || !user) {
            navigate("/login")
        }
        else if (role !== "Employee") {
            navigate("/login")
        }
        else {
            handleGetFinancials(
                setOpenYear,
                setSelectedOption,
                user.employeeCode,
                setNewEntry,
                setTaxOption,
                setIsLoading2,
                setInvestment80C,
                setInvestment80D,
                setInvestment10,
                setInvestment24,
                setRejected80C,
                setRejected80D,
                setRejected10,
                setRejected24
            )
            handleGetEmployeeContact(user.employeeCode, setIsContactInfo, setPhoneNumber)
        }
    }, [])

    const handleChangePhoneNumber = (e) => {
        const number = e.target.value.replace(/\D/g, '').slice(0, 10);
        setPhoneNumber(number);
    }

    const handlePhoneNumberUpdate = () => {
        if (phoneNumber.length < 10) {
            alert("Phone number cannot be less than 10 digits")
        }
        else {
            handleUpdateEmployeeContact(user.employeeCode, phoneNumber, setIsLoading3)
        }
    }


    const handleChangeMainSection = (e) => {
        setIsLoading(true)
        setMainSection(e.target.value)
        handleGetSection(e.target.value, setSubSection, setIsLoading)
    }
    const handleLogout = () => {
        navigate("/login")
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('userData');
    }
    return (
        <>
            {isLoading2 ? <div className={empPageCss.loader_container}><CircularProgress /></div> : <div className={empPageCss.main_container}>
                <div className={empPageCss.header_container}>
                    <div className={empPageCss.logo_container}>
                        <img src={logo} width="100%" height="100%" alt="img" />
                    </div>
                    <h1 className={empPageCss.welcome_tag}>Welcome {user?.employeeName} ({selectedOption.toUpperCase(1)})</h1>
                    <div className={empPageCss.logout_button_container}>
                        <Tooltip title="Log out" placement="left">
                            <IconButton className={empPageCss.logout_button} onClick={handleLogout}>
                                <Logout />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className={empPageCss.information_container}>
                    <div className={empPageCss.left_information}>
                        <div className={empPageCss.emp_info_container}>
                            <div className={empPageCss.emp_info_left}>
                                <h3 className={empPageCss.emp_info_h3}>Employee Code :<span>{user?.employeeCode}</span> </h3>
                                <h3 className={empPageCss.emp_info_h3}>Name : <span>{user?.employeeName}</span></h3>
                                <h3 className={empPageCss.emp_info_h3}>Date of Joining : <span>{user?.dateOfJoining}</span></h3>
                                <h3 className={empPageCss.emp_info_h3}>Plant : <span>{user?.plant}</span></h3>
                            </div>
                            <div className={empPageCss.emp_info_right}>
                                <h3 className={empPageCss.emp_info_h3}>P.A.N. : <span>{user?.panNumber}</span></h3>
                                <h3 className={empPageCss.emp_info_h3}>Designation : <span>{user?.designation}</span></h3>
                                <h3 className={empPageCss.emp_info_h3}>Phone Number : <span>+91 {user?.phoneNumber}</span></h3>
                            </div>
                        </div>
                        <div className={empPageCss.first_entry_details_container}>
                            <div className={empPageCss.first_entry_container}>
                                <div className={empPageCss.first_entry_left}>
                                    <div className={empPageCss.text_container1}>
                                        <h4>Financial Year</h4>
                                    </div>
                                    <div className={empPageCss.text_container2}>
                                        <h4>Taxation Option</h4>
                                    </div>
                                </div>
                                <div className={empPageCss.first_entry_right}>
                                    <div className={empPageCss.year_container}>
                                        <h4>{openyear}</h4>
                                    </div>
                                    {newEntry ?
                                        <div className={empPageCss.tax_option_container}>
                                            <div
                                                className={`${empPageCss.tax_option2} ${selectedOption1 === 'option2' ? empPageCss.selected_option : ''
                                                    }`}
                                            >
                                                <h4>Taxation is Not yet Updated in SAP</h4>
                                            </div>
                                        </div> :
                                        <div className={empPageCss.tax_option_container}>
                                            <div
                                                className={`${empPageCss.tax_option2} ${selectedOption1 === 'option2' ? empPageCss.selected_option : ''
                                                    }`}
                                            >
                                                {taxOption === 1 ? <h4 style={{ color: 'blue' }}>Option 1 (Tax rates as per old regime)</h4> :
                                                    <h4 style={{ color: 'red' }}>Option 2 (Tax rates as per new regime)</h4>}
                                            </div>
                                        </div>}
                                </div>
                            </div>
                            <div className={empPageCss.first_entry_container1}>
                                <div className={empPageCss.first_entry_left}>
                                    <h4 style={{ textAlign: "center" }}>Total Investment Details({selectedOption.toUpperCase()})</h4>
                                    <table className={empPageCss.table_container_invesment}>
                                        <thead>
                                            <tr>
                                                <th>Section 80C</th>
                                                <th>Section 80D</th>
                                                <th>Section 10</th>
                                                <th>Section 24</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{invesment80C}</td>
                                                <td>{invesment80D}</td>
                                                <td>{invesment10}</td>
                                                <td>{invesment24}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ marginTop: "10px" }}>
                                    <h5 style={{ marginTop: "10px", marginRight: "10px" }}>Contact Info(For Accountant Communication) :</h5>
                                    <h6 style={{ color: 'red' }}>*To Update the Phone Number ,click on 'Update' button , to enable the input field</h6>
                                    <div style={{ marginTop: "10px" }}>
                                        <input type='text' value={phoneNumber} disabled={isContactInfo ? true : false} onChange={(e) => handleChangePhoneNumber(e)} />
                                        {isLoading3 ? <CircularProgress size={20} /> :
                                            <>{isContactInfo ? <button style={{ marginLeft: "10px" }} onClick={() => setIsContactInfo(false)}>Update</button>
                                                : <button style={{ marginLeft: "10px" }} onClick={handlePhoneNumberUpdate}>Add/Update</button>}</>}



                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={empPageCss.error_container}>
                            {rejected80C.length !== 0 && <h4>Section 80C : -<span style={{ color: "red" }}>{rejected80C.length} Rejected </span></h4>}
                            {rejected80D.length !== 0 && <h4>Section 80D : -<span style={{ color: "red" }}>{rejected80D.length} Rejected </span></h4>}
                            {rejected10.length !== 0 && <h4>Section 10 : -<span style={{ color: "red" }}>{rejected10.length} Rejected </span></h4>}
                            {rejected24.length !== 0 && <h4>Section 24 : -<span style={{ color: "red" }}>{rejected24.length} Rejected </span></h4>}
                        </div>

                    </div>
                    <div className={empPageCss.right_information}>
                        {taxOption === 1 && <Rules selectedOption={selectedOption} />}

                    </div>
                </div>



                {selectedOption1.length !== 0 &&
                    <div className={empPageCss.submit_button_container}>
                        <button onClick={() => handleCreateTaxtaion(user?.employeeCode, openyear, selectedOption1)}>SUBMIT</button>
                    </div>}

                {taxOption === 1 &&
                    <div className={empPageCss.second_entry_container}>
                        <div className={empPageCss.second_entry_left}>
                            <div className={empPageCss.investment_schedule_container}>
                                <div className={empPageCss.investment_schedule_text}>
                                    <h3>Investment Schedule</h3>
                                </div>
                                <div className={empPageCss.investment_schedule_option_container}>
                                    <h4>Details Will be Submitted in <span style={selectedOption === "provisional" ? { color: "red" } : { color: "blue" }}>{selectedOption}</span> State</h4>
                                </div>
                            </div>
                            <div className={empPageCss.main_section_container}>
                                {rows.length !== 0 ?
                                    <select disabled className={empPageCss.custom_select} value={mainSection} onChange={(e) => handleChangeMainSection(e)}>
                                        <option value="" disabled hidden selected>Choose Your Main Section</option>
                                        <option value="Section 80C" >Section 80C</option>
                                        <option value="Section 80D">Section 80D</option>
                                        <option value="Section 10">Section 10</option>
                                        <option value="Section 24">Section 24</option>
                                        {/* Add more options */}
                                    </select> :
                                    <select className={empPageCss.custom_select} value={mainSection} onChange={(e) => handleChangeMainSection(e)}>
                                        <option value="" disabled hidden selected>Choose Your Main Section</option>
                                        <option value="Section 80C" >Section 80C</option>
                                        <option value="Section 80D">Section 80D</option>
                                        <option value="Section 10">Section 10</option>
                                        <option value="Section 24">Section 24</option>
                                        {/* <option value="Section 80CCD">Section 80CCD</option> */}
                                        {/* Add more options */}
                                    </select>}

                            </div>
                            <div className={empPageCss.csv_download_container}>
                                <a onClick={() => handleDownloadCsv()}>Download Investment Details submitted till Date</a>
                            </div>
                        </div>
                        <div className={empPageCss.second_entry_right}>
                            <div className={empPageCss.tableContainer}>
                                <div className={empPageCss.tableHeader}>
                                    {selectedOption.length !== 0 &&
                                        <h3>{mainSection}</h3>}
                                </div>
                                {mainSection.length !== 0 && selectedOption.length !== 0 &&
                                    < MainSectionTable rows={rows} setRows={setRows} subSection={subSection}
                                        mainSection={mainSection} selectedOption={selectedOption} openyear={openyear}
                                        doj={user?.dateOfJoining} phoneNumber={phoneNumber}
                                    />}
                            </div>
                        </div>
                    </div>}
                {taxOption === 2 &&
                    <div className={empPageCss.second_entry_container}>
                        <div className={empPageCss.second_entry_left}>
                            <div className={empPageCss.investment_schedule_container}>
                                <div className={empPageCss.investment_schedule_text}>
                                    <h3>Investment Schedule</h3>
                                </div>
                                <div className={empPageCss.investment_schedule_option_container}>
                                    <h4>Details Will be Submitted in <span style={selectedOption === "provisional" ? { color: "red" } : { color: "blue" }}>{selectedOption}</span> State</h4>
                                </div>
                            </div>
                            <div className={empPageCss.main_section_container}>
                                {rows.length !== 0 ?
                                    <select disabled className={empPageCss.custom_select} value={mainSection} onChange={(e) => handleChangeMainSection(e)}>
                                        <option value="" disabled hidden selected>Choose Your Main Section</option>
                                        <option value="Section 80D">Section 80D</option>
                                        {/* Add more options */}
                                    </select> :
                                    <select className={empPageCss.custom_select} value={mainSection} onChange={(e) => handleChangeMainSection(e)}>
                                        <option value="" disabled hidden selected>Choose Your Main Section</option>
                                        <option value="Section 80D">Section 80D</option>
                                        {/* <option value="Section 80CCD">Section 80CCD</option> */}
                                        {/* Add more options */}
                                    </select>}

                            </div>
                            <div className={empPageCss.csv_download_container}>
                                <a onClick={() => handleDownloadCsv()}>Download Investment Details submitted till Date</a>
                            </div>
                        </div>
                        <div className={empPageCss.second_entry_right}>
                            <div className={empPageCss.tableContainer}>
                                <div className={empPageCss.tableHeader}>
                                    {selectedOption.length !== 0 &&
                                        <h3>{mainSection}</h3>}
                                </div>
                                {mainSection.length !== 0 && selectedOption.length !== 0 &&
                                    < MainSectionTable rows={rows} setRows={setRows} subSection={subSection}
                                        mainSection={mainSection} selectedOption={selectedOption} openyear={openyear}
                                        doj={user?.dateOfJoining} phoneNumber={phoneNumber} taxOption={taxOption}
                                    />}
                            </div>
                        </div>
                    </div>}

            </div>}


        </>

    )
}

export default EmployeePage2