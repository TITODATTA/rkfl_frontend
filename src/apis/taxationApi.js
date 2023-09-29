import axios from "axios";
import { url } from "../utils/constants";

export const handleGetTaxtaion = async (employeeCode, financialYear, setNewEntry, setTaxOption, setIsLoading2) => {
    const postData = {
        employeeCode: employeeCode,
        financialYear: financialYear,
    }
    axios.post(`${url}/api/taxations/checkTaxation`, postData, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            console.log(response)
            setNewEntry(response.data.newEntry)
            setTaxOption(response.data.data.taxOption)
            setIsLoading2(false)
        })
        .catch(error => {
            console.log(error)
            setIsLoading2(false)
        });

};