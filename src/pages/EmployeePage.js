import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import employePageCss from "../styles/employeePage.module.css"
import { handleGetFinancials } from '../apis/financialApi'
// import LifeInsuranceTable from '../components/LifeInsuranceTable'
// import NscTable from '../components/NscTable'

const EmployeePage = () => {
    const user = useSelector(state => state.user);
    const role = localStorage.getItem('role')
    const navigate = useNavigate()
    const [showDec, setShowDec] = useState(false)
    const [showProv, setShowProv] = useState(false)
    const [openyear, setOpenYear] = useState("")
    const [selectedFileName, setSelectedFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = () => {
        const file = fileInputRef.current.files[0];
        setSelectedFileName(file.name);
    };

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };
    // useEffect(() => {
    //     if (!role || user === null) {
    //         navigate("/login")
    //     }
    //     else if (role !== "Employee") {
    //         navigate("/login")
    //     }
    //     else {
    //         handleGetFinancials(setOpenYear)
    //     }
    // }, [])
    return (
        <div className={employePageCss.main_container}>
            <div className={employePageCss.header_container}>
                <div className={employePageCss.logo_container}>Logo</div>
                <h1 className={employePageCss.welcome_tag}>Welcome {user?.data?.employeeName} </h1>
            </div>
            <div className={employePageCss.tableContainer}>
                <div className={employePageCss.leftElement}>
                    <div className={employePageCss.buttonWrapper}>
                        <button className={employePageCss.custom_button} onClick={() => setShowDec(!showDec)}>Financial Year:{openyear}</button>
                        {/* <hr className={employePageCss.vertical_line} /> */}
                        {showDec &&
                            <div className={employePageCss.sub_buttons}>
                                <button className={employePageCss.sub_button} onClick={() => setShowProv(!showProv)}>Provisional Declaration</button>
                                <button className={employePageCss.sub_button}>Actual Declaration</button>
                            </div>}
                    </div>
                </div>
                {showProv && <div className={employePageCss.rightElement}>
                    <div className={employePageCss.rightElement_header_container}>
                        <h3>PROVISIONAL INCOME TAX DECLARATION FOR FINANCIAL YEAR - APRIL 2023 - MARCH 2024</h3>
                    </div>
                    <div className={employePageCss.form_container}>
                        <div className={employePageCss.basic_info_container}>
                            <div className={employePageCss.basic_info_left}>
                                <div className={employePageCss.basic_info_1}>
                                    <h4>Name : {user?.data?.employeeName}</h4>
                                    <h4>Employee Code : {user?.data?.employeeCode}</h4>
                                    <h4>Date of Joining : {user?.data?.dateOfJoining.substring(0, 10)}</h4>
                                </div>
                            </div>
                            <div className={employePageCss.basic_info_right}>
                                <div className={employePageCss.basic_info_1}>
                                    <h4>P.A.N. NO : {user?.data?.panNumber}</h4>
                                    <h4>Designation : {user?.data?.designation}</h4>
                                    <h4>Phone Number : 999999999999</h4>
                                </div>
                            </div>
                        </div>
                        <div className={employePageCss.textBreaker1}>
                            <h4>To <br />The Accounts Dept.<br /><span className={employePageCss.textBreaker1Span}>I hereby declare that I have opted option calculation of Income Tax as given below : **</span></h4>
                        </div>
                        <div className={employePageCss.tax_info_container}>
                            <div className={employePageCss.tax_info_left}>
                                <div className={employePageCss.tax_info_option}>
                                    <h4 className={employePageCss.optionh4}>I) Option 1 (Tax rates as per old regime)</h4>
                                    <input type='checkbox' />
                                </div>
                            </div>
                            <div className={employePageCss.tax_info_right}>
                                <div className={employePageCss.tax_info_option}>
                                    <h4 className={employePageCss.optionh4}>II) Option 2 (Tax rates as per new regime)</h4>
                                    <input type='checkbox' />
                                </div>
                            </div>
                        </div>
                        <h4 className={employePageCss.textBreaker2}>
                            I hereby also declare that I have paid/contributed /intend to pay or contribute out of my Income Chargeable to Income-tax, the following as shown under each head, which may please be considered while calculating TDS from Salary.
                        </h4>
                        <div className={employePageCss.rest_info_container}>
                            <div className={employePageCss.rest_info_left}>
                                <div className={employePageCss.rebates_container}>
                                    <h4>I) REBATES</h4>
                                    {/* <LifeInsuranceTable /> */}
                                    <div className={employePageCss.childrenInfo}>
                                        <text><span style={{ fontWeight: "bold" }}>2.Additional Provident Fund Contribution</span> (apart from actual Deduction)</text>
                                        <input type='text' />
                                    </div>
                                    <div className={employePageCss.childrenInfo}>
                                        <text><span style={{ fontWeight: "bold" }}>3.Public Provident Fund
                                        </span> (Self spouse or Minor)</text>
                                        <input type='text' />
                                    </div>
                                    {/* <NscTable /> */}
                                    <div className={employePageCss.childrenInfo}>
                                        <text><span style={{ fontWeight: "bold" }}>4.National Saving Certificate
                                        </span> (New) </text>
                                        <input type='text' />
                                    </div>
                                    <div className={employePageCss.childrenInfo}>
                                        <text style={{ fontWeight: "bold" }}>5.Repayment of Home Loan Principal Amt.
                                        </text>
                                        <input type='text' />
                                    </div>
                                    <div className={employePageCss.childrenInfo}>
                                        <text><span style={{ fontWeight: "bold" }}>6.Expenses Actually paid as Tution Fees</span> for Children carrying out Full time Education
                                        </text>
                                        <input type='text' />
                                    </div>
                                    <div className={employePageCss.childrenInfo}>
                                        <text><span style={{ fontWeight: "bold" }}>7.Unit Linked Insurance Plan
                                        </span> (Self,Spouse)
                                        </text>
                                        <input type='text' />
                                    </div>
                                    <div className={employePageCss.childrenInfo}>
                                        <text style={{ fontWeight: "bold" }}> 8.Sukanya Samriddhi Yojana
                                        </text>
                                        <input type='text' />
                                    </div>
                                </div>

                            </div>
                            <div className={employePageCss.rest_info_right}>
                                <div className={employePageCss.exemptions_container}>
                                    <h4>III) EXEMPTIONS</h4>
                                    <h4 className={employePageCss.exemptions_breakerText}>1) U/s 10(14)</h4>
                                    <div className={employePageCss.childrenInfo}>
                                        <text>a) Rs.100 p.m per child to a max of two Children subject to Children Education Allowance received</text>
                                        <input type='text' />
                                    </div>
                                    <div className={employePageCss.childrenInfo}>
                                        <text>b) Rs.300 p.m per child to a max of two Children subject to Children Education Allowance received (for Hostel Expenses)</text>
                                        <input type='text' />
                                    </div>
                                    <h4 className={employePageCss.exemptions_breakerText}>2) 13(A)</h4>
                                    <text>For Employees receiving HRA Please mention the <span style={{ fontWeight: "bold" }}>Actual Rent Paid</span></text>
                                    <div className={employePageCss.LandordInfo}>
                                        <text style={{ fontWeight: "bold" }}>PAN of Landload if Greater Then Rs. 1 Lac/Year</text>
                                        <input type='text' />
                                    </div>
                                    <div className={employePageCss.LandordInfo}>
                                        <text>Name Of Landord</text>
                                        <input type='text' />
                                    </div>
                                    <div className={employePageCss.LandordInfo}>
                                        <text >Address Of Landord</text>
                                        <input type='text' />
                                    </div>
                                    <div className={employePageCss.LandordInfo}>
                                        <text style={{ fontWeight: "bold" }}>Address of Rented House (City Name)
                                        </text>
                                        <input type='text' />
                                    </div>
                                </div>
                                <div className={employePageCss.empJoin_container}>
                                    <h4>IV) EMPLOYEES JOINED IN CURRENT FINANCIAL YEAR</h4>
                                    <div className={employePageCss.childrenInfo}>
                                        <text>Salary Drawn in this Financial Year from Ex-employer
                                        </text>
                                        <input type='text' />
                                    </div>
                                    <div className={employePageCss.childrenInfo}>
                                        <text>Tax Deducted in this Financial Year from Ex-employer
                                        </text>
                                        <span style={{ fontWeight: "bold", marginLeft: "10px" }}>Rs .</span><input type='text' />
                                    </div>
                                    <div className={employePageCss.childrenInfo}>
                                        <text>Please give documentary evidence of income &  tax deducted thereon (Form No:16)
                                        </text>
                                        <input
                                            type="file"
                                            className={employePageCss.fileInput}
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        />
                                        <button
                                            className={employePageCss.fileButton}
                                            onClick={handleFileButtonClick}
                                        >
                                            {selectedFileName.length === 0 ? "Select File" : "Change File"}
                                        </button>
                                        <span className={employePageCss.fileName}>{selectedFileName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

            </div>
        </div >
    )
}

export default EmployeePage