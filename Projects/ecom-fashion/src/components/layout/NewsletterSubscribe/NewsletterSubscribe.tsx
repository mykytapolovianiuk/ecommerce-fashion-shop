import { useState } from "react";
import styles from "./NewsletterSubscribe.module.scss";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_z9bw5on";
const TEMPLATE_ID = "template_y2gqeh3";
const PUBLIC_KEY = "Y5KaKJ_dDnim5mxNI";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const valid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid(email)) return setMsg("Please enter a valid email");
    setMsg("");
    setLoading(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: email,
          subject: "FASCO newsletter subscription",
          message:
            "You’re subscribed to FASCO. We’ll send you occasional updates, deals and product news. If this wasn’t you, ignore this email."
        },
        { publicKey: PUBLIC_KEY }
      );
      setMsg("Thanks! Please check your inbox.");
      setEmail("");
    } catch {
      setMsg("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.subscribe}>
      <div className={styles.subscribe__container}>
        <h2 className={styles.subscribe__title}>Subscribe To Our Newsletter</h2>
        <p className={styles.subscribe__subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
        </p>

        <form onSubmit={submit} className={styles.subscribe__form}>
          <input
            type="email"
            placeholder="michael@ymail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.subscribe__input}
            required
          />
          <button className={styles.subscribe__btn} disabled={loading}>
            {loading ? "Sending..." : "Subscribe Now"}
          </button>
        </form>

        {msg && <div className={styles.subscribe__msg}>{msg}</div>}
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
