import {Link} from "react-router-dom";


import './Header.scss'
const Header = () => {
  return (
    <div className="Header">
      <h1 className='volkhov-regular'>FASCO</h1>
      <a className="home-title poppins-regular" href='#'>Home</a>
      <div className="auth_container">
        <Link to="/signin" className="signin-btn poppins-regular">Sign In</Link>
        <Link to="/signup" className="signup-btn poppins-regular">Sign Up</Link>
      </div>
    </div>
  )
}
export default Header