// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "../../../firebase/firebase";
import styles from "./Product.module.scss";
import Header from "../../components/layout/Header/Header.tsx";
import Footer from '../../components/layout/Footer/Footer.tsx'
import PeakyBlinders from "../../components/layout/product-spotlight/PeakyBlinders.tsx";
import NewsletterSubscribe from "../../components/layout/NewsletterSubscribe/NewsletterSubscribe.tsx";
import Discount from "../Discount/Discount.tsx";

const Product: React.FC = () => {
  return (
    <div className={styles.shop}>
      <Header />
      <PeakyBlinders />
      <Discount />
      <NewsletterSubscribe />
      <Footer />
    </div>
  )
}

export default Product