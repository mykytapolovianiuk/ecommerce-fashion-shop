import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home.tsx';
import SignIn from "../pages/auth/SignIn/SignIn.tsx";
import SignUp from "../pages/auth/SignUp/SignUp.tsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
