import React from "react";
import "./PeakyBlinders.css";
import modelImage from "../../../assets/images/Home/blindersSection/image.png";

import icon01 from "../../../assets/icons/blinderSection/icon-01.svg";
import icon02 from "../../../assets/icons/blinderSection/icon-02.svg";
import icon03 from "../../../assets/icons/blinderSection/icon-03.svg";
import icon04 from "../../../assets/icons/blinderSection/icon-04.svg";

const PeakyBlinders: React.FC = () => {
  return (
    <section className="peaky">
      <div className="peaky__container">
        <div className="peaky__media">
          <img src={modelImage} alt="Peaky Blinders outfit" className="peaky__img" />
          <div className="peaky__label" style={{ top: "12%", left: "78%" }}>Flat Cap</div>
          <div className="peaky__label" style={{ top: "28%", left: "18%" }}>Suspender</div>
          <div className="peaky__label" style={{ top: "40%", left: "65%" }}>Hugo Boss</div>
          <div className="peaky__label" style={{ top: "58%", left: "18%" }}>Hugo Boss</div>
          <div className="peaky__label" style={{ top: "88%", left: "60%" }}>Santoni</div>
        </div>

        <div className="peaky__panel">
          <div className="peaky__collection">Women Collection</div>
          <h2 className="peaky__title">Peaky Blinders</h2>
          <div className="peaky__subhead">DESCRIPTION</div>
          <p className="peaky__desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin.
          </p>
          <div className="peaky__size-row">
            <span className="peaky__size-label">Size:</span>
            <span className="peaky__size">M</span>
          </div>
          <div className="peaky__price">$100.00</div>
          <button className="peaky__btn">Buy Now</button>
        </div>

        <div className="peaky__features">
          <div className="peaky__feature">
            <img src={icon01} alt="" />
            <div>
              <div className="peaky__feature-title">High Quality</div>
              <div className="peaky__feature-sub">crafted from top materials</div>
            </div>
          </div>
          <div className="peaky__feature">
            <img src={icon02} alt="" />
            <div>
              <div className="peaky__feature-title">Warranty Protection</div>
              <div className="peaky__feature-sub">Over 2 years</div>
            </div>
          </div>
          <div className="peaky__feature">
            <img src={icon03} alt="" />
            <div>
              <div className="peaky__feature-title">Free Shipping</div>
              <div className="peaky__feature-sub">Order over 150 $</div>
            </div>
          </div>
          <div className="peaky__feature">
            <img src={icon04} alt="" />
            <div>
              <div className="peaky__feature-title">24 / 7 Support</div>
              <div className="peaky__feature-sub">Dedicated support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeakyBlinders;
