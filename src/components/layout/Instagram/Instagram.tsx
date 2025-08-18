import styles from './Instagram.module.scss'

import img01 from '../../../assets/images/Home/instagramSection/img-01.png'
import img02 from '../../../assets/images/Home/instagramSection/img-02.png'
import img03 from '../../../assets/images/Home/instagramSection/img-03.png'
import img04 from '../../../assets/images/Home/instagramSection/img-04.png'
import img05 from '../../../assets/images/Home/instagramSection/img-05.png'
import img06 from '../../../assets/images/Home/instagramSection/img-06.png'
import img07 from '../../../assets/images/Home/instagramSection/img-07.png'
import React from "react";

const Instagram: React.FC = () => {
  return (
    <div className={styles.instagram}>
      <div className={styles.instagram__text}>
        <p className={styles.instagram__title}>Follow Us On Instagram</p>
        <p className={styles.instagram__subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin </p>
      </div>
      <div className={styles.instagram__media}>
        <img className={styles.instagram__img} src={img01} alt="instagram-people"/>
        <img className={styles.instagram__img} src={img02} alt="instagram-people"/>
        <img className={styles.instagram__img} src={img03} alt="instagram-people"/>
        <img className={styles.instagram__img} src={img04} alt="instagram-people"/>
        <img className={styles.instagram__img} src={img05} alt="instagram-people"/>
        <img className={styles.instagram__img} src={img06} alt="instagram-people"/>
        <img className={styles.instagram__img} src={img07} alt="instagram-people"/>
      </div>
    </div>
  )
}

export default Instagram