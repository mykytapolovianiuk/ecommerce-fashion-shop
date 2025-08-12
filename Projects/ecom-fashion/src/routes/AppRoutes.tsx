import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home.tsx';
import SignIn from "../pages/auth/SignIn/SignIn.tsx";
import SignUp from "../pages/auth/SignUp/SignUp.tsx";
import {AuthProvider} from "../context/AuthContext.tsx";
import Shop from "../pages/Shop/Shop.tsx";
import Product from "../pages/Product/Product.tsx";

const AppRoutes = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/products' element={<Product/>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
   </AuthProvider>
  );
};

export default AppRoutes;
