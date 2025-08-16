import {useEffect, useMemo, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import styles from "./Product.module.scss";
import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import PeakyBlinders from "../../components/layout/product-spotlight/PeakyBlinders";
import NewsletterSubscribe from "../../components/layout/NewsletterSubscribe/NewsletterSubscribe";

type Product = {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number | null;
  rating?: number;
  popularity?: number;
  colors?: string[];
  sizes?: string[];
  thumbnail?: string;
  images?: string[];      // пріоритетно
  image?: string;         // fallback
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let alive = true;
    async function run() {
      setLoading(true);
      try {
        const ref = doc(db, "products", id!);
        const snap = await getDoc(ref);
        if (alive && snap.exists()) {
          const p = { id: snap.id, ...(snap.data() as any) } as Product;
          setData(p);
          const firstImg = p.images?.[0] || p.thumbnail || p.image || "";
          setImg(firstImg);
          setSize(p.sizes?.[0] || null);
          setColor(p.colors?.[0] || null);
        }
      } finally {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        alive && setLoading(false);
      }
    }
    if (id) run();
    return () => { alive = false; };
  }, [id]);

  const priceView = useMemo(() => {
    if (!data) return null;
    if (data.salePrice) {
      return (
        <div className={styles.price}>
          <span className={styles.sale}>${data.salePrice.toFixed(2)}</span>
          <span className={styles.old}>${data.price.toFixed(2)}</span>
          <span className={styles.badge}>save {(100 - (data.salePrice*100)/data.price).toFixed(0)}%</span>
        </div>
      );
    }
    return <div className={styles.price}><span>${data.price.toFixed(2)}</span></div>;
  }, [data]);

  if (loading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}><div className={styles.loader}>Loading…</div></div>
        <NewsletterSubscribe /><Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}><div className={styles.empty}>Product not found. <Link to="/shop">Back to shop</Link></div></div>
        <NewsletterSubscribe /><Footer />
      </div>
    );
  }

  const gallery = data.images?.length ? data.images : [data.thumbnail || data.image || ""];

  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.container}>
        <div className={styles.product}>
          <aside className={styles.gallery}>
            <div className={styles.thumbs}>
              {gallery.map((g, i) => (
                <button key={i} className={`${styles.thumb} ${img===g ? styles["thumb--active"] : ""}`} onClick={()=>setImg(g)}>
                  <img src={g} alt="" />
                </button>
              ))}
            </div>
            <div className={styles.main}>
              {img ? <img src={img} alt={data.title} /> : null}
            </div>
          </aside>

          <div className={styles.info}>
            <div className={styles.brand}>{data.brand}</div>
            <h1 className={styles.title}>{data.title}</h1>
            <div className={styles.meta}>
              {data.rating ? <span>★ {data.rating.toFixed(1)}</span> : null}
              {data.popularity ? <span>{data.popularity} views</span> : null}
              <span className={styles.dot} />
              <span className={styles.cat}>{data.category}</span>
            </div>

            {priceView}

            {data.sizes?.length ? (
              <div className={styles.block}>
                <div className={styles.label}>Size</div>
                <div className={styles.chips}>
                  {data.sizes.map(s => (
                    <button
                      key={s}
                      className={`${styles.chip} ${size===s ? styles["chip--active"] : ""}`}
                      onClick={()=>setSize(s)}
                    >{s || "-"}</button>
                  ))}
                </div>
              </div>
            ) : null}

            {data.colors?.length ? (
              <div className={styles.block}>
                <div className={styles.label}>Color</div>
                <div className={styles.colors}>
                  {data.colors.map(c => (
                    <button
                      key={c}
                      style={{ background: c }}
                      className={`${styles.dotColor} ${color===c ? styles["dotColor--active"] : ""}`}
                      onClick={()=>setColor(c)}
                      aria-label={c}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div className={styles.actions}>
              <div className={styles.qty}>
                <button onClick={()=>setQty(q => Math.max(1, q-1))}>−</button>
                <input value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value)||1))}/>
                <button onClick={()=>setQty(q => q+1)}>+</button>
              </div>
              <button className={styles.add}>Add to cart</button>
              <button className={styles.wish} aria-label="Add to wishlist">♡</button>
            </div>

            <ul className={styles.bullets}>
              <li>Estimated Delivery: 3–5 business days</li>
              <li>Free Shipping & Returns on orders over $75</li>
              <li>Secure checkout</li>
            </ul>
          </div>
        </div>
      </section>

      <PeakyBlinders />
      <NewsletterSubscribe />
      <Footer />
    </div>
  );
};

export default ProductPage;
