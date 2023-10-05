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