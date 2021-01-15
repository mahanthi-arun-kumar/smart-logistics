import React, { useState } from "react";
import Circle from "../../img/circle.png";
import Up from "../../img/up.png";
import Down from "../../img/down.png";
import Plan from "../../img/plan.png";
import Book from "../../img/booking.png";
import Compare from "../../img/compare.png";
import Move from "../../img/move1.png";
import { Button, Input, Label } from "semantic-ui-react";
import Tracking from "../account/order/Tracking";

function SmartLogistics() {
  const [open, setOpen] = useState();
  const [trackingId, setTrackingId] = useState();
  return (
    <>
      <Tracking open={open} setOpen={setOpen} trackingId={trackingId} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Input
          icon="truck"
          onChange={(e) => setTrackingId(e.target.value)}
          label={
            <Button
              color="instagram"
              onClick={() => {
                setOpen(true);
              }}
            >
              Track your details
            </Button>
          }
          labelPosition="left"
          placeholder="Tracking ID"
          iconPosition="right"
        />
      </div>
      <section className="section-3 container">
        <div className="heading">
          <h1> How moving with Smart Logistics works? </h1>
          <div className="title"> Easy Procedure </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
            <div className="content-container content-img-1">
              <div className="img-1">
                {" "}
                <img src={Circle} alt="" />{" "}
              </div>
              <div className="img-2 img-fluid">
                {" "}
                <img
                  src={Plan}
                  className="img-fluid"
                  style={{ width: "63px" }}
                  alt=""
                />{" "}
              </div>
              <div className="img-3">
                {" "}
                <img src={Down} className="img-fluid" alt="" />{" "}
              </div>
            </div>
            <div className="content">
              <h5>Plan</h5>
              <p className="description">
                Plan your relocation with our move-planner, designed at its best
                to assist you.
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
            <div className="content-container content-img-2">
              <div className="img-1">
                {" "}
                <img src={Circle} alt="" />{" "}
              </div>
              <div className="img-2 img-fluid">
                {" "}
                <img
                  src={Compare}
                  style={{ width: "88px" }}
                  className="img-fluid"
                  alt=""
                />{" "}
              </div>
              <div className="img-3 up-img">
                {" "}
                <img src={Up} className="img-fluid" alt="" />{" "}
              </div>
            </div>
            <div className="content">
              <h5>Compare</h5>
              <p className="description">
                Get quotations from multiple movers - compare prices, review,
                and select.
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
            <div className="content-container content-img-3">
              <div className="img-1">
                {" "}
                <img src={Circle} alt="" />{" "}
              </div>
              <div className="img-2 img-fluid">
                {" "}
                <img
                  src={Book}
                  className="img-fluid"
                  style={{ width: "63px", marginLeft: "1rem" }}
                  alt=""
                />{" "}
              </div>
              <div className="img-3">
                {" "}
                <img src={Down} className="img-fluid" alt="" />{" "}
              </div>
            </div>
            <div className="content">
              <h5>Book</h5>
              <p className="description">
                It's easy with us! Pick your mover and lock your price- Just one
                click to book.
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
            <div className="content-container content-img-4">
              <div className="img-1">
                {" "}
                <img src={Circle} alt="" />{" "}
              </div>
              <div className="img-2 img-fluid">
                {" "}
                <img
                  src={Move}
                  style={{ width: "88px" }}
                  className="img-fluid"
                  alt=""
                />{" "}
              </div>
            </div>
            <div className="content">
              <h5>Move</h5>
              <p className="description">
                Time to push back your chair! Our resolute associates will
                handle the rest.
              </p>
            </div>
          </div>
        </div>
        {/* <div className="mt-5"> <a href="#top" className="btn btn-primary mt-4">Book Your Move</a> </div> */}
        <div className="row d-none">
          <div className="col-12">
            <div className="heading">
              <h1> How moving with Smart Logistics works? </h1>
              <div className="title"> Easy Procedure </div>
            </div>
            <div className="how-it-works">
              <div className="item-info">
                <div className="img-container">
                  <img
                    src={Plan}
                    className="img-fluid"
                    alt="img"
                    style={{ width: "63px" }}
                  />
                </div>
                <div className="content">
                  <h5>Plan</h5>
                  <p className="description">
                    Create your inventory list using our easy planner and make
                    changes to your inventory any time.{" "}
                  </p>
                </div>
              </div>
              <div className="item-line">
                <div className="line">
                  {" "}
                  <img src={Down} alt="" />
                </div>
              </div>
              <div className="item-info">
                <div className="img-container">
                  <img
                    src={Compare}
                    className="img-fluid"
                    alt="img"
                    style={{ width: "88px" }}
                  />
                </div>
                <div className="content">
                  <h5>Compare</h5>
                  <p className="description">
                    {" "}
                    Get quotes from multiple movers &amp; compare prices for
                    free. Read real reviews and select your mover.{" "}
                  </p>
                </div>
              </div>
              <div className="item-line">
                <div className="line line2"></div>
              </div>
              <div className="item-info">
                <div className="img-container">
                  <img
                    src={Book}
                    className="img-fluid"
                    alt="img"
                    style={{ width: "63px" }}
                  />
                </div>
                <div className="content">
                  <h5>Book</h5>
                  <p className="description">
                    {" "}
                    Make changes even after you book &amp; lock your price. Pay
                    only 2 business days before your move. Cancel for free.{" "}
                  </p>
                </div>
              </div>
              <div className="item-line">
                <div className="line line3"></div>
              </div>
              <div className="item-info">
                <div className="img-container">
                  <img
                    src={Move}
                    className="img-fluid"
                    alt="img"
                    style={{ width: "88px" }}
                  />
                </div>
                <div className="content">
                  <h5>Move</h5>
                  <p className="description">
                    {" "}
                    Relax. We will handle payments so you don't need to worry
                    about move day surprises.{" "}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="text-center mt-5">
            <a href="#top" className="btn btn-primary book-move text-white"> Book Your Move </a>
        </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default SmartLogistics;
