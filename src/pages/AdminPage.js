import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

const AdminPage = () => {
    const user = useSelector(state => state.user);
    const role = localStorage.getItem('role')
    const navigate = useNavigate()
    useEffect(() => {
        if (!role) {
            navigate("/login")
        }
        else if (role !== "Administrator") {
            navigate("/login")
        }
    }, [])
    return (
        <div>AdminPage</div>
    )
}

export default AdminPage