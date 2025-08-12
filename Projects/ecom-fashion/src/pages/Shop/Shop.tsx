// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "../../../firebase/firebase";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, limit, orderBy, query, startAfter, where, QueryConstraint } from "firebase/firestore";
import { db } from "../../firebase/firebase.ts";
import styles from "./Shop.module.scss";
import Header from "../../components/layout/Header/Header.tsx";
import Footer from '../../components/layout/Footer/Footer.tsx'
import PeakyBlinders from "../../components/layout/product-spotlight/PeakyBlinders.tsx";
import Instagram from "../../components/layout/Instagram/Instagram.tsx";
import NewsletterSubscribe from "../../components/layout/NewsletterSubscribe/NewsletterSubscribe.tsx";

const Shop: React.FC = () => {

type Product = {
  id: string;
  title: string;
  brand: string;
  category: string;
  tags: string[];
  collections: string[];
  price: number;
  salePrice?: number|null;
  rating: number;
  colors: string[];
  sizes: string[];
  thumbnail: string;
};

  const PAGE = 9;
  const [items, setItems] = useState<Product[]>([]);
  const [cursor, setCursor] = useState< | null>(null);
  const [loading, setLoading] = useState(false);

  const [category] = useState("fashion");
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number] | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const constraints = useMemo(() => {
    const c: QueryConstraint[] = [];
    c.push(where("category", "==", category));
    if (brands.length) c.push(where("brand", "in", brands.slice(0,10)));
    if (colors.length) c.push(where("colors", "array-contains-any", colors.slice(0,10)));
    if (sizes.length) c.push(where("sizes", "array-contains-any", sizes.slice(0,10)));
    if (price) {
      c.push(where("price", ">=", price[0]));
      c.push(where("price", "<=", price[1]));
      c.push(orderBy("price", "asc"));
    } else {
      c.push(orderBy("popularity","desc"));
    }
    return c;
  }, [category, brands, sizes, colors, price]);

  async function load(first = true) {
    setLoading(true);
    try {
      const col = collection(db, "products");
      const base = query(col, ...constraints, limit(PAGE), ...(first || !cursor ? [] : [startAfter(cursor)]));
      const snap = await getDocs(base);
      const list: Product[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      setItems(first ? list : [...items, ...list]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setCursor(null);
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constraints]);

  return (
    <div className={styles.shop}>
      <Header/>
      <div className={styles.shop__container}>
        <aside className={styles.filters}>
          <div className={styles.filters__block}>
            <div className={styles.filters__title}>Size</div>
            <div className={styles.filters__chips}>
              {["S", "M", "L", "XL"].map(s => (
                <button key={s}
                        className={`${styles.filters__chip} ${sizes.includes(s) ? styles["filters__chip--active"] : ""}`}
                        onClick={() => setSizes(v => v.includes(s) ? v.filter(i => i !== s) : [...v, s])}>{s}</button>
              ))}
            </div>
          </div>

          <div className={styles.filters__block}>
            <div className={styles.filters__title}>Colors</div>
            <div className={styles.filters__colors}>
              {["#000000", "#c0392b", "#2980b9", "#27ae60", "#f1c40f", "#e67e22", "#8e44ad", "#95a5a6"].map(c => (
                <button key={c} style={{background: c}}
                        className={`${styles.filters__color} ${colors.includes(c) ? styles["filters__color--active"] : ""}`}
                        onClick={() => setColors(v => v.includes(c) ? v.filter(i => i !== c) : [...v, c])}/>
              ))}
            </div>
          </div>

          <div className={styles.filters__block}>
            <div className={styles.filters__title}>Prices</div>
            <div className={styles.filters__list}>
              {[[0, 50], [50, 80], [80, 120], [120, 200]].map(r => (
                <label key={r.join("-")} className={styles.filters__row}>
                  <input type="radio" name="price" checked={price?.[0] === r[0] && price?.[1] === r[1]}
                         onChange={() => setPrice(r as [number, number])}/>
                  <span>${r[0]}–${r[1]}</span>
                </label>
              ))}
              <label className={styles.filters__row}>
                <input type="radio" name="price" checked={!price} onChange={() => setPrice(null)}/>
                <span>Any</span>
              </label>
            </div>
          </div>

          <div className={styles.filters__block}>
            <div className={styles.filters__title}>Brands</div>
            <div className={styles.filters__list}>
              {["FASCO", "Armani", "Boss"].map(b => (
                <label key={b} className={styles.filters__row}>
                  <input type="checkbox" checked={brands.includes(b)}
                         onChange={() => setBrands(v => v.includes(b) ? v.filter(i => i !== b) : [...v, b])}/>
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filters__block}>
            <div className={styles.filters__title}>Tags</div>
            <div className={styles.filters__tags}>
              {["hat", "shirt", "dress", "coat", "summer", "black"].map(t => (
                <button key={t}
                        className={`${styles.filters__tag} ${tags.includes(t) ? styles["filters__tag--active"] : ""}`}
                        onClick={() => setTags(v => v.includes(t) ? v.filter(i => i !== t) : [...v, t])}>{t}</button>
              ))}
            </div>
          </div>
        </aside>

        <div className={styles.grid}>
          {items
            .filter(p => tags.length ? tags.some(t => p.tags.includes(t)) : true)
            .map(p => (
              <div key={p.id} className={styles.card}>
                <div className={styles.card__thumb}><img src={p.thumbnail} alt=""/></div>
                <div className={styles.card__name}>{p.title}</div>
                <div className={styles.card__meta}>{p.brand}</div>
                <div className={styles.card__price}>
                  {p.salePrice ? (<><span className={styles.card__sale}>${p.salePrice.toFixed(2)}</span><span
                    className={styles.card__old}>${p.price.toFixed(2)}</span></>) : <span>${p.price.toFixed(2)}</span>}
                </div>
              </div>
            ))}
          {!items.length && !loading && <div className={styles.grid__empty}>No products</div>}
        </div>
      </div>

      <div className={styles.shop__actions}>
        <button disabled={loading || !cursor} onClick={() => load(false)}
                className={styles.shop__more}>{loading ? "Loading..." : "View More"}</button>
      </div>

  <PeakyBlinders/>
  <Instagram/>
  <NewsletterSubscribe/>
  <Footer/>
    </div>
  )
}

export default Shop