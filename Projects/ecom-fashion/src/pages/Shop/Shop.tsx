// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "../../../firebase/firebase";
import styles from "./Shop.module.scss";
import Header from "../../components/layout/Header/Header.tsx";
import Footer from '../../components/layout/Footer/Footer.tsx'
import PeakyBlinders from "../../components/layout/product-spotlight/PeakyBlinders.tsx";
import Instagram from "../../components/layout/Instagram/Instagram.tsx";
import NewsletterSubscribe from "../../components/layout/NewsletterSubscribe/NewsletterSubscribe.tsx";

const Shop: React.FC = () => {
  return (
    <div className={styles.shop}>
      <Header />
      <PeakyBlinders />
      <Instagram />
      <NewsletterSubscribe />
      <Footer />
    </div>
  )
}

export default Shop