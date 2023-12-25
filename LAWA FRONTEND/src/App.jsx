import { Routes, Route } from 'react-router-dom';
import Portal from './components/landing/portal.jsx';
import AdminLogin from './components/admin/login/a_Login.jsx';
import AdminDash from './components/admin/dashboard/a_Dashboard.jsx';
import EmploySign from './components/employee/signup/signup.jsx';
import EmployLogin from './components/employee/login/e_Login.jsx';
import EmployDash from './components/employee/dashboard/e_Dashboard.jsx';



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path= "/adminDash" element={<AdminDash />} />
        <Route path="/employSign" element={<EmploySign />} />
        <Route path="/employLogin" element={<EmployLogin />}/>
        <Route path="/employDash" element={<EmployDash />}/>
      </Routes>
    </div>
  );
};

export default App;
