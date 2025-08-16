import {
  type FormEvent,
  useMemo,
  useState
} from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Checkout.module.scss";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import { useCart } from "../../context/CartContext";
import { db } from "../../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  city: string;
  address: string;
  zip: string;
  notes?: string;
  delivery: "standard" | "express";
  payment: "cod" | "card";
};

const initial: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  country: "Ukraine",
  city: "",
  address: "",
  zip: "",
  notes: "",
  delivery: "standard",
  payment: "cod",
};

const Checkout: React.FC = () => {
  const { items, subtotal, format, freeShippingThreshold, missingForFreeShipping, clear } = useCart();
  const navigate = useNavigate();

  const [data, setData] = useState<FormState>(initial);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const shipping = useMemo(() => {
    if (!items.length) return 0;
    if (subtotal >= freeShippingThreshold) return 0;
    return data.delivery === "express" ? 14.9 : 6.9;
  }, [items.length, subtotal, freeShippingThreshold, data.delivery]);

  const total = subtotal + shipping;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }
    if (!data.email || !data.firstName || !data.lastName || !data.city || !data.address || !data.zip) {
      setError("Please fill the required fields.");
      return;
    }

    try {
      setPlacing(true);
      const order = {
        customer: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone || "",
        },
        shippingAddress: {
          country: data.country,
          city: data.city,
          address: data.address,
          zip: data.zip,
          notes: data.notes || "",
        },
        delivery: data.delivery,
        payment: data.payment,
        items: items.map(i => ({
          id: i.id,
          title: i.title,
          price: i.price,
          qty: i.qty,
          variant: i.variant || {},
          image: i.image || "",
        })),
        amounts: {
          subtotal,
          shipping,
          total,
          currency: "USD",
        },
        status: "created",
        createdAt: serverTimestamp(),
      };

      const ref = await addDoc(collection(db, "orders"), order);

      clear();
      navigate(`/checkout/success?id=${ref.id}`, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to place order.");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className={styles.checkout}>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles.grid}>
          {/* LEFT: form */}
          <form className={styles.form} onSubmit={onSubmit}>
            <section className={styles.block}>
              <h3>Contact</h3>
              <label className={styles.row}>
                <span>Email *</span>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <div className={styles.cols}>
                <label className={styles.row}>
                  <span>First name *</span>
                  <input
                    value={data.firstName}
                    onChange={(e) => setData({ ...data, firstName: e.target.value })}
                    required
                  />
                </label>
                <label className={styles.row}>
                  <span>Last name *</span>
                  <input
                    value={data.lastName}
                    onChange={(e) => setData({ ...data, lastName: e.target.value })}
                    required
                  />
                </label>
              </div>
              <label className={styles.row}>
                <span>Phone</span>
                <input
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="+380..."
                />
              </label>
            </section>

            <section className={styles.block}>
              <h3>Shipping address</h3>
              <div className={styles.cols}>
                <label className={styles.row}>
                  <span>Country</span>
                  <input
                    value={data.country}
                    onChange={(e) => setData({ ...data, country: e.target.value })}
                  />
                </label>
                <label className={styles.row}>
                  <span>City *</span>
                  <input
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    required
                  />
                </label>
              </div>

              <label className={styles.row}>
                <span>Address *</span>
                <input
                  value={data.address}
                  onChange={(e) => setData({ ...data, address: e.target.value })}
                  required
                />
              </label>

              <label className={styles.row}>
                <span>ZIP *</span>
                <input
                  value={data.zip}
                  onChange={(e) => setData({ ...data, zip: e.target.value })}
                  required
                />
              </label>

              <label className={styles.row}>
                <span>Notes</span>
                <textarea
                  rows={3}
                  value={data.notes}
                  onChange={(e) => setData({ ...data, notes: e.target.value })}
                  placeholder="Delivery notes (optional)"
                />
              </label>
            </section>

            <section className={styles.block}>
              <h3>Delivery</h3>
              <div className={styles.choice}>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    checked={data.delivery === "standard"}
                    onChange={() => setData({ ...data, delivery: "standard" })}
                  />
                  <span>Standard — {format(6.9)} (3–5 days)</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    checked={data.delivery === "express"}
                    onChange={() => setData({ ...data, delivery: "express" })}
                  />
                  <span>Express — {format(14.9)} (1–2 days)</span>
                </label>
                {subtotal >= freeShippingThreshold ? (
                  <div className={styles.free}>Free shipping applied 🎉</div>
                ) : (
                  <div className={styles.note}>
                    Buy {format(missingForFreeShipping)} more to get free shipping.
                  </div>
                )}
              </div>
            </section>

            <section className={styles.block}>
              <h3>Payment</h3>
              <div className={styles.choice}>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    checked={data.payment === "cod"}
                    onChange={() => setData({ ...data, payment: "cod" })}
                  />
                  <span>Cash on delivery</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    checked={data.payment === "card"}
                    onChange={() => setData({ ...data, payment: "card" })}
                  />
                  <span>Card (mock)</span>
                </label>
              </div>
            </section>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.actions}>
              <Link to="/cart" className={styles.linkBack}>Back to cart</Link>
              <button className={styles.btn} disabled={placing}>
                {placing ? "Placing order..." : "Place order"}
              </button>
            </div>
          </form>

          {/* RIGHT: summary */}
          <aside className={styles.summary}>
            <h3>Order summary</h3>
            <div className={styles.items}>
              {items.map((i) => (
                <div key={`${i.id}-${i.variant?.size}-${i.variant?.color}`} className={styles.item}>
                  <div className={styles.thumb}>
                    {i.image ? <img src={i.image} alt="" /> : <div className={styles.ph}></div>}
                    {i.qty > 1 && <span className={styles.qty}>{i.qty}</span>}
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>{i.title}</div>
                    {(i.variant?.size || i.variant?.color) && (
                      <div className={styles.muted}>
                        {i.variant?.size ? `Size: ${i.variant.size} ` : ""}
                        {i.variant?.color ? `Color: ${i.variant.color}` : ""}
                      </div>
                    )}
                  </div>
                  <div className={styles.price}>{format(i.price * i.qty)}</div>
                </div>
              ))}
              {!items.length && <div className={styles.muted}>Cart is empty.</div>}
            </div>

            <div className={styles.totals}>
              <div className={styles.row}>
                <span>Subtotal</span>
                <b>{format(subtotal)}</b>
              </div>
              <div className={styles.row}>
                <span>Shipping</span>
                <b>{format(shipping)}</b>
              </div>
              <div className={styles.rowTotal}>
                <span>Total</span>
                <b>{format(total)}</b>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
