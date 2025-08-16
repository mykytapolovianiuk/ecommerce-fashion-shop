// src/components/Header.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import './Header.scss';

import backet from '../../../assets/icons/headerSection/backet.svg'

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="Header">
      <h1 className="volkhov-regular">FASCO</h1>

      {user ? (
        <>
          <div className="nav__container">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/products">Products</Link>
          </div>
          <button className="logout" onClick={() => signOut(auth)}>Logout</button>
          <button className='header-backet__btn'>
            <img className='header-backet__img' src={backet} alt="backet"/>
          </button>
        </>
      ) : (
        <div className="auth_container">
          <Link to="/signin" className="signin-btn">Sign In</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
