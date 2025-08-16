import {type FormEvent, useMemo, useState } from "react";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import styles from "./Checkout.module.scss";
import { useCart } from "../../context/CartContext";

// Завантажуємо Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

// ---- Внутрішній компонент з формою платежу ----
const CheckoutForm: React.FC = () => {
  const { items, subtotal, format, freeShippingThreshold, missingForFreeShipping, clear } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const functions = getFunctions();

  // UI / форма з макета
  const [email, setEmail] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [country, setCountry] = useState("Ukraine / Region");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [discount, setDiscount] = useState(""); // поле Discount code
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState<null | { code: string; off: number }>(null);

  // знижка (приклад логіки — 10%)
  function applyCode() {
    if (!discount) return;
    const code = discount.trim().toUpperCase();
    if (code === "10OFF") setApplied({ code, off: 0.1 });
    else if (code === "FREESHIP") setApplied({ code, off: 0 }); // лишаємо для free shipping логіки нижче
    else setApplied(null);
  }

  const discountAmount = useMemo(() => {
    if (!applied || !applied.off) return 0;
    return subtotal * applied.off;
  }, [applied, subtotal]);

  const shipping = useMemo(() => {
    if (!items.length) return 0;
    if (subtotal - discountAmount >= freeShippingThreshold) return 0;
    if (applied?.code === "FREESHIP") return 0;
    return delivery === "express" ? 40_00 / 100 : 0; // з макета — 40$ (для відображення), але в розрахунку нижче підемо у центах
  }, [items.length, subtotal, freeShippingThreshold, delivery, discountAmount, applied]);

  const total = Math.max(0, subtotal - discountAmount) + shipping;

  async function placeOrder(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!stripe || !elements) return;
    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }
    if (!email || !firstName || !lastName || !address || !city || !zip) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      // 1) створюємо PaymentIntent через Callable
      const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");
      const cents = Math.round(total * 100); // у центрах
      const { data } = await createPaymentIntent({
        amount: cents,
        currency: "usd",
        metadata: {
          email,
          name: `${firstName} ${lastName}`,
        },
      });
      const clientSecret = (data as any).clientSecret;

      // 2) підтверджуємо платіж
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name: `${firstName} ${lastName}`, email },
        },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed.");
        setSaving(false);
        return;
      }

      // 3) зберегти замовлення у Firestore
      await addDoc(collection(db, "orders"), {
        customer: { email, firstName, lastName, country, city, zip, address },
        items: items.map(i => ({
          id: i.id,
          title: i.title,
          qty: i.qty,
          price: i.price,
          variant: i.variant || {},
          image: i.image || "",
        })),
        amounts: {
          subtotal,
          discount: discountAmount,
          shipping,
          total,
          currency: "USD",
        },
        discount: applied,
        delivery,
        status: "paid",
        createdAt: serverTimestamp(),
      });

      clear();
      // редірект/стан “вдячності”
      window.location.assign("/checkout/success");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Payment failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.checkout}>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>FASCO Demo Checkout</h1>

        <div className={styles.grid}>
          {/* LEFT column */}
          <form className={styles.left} onSubmit={placeOrder}>
            {/* Contact */}
            <h2 className={styles.h2}>Contact</h2>
            <div className={styles.row}>
              <input
                className={styles.input}
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <div className={styles.smallLink}>Have an account? <a href="#">Create Account</a></div>
            </div>

            {/* Delivery */}
            <h2 className={styles.h2}>Delivery</h2>
            <div className={styles.row}>
              <select className={styles.input} value={country} onChange={e => setCountry(e.target.value)}>
                <option>Country / Region</option>
                <option>Ukraine</option>
                <option>Poland</option>
                <option>USA</option>
              </select>
            </div>
            <div className={styles.cols2}>
              <input className={styles.input} placeholder="First Name" value={firstName} onChange={e => setFirst(e.target.value)} required />
              <input className={styles.input} placeholder="Last Name" value={lastName} onChange={e => setLast(e.target.value)} required />
            </div>
            <div className={styles.row}>
              <input className={styles.input} placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
            </div>
            <div className={styles.cols2}>
              <input className={styles.input} placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
              <input className={styles.input} placeholder="Postal Code" value={zip} onChange={e => setZip(e.target.value)} required />
            </div>

            {/* Delivery type (тонка логіка — для відображення/вартості) */}
            <div className={styles.deliveryChoice}>
              <label>
                <input
                  type="radio"
                  checked={delivery === "standard"}
                  onChange={() => setDelivery("standard")}
                />
                <span>Standard</span>
              </label>
              <label>
                <input
                  type="radio"
                  checked={delivery === "express"}
                  onChange={() => setDelivery("express")}
                />
                <span>Express</span>
              </label>
            </div>

            {/* Payment */}
            <h2 className={styles.h2}>Payment</h2>

            <div className={styles.cardWrap}>
              <div className={styles.cardTitle}>
                <span>Credit Card</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="" />
              </div>
              <div className={styles.cardBox}>
                <CardElement options={{
                  style: {
                    base: { fontSize: "16px", color: "#222" },
                    invalid: { color: "#e53935" }
                  }
                }}/>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button className={styles.payBtn} disabled={saving || !stripe}>
              {saving ? "Processing..." : "Pay Now"}
            </button>

            <div className={styles.copy}>Copyright © 2027 FASCO. All Rights Reserved.</div>
          </form>

          {/* RIGHT column (Summary) */}
          <aside className={styles.right}>
            <div className={styles.cartItem}>
              <div className={styles.thumb}></div>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>{items[0]?.title || "Mini Dress With Ruffled Straps"}</div>
                <div className={styles.itemMuted}>Red</div>
              </div>
              <div className={styles.itemPrice}>{format(items[0]?.price ?? 100)}</div>
            </div>

            <div className={styles.discount}>
              <input
                className={styles.input}
                placeholder="Discount code"
                value={discount}
                onChange={e => setDiscount(e.target.value)}
              />
              <button type="button" onClick={applyCode} className={styles.applyBtn}>Apply</button>
            </div>

            <div className={styles.totals}>
              <div className={styles.rowT}><span>Subtotal</span><b>{format(subtotal)}</b></div>
              {discountAmount > 0 && (
                <div className={styles.rowT}><span>Discount ({applied?.code})</span><b>-{format(discountAmount)}</b></div>
              )}
              <div className={styles.rowT}><span>Shipping</span><b>{format(shipping)}</b></div>
              <div className={styles.rowTotal}><span>Total</span><b>{format(total)}</b></div>
              {subtotal < freeShippingThreshold && (
                <div className={styles.note}>Buy {format(missingForFreeShipping)} more and get <b>Free Shipping</b></div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// ---- Обгортка Elements ----
const Checkout: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
