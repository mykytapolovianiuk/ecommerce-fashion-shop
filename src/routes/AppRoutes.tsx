import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home.tsx';
import SignIn from "../pages/auth/SignIn/SignIn.tsx";
import SignUp from "../pages/auth/SignUp/SignUp.tsx";
import {AuthProvider} from "../context/AuthContext.tsx";
import Shop from "../pages/Shop/Shop.tsx";
import Product from "../pages/Product/Product.tsx";
import {CartProvider} from "../context/CartContext.tsx";
import CartDrawer from "../../src/components/Cart/CartDrawer.tsx";
import Checkout from "../pages/Checkout/Checkout.tsx";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
          <CartDrawer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default AppRoutes;