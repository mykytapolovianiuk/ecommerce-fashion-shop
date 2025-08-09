// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

import './Header.scss'
const Header = () => {
  return (
    <div className="Header">
      <h1 className='volkhov-regular'>FASCO</h1>
      <a className="home-title poppins-regular" href='#'>Home</a>
      <div className="auth_container">
        <a className="signin-btn poppins-regular" href="#">Sign In</a>
        <a className="signup-btn poppins-regular" href="#">Sign Up</a>
      </div>
    </div>
  )
}
export default Header