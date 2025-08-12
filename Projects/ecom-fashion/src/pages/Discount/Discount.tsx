import styles from "./Discount.module.scss";
import DiscountTimer from "../../components/DiscountTimer.tsx";

import deals01 from "../../assets/images/Home/dealsSection/image-01.png";
import deals02 from "../../assets/images/Home/dealsSection/image-02.png";
import deals03 from "../../assets/images/Home/dealsSection/image-03.png";

const Discount: React.FC = () => {
  return (
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
            src={deals01}
            alt=""/>
          <div className={styles.discount__badge}>
            <span>01 — Spring Sale</span>
            <strong>30% OFF</strong>
          </div>
        </div>
        <div className={styles.discount__card}>
          <img
            src={deals02}
            alt=""/>
        </div>
        <div className={styles.discount__card}>
          <img
            src={deals03}
            alt=""/>
        </div>
      </div>
    </section>
  )
}

export default Discount