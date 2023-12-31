import React, { useState } from 'react';
import LoginPageCSS from "../styles/loginPage.module.css";
import { handleLogin } from '../apis/loginApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SuccessSnackbar from '../components/SuccessSnackbar';
import ErrorSnackbar from '../components/ErrorSnackbar';
import CircularProgress from '@mui/material/CircularProgress';
import logo from "../assests/Logo_main-removebg-preview.png"



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const successMessage = "Logged In Successfully, Redirecting to your Page..."
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className={LoginPageCSS.login_container}>
            <form onSubmit={() => handleLogin(email, password, role, navigate, dispatch, setOpen, setOpenError, setErrorMessage, setLoading)} className={LoginPageCSS.login_form}>
                <img src={logo} width={300} height={100} alt="img" />
                <h3 className={LoginPageCSS.login_form_header}>
                    Employee Investment For Income Tax
                </h3>
                <input
                    type="text"
                    placeholder="Employee Code"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className={LoginPageCSS.role_selector}>
                    <label>
                        <input
                            type="radio"
                            value="Employee"
                            checked={role === 'Employee'}
                            onChange={() => setRole('Employee')}
                        />
                        Employee
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Accountant"
                            checked={role === 'Accountant'}
                            onChange={() => setRole('Accountant')}
                        />
                        Accountant
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Administrator"
                            checked={role === 'Administrator'}
                            onChange={() => setRole('Administrator')}
                        />
                        Administrator
                    </label>
                </div>
                {loading ? <CircularProgress /> : <>
                    {email.length === 0 || password.length === 0 ?
                        <button disabled>Login</button> :
                        <button type="submit" onClick={() => handleLogin(email, password, role, navigate, dispatch, setOpen, setOpenError, setErrorMessage, setLoading)}>
                            Login
                        </button>
                    }
                </>}



            </form>
            <div className={LoginPageCSS.created_by_Container}>
                <h3 ><span style={{ fontWeight: "lighter" }}>Developed By</span> Som Subhra Datta</h3>
                <h3><span style={{ fontWeight: "lighter" }}>Under the guidence of</span> Supriya Roy Kanungoe</h3>
            </div>
            <SuccessSnackbar state={open} setState={setOpen} successMessage={successMessage} />
            <ErrorSnackbar state={openError} setState={setOpenError} errorMessage={errorMessage} />
        </div>
    );
};

export default LoginPage;
