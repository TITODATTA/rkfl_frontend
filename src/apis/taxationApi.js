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
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
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
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
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
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                return;
            }
            setIsLoading(false)
            console.log(error)
        });

};

export const handleDeleteTaxation = async (financialYear, setIsLoading, setTaxYear) => {
    const convertedYear = parseInt(financialYear)
    setIsLoading(true)
    axios.delete(`${url}/api/taxations/delete?financialYear=${convertedYear}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            setIsLoading(false)
            alert(`Financial year ${financialYear} is  deleted successfully`)
            setTaxYear("")
        })
        .catch(error => {
            setIsLoading(false)
            if (error.code === "ERR_NETWORK") {
                alert("Server Error:Redirecting To Login")
                window.location = "/login"
                setTaxYear("")
                return;
            }
            if (error.response.data.error === "Financial year is required") {
                alert("Financial year is Invalid")
                setTaxYear("")
            }
            console.log(error)
        });

}