import axios from 'axios'
import { setUser } from '../state/userSlice'

const url = process.env.REACT_APP_BASE_URL
export const handleLogin = async (email, password, role, navigate, dispatch, setOpen, setOpenError, setErrorMessage) => {
    if (!/^\d+$/.test(email)) {
        setOpenError(true)
        setErrorMessage("Employee Code should only contain numbers.");
        return;
    }

    const userData = {
        employeeCode: parseInt(email), // Convert the email to an integer
        loginPassword: password,
        userRole: role
    };

    axios.post(`${url}/api/employees/login`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            setOpen(true)
            sessionStorage.setItem('role', response.data.role);
            sessionStorage.setItem('userData', JSON.stringify(response.data.data));
            dispatch(setUser(response.data));
            setTimeout(() => {
                navigate(`/${role}`);
            }, 1500);


        })
        .catch(error => {
            setOpenError(true)
            setErrorMessage(error.response.data.error);
        });

};