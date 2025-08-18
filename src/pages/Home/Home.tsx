import {Link} from "react-router-dom";

import Header from "../../components/layout/Header/Header.tsx";
import Footer from "../../components/layout/Footer/Footer.tsx";
import Discount from "../Discount/Discount.tsx";
import PeakyBlinders from "../../components/layout/product-spotlight/PeakyBlinders.tsx";
import Instagram from "../../components/layout/Instagram/Instagram.tsx";
import NewsletterSubscribe from "../../components/layout/NewsletterSubscribe/NewsletterSubscribe.tsx";

import styles from './Home.module.scss'

import frame1 from '../../assets/images/Home/heroSection/Frame 1.jpg'
import frame2 from '../../assets/images/Home/heroSection/Frame 2.jpg'
import frame3 from '../../assets/images/Home/heroSection/Frame-3.jpg'
import frame4 from '../../assets/images/Home/heroSection/Frame-4.jpg'

import part1 from '../../assets/images/Home/pertnersSection/logo-01.png'
import part2 from '../../assets/images/Home/pertnersSection/logo-02.png'
import part3 from '../../assets/images/Home/pertnersSection/logo-03.png'
import part4 from '../../assets/images/Home/pertnersSection/logo-04.png'
import part5 from '../../assets/images/Home/pertnersSection/logo-05.png'

import arrivals1 from '../../assets/images/Home/arrivalsSection/img-01.png'
import arrivals2 from '../../assets/images/Home/arrivalsSection/img-02.png'
import arrivals3 from '../../assets/images/Home/arrivalsSection/img-03.png'
import arrivals4 from '../../assets/images/Home/arrivalsSection/img-04.png'
import arrivals5 from '../../assets/images/Home/arrivalsSection/img-05.png'
import arrivals6 from '../../assets/images/Home/arrivalsSection/img-06.png'

const Home = () => {
  return (
    <div className="Home">
      <Header/>
      <section className={styles.hero}>
        <div className={styles.hero__container}>
          <figure className={`${styles.hero__media} ${styles["hero__media--large"]} ${styles["hero__media--left"]}`}>
            <img src={frame1} alt="Left" className={styles.hero__img}/>
          </figure>

          <figure className={`${styles.hero__media} ${styles["hero__media--small"]} ${styles["hero__media--top"]}`}>
            <img src={frame2} alt="Top" className={styles.hero__img}/>
          </figure>

          <div className={styles.hero__content}>
            <h1 className={styles.hero__heading}>ULTIMATE</h1>
            <p className={styles.hero__title}>SALE</p>
            <p className={styles.hero__subtitle}>NEW COLLECTION</p>
            <Link to="/shop" className={styles.hero__cta}>Shop now</Link>
          </div>

          <figure className={`${styles.hero__media} ${styles["hero__media--large"]} ${styles["hero__media--right"]}`}>
            <img src={frame4} alt="Right" className={styles.hero__img}/>
          </figure>

          <figure className={`${styles.hero__media} ${styles["hero__media--small"]} ${styles["hero__media--bottom"]}`}>
            <img src={frame3} alt="Bottom" className={styles.hero__img}/>
          </figure>
        </div>
        <section className={styles.partners}>
          <img className={styles.partners__img} src={part1} alt="partners"/>
          <img className={styles.partners__img} src={part2} alt="partners"/>
          <img className={styles.partners__img} src={part3} alt="partners"/>
          <img className={styles.partners__img} src={part4} alt="partners"/>
          <img className={styles.partners__img} src={part5} alt="partners"/>
        </section>
      </section>
      <Discount />
      <section className={styles.arrivals}>
        <div className={styles.arrivals__head}>
          <h2 className={styles.arrivals__title}>New Arrivals</h2>
          <p className={styles.arrivals__desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
            Scelerisque duis ultrices sollicitudin
          </p>
          <div className={styles.arrivals__tabs}>
            <button className={`${styles.arrivals__tab} ${styles["arrivals__tab--active"]}`}>Women’s Fashion</button>
            <button className={styles.arrivals__tab}>Men’s Fashion</button>
            <button className={styles.arrivals__tab}>Women Accessories</button>
            <button className={styles.arrivals__tab}>Men Accessories</button>
            <button className={styles.arrivals__tab}>Discount Deals</button>
          </div>
        </div>

        <div className={styles.arrivals__grid}>
          <article className={styles.arrivals__card}>
            <div className={styles.arrivals__thumb}>
              <img
                src={arrivals1}
                alt="Shiny Dress"/>
            </div>
            <div className={styles.arrivals__body}>
              <h3 className={styles.arrivals__name}>Shiny Dress</h3>
              <div className={styles.arrivals__meta}>
                <span className={styles.arrivals__brand}>Al Karam</span>
                <span className={styles.arrivals__rating}>★★★★★</span>
              </div>
              <div className={styles.arrivals__reviews}>(4.1k) Customer Reviews</div>
              <div className={styles.arrivals__footer}>
                <span className={styles.arrivals__price}>$95.50</span>
                <span className={styles.arrivals__low}>Almost Sold Out</span>
              </div>
            </div>
          </article>

          <article className={styles.arrivals__card}>
            <div className={styles.arrivals__thumb}>
              <img
                src={arrivals2}
                alt="Long Dress"/>
            </div>
            <div className={styles.arrivals__body}>
              <h3 className={styles.arrivals__name}>Long Dress</h3>
              <div className={styles.arrivals__meta}>
                <span className={styles.arrivals__brand}>Al Karam</span>
                <span className={styles.arrivals__rating}>★★★★★</span>
              </div>
              <div className={styles.arrivals__reviews}>(4.1k) Customer Reviews</div>
              <div className={styles.arrivals__footer}>
                <span className={styles.arrivals__price}>$95.50</span>
                <span className={styles.arrivals__low}>Almost Sold Out</span>
              </div>
            </div>
          </article>

          <article className={styles.arrivals__card}>
            <div className={styles.arrivals__thumb}>
              <img
                src={arrivals3}
                alt="Full Sweater"/>
            </div>
            <div className={styles.arrivals__body}>
              <h3 className={styles.arrivals__name}>Full Sweater</h3>
              <div className={styles.arrivals__meta}>
                <span className={styles.arrivals__brand}>Al Karam</span>
                <span className={styles.arrivals__rating}>★★★★★</span>
              </div>
              <div className={styles.arrivals__reviews}>(4.1k) Customer Reviews</div>
              <div className={styles.arrivals__footer}>
                <span className={styles.arrivals__price}>$95.50</span>
                <span className={styles.arrivals__low}>Almost Sold Out</span>
              </div>
            </div>
          </article>

          <article className={styles.arrivals__card}>
            <div className={styles.arrivals__thumb}>
              <img
                src={arrivals4}
                alt="White Dress"/>
            </div>
            <div className={styles.arrivals__body}>
              <h3 className={styles.arrivals__name}>White Dress</h3>
              <div className={styles.arrivals__meta}>
                <span className={styles.arrivals__brand}>Al Karam</span>
                <span className={styles.arrivals__rating}>★★★★★</span>
              </div>
              <div className={styles.arrivals__reviews}>(4.1k) Customer Reviews</div>
              <div className={styles.arrivals__footer}>
                <span className={styles.arrivals__price}>$95.50</span>
                <span className={styles.arrivals__low}>Almost Sold Out</span>
              </div>
            </div>
          </article>

          <article className={styles.arrivals__card}>
            <div className={styles.arrivals__thumb}>
              <img
                src={arrivals5}
                alt="Colorful Dress"/>
            </div>
            <div className={styles.arrivals__body}>
              <h3 className={styles.arrivals__name}>Colorful Dress</h3>
              <div className={styles.arrivals__meta}>
                <span className={styles.arrivals__brand}>Al Karam</span>
                <span className={styles.arrivals__rating}>★★★★★</span>
              </div>
              <div className={styles.arrivals__reviews}>(4.1k) Customer Reviews</div>
              <div className={styles.arrivals__footer}>
                <span className={styles.arrivals__price}>$95.50</span>
                <span className={styles.arrivals__low}>Almost Sold Out</span>
              </div>
            </div>
          </article>

          <article className={styles.arrivals__card}>
            <div className={styles.arrivals__thumb}>
              <img
                src={arrivals6}
                alt="White Shirt"/>
            </div>
            <div className={styles.arrivals__body}>
              <h3 className={styles.arrivals__name}>White Shirt</h3>
              <div className={styles.arrivals__meta}>
                <span className={styles.arrivals__brand}>Al Karam</span>
                <span className={styles.arrivals__rating}>★★★★★</span>
              </div>
              <div className={styles.arrivals__reviews}>(4.1k) Customer Reviews</div>
              <div className={styles.arrivals__footer}>
                <span className={styles.arrivals__price}>$95.50</span>
                <span className={styles.arrivals__low}>Almost Sold Out</span>
              </div>
            </div>
          </article>
        </div>

        <div className={styles.arrivals__actions}>
          <Link to="/shop" className={styles.arrivals__more}>View More</Link>
        </div>
      </section>
      <PeakyBlinders />
      <Instagram />
      <NewsletterSubscribe />
      <Footer />
    </div>
  );
};

export default Home
