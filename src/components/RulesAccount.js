import React from 'react'
import css from '../styles/accountantPage.module.css'

const RulesAccount = () => {
    return (
        <div className={css.rules_container}>
            <h3>Instructions To Follow</h3>
            <h5>1) To view investment, select <span style={{ color: "blue" }}>Plant,Investment Schedule,Main Section(All Three are required),</span>
                then click on "Submit" button to view
            </h5>
            <h5>To change the view of investments click the "Back" button</h5>
            <h5>2)<span style={{ color: "blue" }}>Provisional</span>  Investment is View-Only Data</h5>
            <h5>3)Number of Entries Per Page : -Number of Invesment you want to see per page </h5>
            <h5>4)Rejected/Accepted/Resubmitted/New Actual Entry Filter Options will appear only for<span style={{ color: "blue" }}>Actual Investments</span>
                <p style={{ marginLeft: "20px" }}>
                    <span style={{ color: "red" }}>&#8226; Rejected:</span>Invesment Rejected By Accounts
                </p>
                <p style={{ marginLeft: "20px" }}>
                    <span style={{ color: "green" }}>&#8226; Accepted:</span>Invesment Accepted By Accounts
                </p>
                <p style={{ marginLeft: "20px" }}>
                    <span style={{ color: "brown" }}>&#8226; Resubmitted:</span>Rejected Invesment Resubmitted By Employee
                </p>
                <p style={{ marginLeft: "20px" }}>
                    <span style={{ color: "green" }}>&#8226; New Actual Entry:</span>New Entry After Last Acceptence by Accounts
                </p>
            </h5>
            <h5>5)Checkbox of the Status is only for Rejected.If not checked,it will imply<span style={{ color: "green" }}>Accepted</span> </h5>
            <h5>6)<span style={{ color: "red" }}>Rejected </span>Investments needs to Submitted first , before Submitting <span style={{ color: "green" }}>Accepted/Resubmitted</span> Investments</h5>
        </div>
    )
}

export default RulesAccount