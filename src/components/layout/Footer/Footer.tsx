// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

import styles from './Footer.module.scss'
const Footer = () => {
  return (
    <div className={styles.footer}>
      <h1 className='volkhov-regular'>FASCO</h1>
      <div className={styles.footer__navigation}>
        <a className={styles.footer__link} href="#">Support Center</a>
        <a className={styles.footer__link} href="#">Invoicing</a>
        <a className={styles.footer__link} href="#">Contract</a>
        <a className={styles.footer__link} href="#">Careers</a>
        <a className={styles.footer__link} href="#">Blog</a>
        <a className={styles.footer__link} href="#">FAQ's</a>
      </div>
    </div>
  )
}
export default Footer