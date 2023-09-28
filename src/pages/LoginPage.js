import React, { useState } from 'react';
import LoginPageCSS from "../styles/loginPage.module.css";
import { handleLogin } from '../apis/loginApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SuccessSnackbar from '../components/SuccessSnackbar';
import ErrorSnackbar from '../components/ErrorSnackbar';
import CircularProgress from '@mui/material/CircularProgress';




const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const successMessage = "Logged In Successfully, Redirecting to your Page..."
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className={LoginPageCSS.login_container}>
            <div className={LoginPageCSS.login_form}>
                <h1 className={LoginPageCSS.login_form_header}>LOGIN</h1>
                <input
                    type="email"
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

                {email.length === 0 || password.length === 0 ?
                    <button disabled>Login</button> :
                    <button onClick={() => handleLogin(email, password, role, navigate, dispatch, setOpen, setOpenError, setErrorMessage)}>
                        Login
                    </button>
                }
            </div>
            <SuccessSnackbar state={open} setState={setOpen} successMessage={successMessage} />
            <ErrorSnackbar state={openError} setState={setOpenError} errorMessage={errorMessage} />
        </div>
    );
};

export default LoginPage;
