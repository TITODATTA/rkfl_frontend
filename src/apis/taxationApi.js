import axios from "axios";
import { url } from "../utils/constants";

export const handleGetTaxtaion = async (employeeCode, financialYear, setNewEntry, setTaxOption, setIsLoading2) => {
    const postData = {
        employeeCode: employeeCode,
        financialYear: parseInt(financialYear)
    }
    axios.post(`${url}/api/taxations/checkTaxation`, postData, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            setNewEntry(response.data.newEntry)
            setTaxOption(response?.data?.data?.taxOption)
            setIsLoading2(false)
        })
        .catch(error => {
            alert("Server Error")
            console.log(error)
            setIsLoading2(false)
        });

};

export const handleCreateTaxtaion = async (employeeCode, financialYear, taxOption) => {
    const postData = {
        employeeCode: employeeCode,
        financialYear: parseInt(financialYear),
        taxOption: taxOption === "option1" ? 1 : 2
    }
    axios.post(`${url}/api/taxations/createTaxation`, postData, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            alert("Taxation created successfully")
            window.location.reload();
        })
        .catch(error => {
            alert("Server Error")
            console.log(error)
        });

};


export const handleDuplicateTaxtationYear = async (financialYear, setIsLoading) => {
    setIsLoading(true)
    const postData = {
        financialYear: financialYear,
    }
    axios.post(`${url}/api/taxations/copy`, postData, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            setIsLoading(false)
            alert("Dataset copied successfully for this financial year")
        })
        .catch(error => {
            alert("Server Error")
            setIsLoading(false)
            console.log(error)
        });

};