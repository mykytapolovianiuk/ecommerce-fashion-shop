import Header from "../../components/layout/Header/Header.tsx";
import DiscountTimer from "../../components/DiscountTimer.tsx";

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
            <a href="#" className={styles.hero__cta}>Shop now</a>
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
      <section className={styles.discount}>
        <div className={styles.discount__information}>
          <div className={styles.discount__text}>
            <p className={styles.discount__title}>Deals Of The Month</p>
            <p className={styles.discount__subtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam
              sem. Scelerisque duis ultrices sollicitudin
            </p>
            <button className={styles.discount__btn}>Buy Now</button>
          </div>

          <div className={styles.discount__timer}>
            <p className={styles.discount__timerTitle}>Hurry, Before It’s Too Late!</p>
            <DiscountTimer
              initial={{days: 2, hours: 6, minutes: 5, seconds: 30}}
              rowClass={styles.discount__timerRow}
              itemClass={styles.discount__timerItem}
              counterClass={styles.discount__counter}
              labelClass={styles.discount__label}
            />
          </div>
        </div>

        <div className={styles.discount__media}>
          <div className={styles.discount__card}>
            <img
              src="https://images.pexels.com/photos/7679729/pexels-photo-7679729.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""/>
            <div className={styles.discount__badge}>
              <span>01 — Spring Sale</span>
              <strong>30% OFF</strong>
            </div>
          </div>
          <div className={styles.discount__card}>
            <img
              src="https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""/>
          </div>
          <div className={styles.discount__card}>
            <img
              src="https://images.pexels.com/photos/7679719/pexels-photo-7679719.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""/>
          </div>
        </div>
      </section>
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
                src="https://images.pexels.com/photos/7679727/pexels-photo-7679727.jpeg?auto=compress&cs=tinysrgb&w=800"
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
                src="https://images.pexels.com/photos/7679726/pexels-photo-7679726.jpeg?auto=compress&cs=tinysrgb&w=800"
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
                src="https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg?auto=compress&cs=tinysrgb&w=800"
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
                src="https://images.pexels.com/photos/5759217/pexels-photo-5759217.jpeg?auto=compress&cs=tinysrgb&w=800"
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
                src="https://images.pexels.com/photos/7679719/pexels-photo-7679719.jpeg?auto=compress&cs=tinysrgb&w=800"
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
                src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800"
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
          <button className={styles.arrivals__more}>View More</button>
        </div>
      </section>

    </div>
  );
};

export default Home
