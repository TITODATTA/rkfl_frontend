import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AccountantPage from "./pages/AccountantPage";
import EmployeePage2 from "./pages/EmployeePage2";
import TestPage from "./pages/TestPage";
import NotFoundPage from "./pages/404Page";
// import EmployeePage from "./pages/EmployeePage"


const App = () => {
  window.onbeforeunload = function () {
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Employee" element={<EmployeePage2 />} />
        {/* <Route path="/Employee1" element={<EmployeePage />} /> */}
        <Route path="/Administrator" element={<AdminPage />} />
        <Route path="/Accountant" element={<AccountantPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App