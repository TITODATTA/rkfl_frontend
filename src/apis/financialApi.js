import axios from "axios";
import { handleGetTaxtaion } from "./taxationApi";
import { url } from "../utils/constants";


export const handleGetFinancials = async (setOpenYear, setSelectedOption, employeeCode, setNewEntry, setTaxOption, setIsLoading2) => {
    setIsLoading2(true)
    axios.get(`${url}/api/financials/getFinancials`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const financials = response.data.financials;

            // Find the financial entry with status "Open"
            const openFinancial = financials.find(financial => financial.status === "Open");
            if (openFinancial) {
                setOpenYear(openFinancial.financialYear);
                setSelectedOption(openFinancial.investmentType);
                handleGetTaxtaion(employeeCode, openFinancial.financialYear, setNewEntry, setTaxOption, setIsLoading2)
            }
            else {
                alert("There is no financial entry with Open,So you cannot access the site , Redirecting To Login")
                window.location = "/login"
            }
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            console.log("Server Error")

        });

};

export const handleGetFinancialsAccountant = async (setOpenYear) => {
    axios.get(`${url}/api/financials/getFinancials`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const financials = response.data.financials;

            // Find the financial entry with status "Open"
            const openFinancial = financials.find(financial => financial.status === "Open");
            if (openFinancial) {
                setOpenYear(openFinancial.financialYear);
            }
            else {
                alert("There is no financial entry with Open,So you cannot access the site , Redirecting To Login")
                window.location = "/login"
            }
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            alert("Server Error")
        });

};

export const handleGetFinancialsAdmin = async (setOpenYear, setInvestmentType) => {
    axios.get(`${url}/api/financials/getFinancials`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const financials = response.data.financials;

            // Find the financial entry with status "Open"
            const openFinancial = financials.find(financial => financial.status === "Open");
            if (openFinancial) {
                setOpenYear(openFinancial.financialYear);
                setInvestmentType(openFinancial.investmentType);
            }
            else {
                alert("There is no financial entry with Open")
                return;
            }
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            alert("Server Error")
        });

};

export const updateInvestmentTypeToActual = () => {
    axios.put(`${url}/api/financials/updateInvestmentTypeToActual`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Admin"
        }
    })
        .then(response => {
            alert("Investment type Updated successfully, Window Will Reload")
            window.location.reload();
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            alert("Server Error")
        });
}