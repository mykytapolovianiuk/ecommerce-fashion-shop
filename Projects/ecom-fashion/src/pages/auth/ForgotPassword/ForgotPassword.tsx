// import { useNavigate } from "react-router-dom";
// // import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
// // import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "../../../firebase/firebase";
// import styles from "./ForgotPassword.module.scss";
//
// const SignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const [first, setFirst] = useState("");
//   const [last, setLast] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");
//
//   const createUserDoc = async (uid: string, data: Partial<{ firstName: string; lastName: string; phone: string; email: string; provider: string; displayName: string }>) => {
//     await setDoc(doc(db, "users", uid), {
//       uid,
//       firstName: first || data.firstName || "",
//       lastName: last || data.lastName || "",
//       phone: phone || data.phone || "",
//       email: email || data.email || "",
//       provider: data.provider || "password",
//       displayName: `${first} ${last}`.trim() || data.displayName || "",
//     }, { merge: true });
//   };
//
//
//   return (
//     <div className={styles.auth}>
//       <div className={styles.auth__wrap}>
//         <div className={styles.auth__media} />
//         <div className={styles.auth__card}>
//           <h1 className={styles.auth__brand}>FASCO</h1>
//           <h2 className={styles.auth__title}>Forgot Password</h2>
//
//           <div className={styles.auth__divider}><span>OR</span></div>
//
//           <form onSubmit={onSubmit} className={styles.auth__form}>
//             <div className={styles.auth__grid}>
//               <label className={styles.auth__label}>
//                 <span>First Name</span>
//                 <input value={first} onChange={(e) => setFirst(e.target.value)} required />
//               </label>
//               <label className={styles.auth__label}>
//                 <span>Last Name</span>
//                 <input value={last} onChange={(e) => setLast(e.target.value)} required />
//               </label>
//             </div>
//
//             <div className={styles.auth__grid}>
//               <label className={styles.auth__label}>
//                 <span>Email Address</span>
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//               </label>
//               <label className={styles.auth__label}>
//                 <span>Phone Number</span>
//                 <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
//               </label>
//             </div>
//
//             <div className={styles.auth__grid}>
//               <label className={styles.auth__label}>
//                 <span>Password</span>
//                 <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
//               </label>
//               <label className={styles.auth__label}>
//                 <span>Confirm Password</span>
//                 <input type="password" value={conf} onChange={(e) => setConf(e.target.value)} required />
//               </label>
//             </div>
//
//             {err && <div className={styles.auth__error}>{err}</div>}
//
//             <button type="submit" disabled={loading} className={styles.auth__submit}>
//               {loading ? "Creating..." : "Create Account"}
//             </button>
//
//             <div className={styles.auth__switch}>
//               Already have an account? <Link to="/signin">Login</Link>
//             </div>
//           </form>
//
//           <div className={styles.auth__footer}>
//             <span className={styles.auth__terms}>FASCO Terms & Conditions</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default SignUp;
