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
                console.log("There is no financial entry with Open")
            }
        })
        .catch(error => {
            console.log(error)
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
                console.log("There is no financial entry with Open")
            }
        })
        .catch(error => {
            console.log(error)
        });

};