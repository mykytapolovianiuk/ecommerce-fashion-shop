import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import styles from "./SignIn.module.scss";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
      navigate("/");
    } catch (e: any) {
      setErr(e?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    setErr("");
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      const u = cred.user;
      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          uid: u.uid,
          email: u.email || "",
          displayName: u.displayName || "",
          provider: "google",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (e: any) {
      setErr(e?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    if (!email) return setErr("Enter your email to reset");
    setErr("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setErr("Reset link sent to email");
    } catch (e: any) {
      setErr(e?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__wrap}>
        <div className={styles.auth__media} />
        <div className={styles.auth__card}>
          <h1 className={styles.auth__brand}>FASCO</h1>
          <h2 className={styles.auth__title}>Sign In To FASCO</h2>

          <div className={styles.auth__providers}>
            <button onClick={onGoogle} disabled={loading} className={styles.auth__provider}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" />
              <span>Sign up with Google</span>
            </button>
            <Link to="/signup" className={`${styles.auth__provider} ${styles["auth__provider--alt"]}`}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg" alt="" />
              <span>Sign up with Email</span>
            </Link>
          </div>

          <div className={styles.auth__divider}><span>OR</span></div>

          <form onSubmit={onSubmit} className={styles.auth__form}>
            <label className={styles.auth__label}>
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </label>
            <label className={styles.auth__label}>
              <span>Password</span>
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" required />
            </label>

            {err && <div className={styles.auth__error}>{err}</div>}

            <button type="submit" disabled={loading} className={styles.auth__submit}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <Link to="/signup" className={styles.auth__secondary}>Register Now</Link>
          </form>

          <div className={styles.auth__footer}>
            <button onClick={onReset} className={styles.auth__link} type="button">Forget Password?</button>
            <span className={styles.auth__terms}>FASCO Terms & Conditions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
