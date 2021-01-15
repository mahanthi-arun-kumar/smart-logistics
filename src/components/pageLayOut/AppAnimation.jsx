import React, { useState } from "react";
import "./AppAnimation.css";
import MovingTruck from "../../img/moving-truck-blue.png";
import { Button, Input, Label } from "semantic-ui-react";
import Tracking from "../account/order/Tracking";

function AppAnimation() {
  const [open, setOpen] = useState();
  const [trackingId, setTrackingId] = useState();

  return (
    <div className="background-loop-container">
      <div className="background-img"> </div>
      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-12">
        <section className="rw-wrapper">
          <h2 className="rw-sentence">
            <span>Smart logistics</span>
            <br />
            <span>deliver your</span>
            <div className="rw-words rw-words-1">
              <span>emotions</span>
              <span>happiness</span>
              <span>Goods</span>
            </div>
          </h2>
        </section>
      </div>
      <div className="animation-mask animation-mask-3"></div>
      <div className="animation-mask animation-mask-4"></div>
      <div className="truck-icon">
        <img src={MovingTruck} alt="" />
      </div>
    </div>
  );
}

export default AppAnimation;
