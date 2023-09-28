import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AccountantPage from "./pages/AccountantPage";
import EmployeePage2 from "./pages/EmployeePage2";
import TestPage from "./pages/TestPage";
// import EmployeePage from "./pages/EmployeePage"


const App = () => {
  window.onbeforeunload = function () {
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Employee" element={<EmployeePage2 />} />
        {/* <Route path="/Employee1" element={<EmployeePage />} /> */}
        <Route path="/Administrator" element={<AdminPage />} />
        <Route path="/Accountant" element={<AccountantPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App