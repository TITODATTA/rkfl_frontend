import axios from 'axios'
import { setUser } from '../state/userSlice'
import { url } from "../utils/constants";
export const handleLogin = async (email, password, role, navigate, dispatch, setOpen, setOpenError, setErrorMessage, setLoading) => {
    setLoading(true)
    if (!/^\d+$/.test(email)) {
        setOpenError(true)
        setErrorMessage("Employee Code should only contain numbers.");
        setLoading(false)
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
            if (error.code === "ERR_NETWORK") {
                setErrorMessage("Network Error");
                setOpenError(true)
                setLoading(false)
                return;
            }
            setOpenError(true)
            setErrorMessage(error.response.data.error);
            setLoading(false)
        });

};