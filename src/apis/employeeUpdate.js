import axios from 'axios'
import { url } from "../utils/constants";


export const handleDeleteEmployeeData = async (setLoading) => {
    setLoading(true)
    axios.delete(`${url}/api/employees/deleteAllEmployees`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            alert("Employee Master Table Documents Deleted,Upload the JSON response");
            setLoading(false)
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Network error,Redirecting to Login")
                window.location = "/login"
                return;
            }
            setLoading(false)
        });

};

export const handleUpdateEmployeePlant = async (setLoading) => {
    setLoading(true)
    axios.get(`${url}/api/employees/updateTransactionPlant`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            alert("Plant Update Success");
            setLoading(false)
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Network error,Redirecting to Login")
                window.location = "/login"
                return;
            }
            setLoading(false)
        });

};

export const handleGetEmployeeContact = async (employeeCode, setIsContactInfo, setPhoneNumber) => {
    const postData = {
        employeeCode: employeeCode
    }
    axios.post(`${url}/api/employees/getContactInfo`, postData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            setIsContactInfo(response.data.contactInfo)
            if (response.data.contactInfo === true) {
                setPhoneNumber(response.data.phoneNumber)
            }
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Network error,Redirecting to Login")
                window.location = "/login"
                return;
            }
            console.log(error)
        });

};
export const handleGetEmployeeContactAccountant = async (employeeCode, setPhoneNumber) => {
    const postData = {
        employeeCode: employeeCode
    }
    axios.post(`${url}/api/employees/getContactInfo`, postData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.data.contactInfo === true) {
                console.log("hello")
                setPhoneNumber(response.data.phoneNumber)
            }
            else {
                setPhoneNumber("")
            }
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Network error,Redirecting to Login")
                window.location = "/login"
                return;
            }
            console.log(error)
        });

};

export const handleUpdateEmployeeContact = async (employeeCode, phoneNumber, setIsLoading3) => {
    setIsLoading3(true)
    const postData = {
        employeeCode: employeeCode,
        phoneNumber: phoneNumber
    }
    axios.post(`${url}/api/employees/updateOrCreateEmployeeContact`, postData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            setIsLoading3(false)
            alert("Successfully Contact Details Added/Updated,Window Will Reload")
            window.location.reload();
        })
        .catch(error => {
            if (error.code === "ERR_NETWORK") {
                alert("Network error,Redirecting to Login")
                window.location = "/login"
                return;
            }
            console.log(error)
        });

};