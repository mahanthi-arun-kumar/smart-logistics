import React from "react";
import './Footer.css';
import fb from './images/facebook.png';
import instagram from './images/instagram.png';
import twitter from './images/twitter.png';
import linkedin from './images/linkedIn.png';

function Footer() {
  return (
    <footer className="footer container-fluid ">
      <div className="row">
        <div className="col-12">
          <div className="container footer-nav-container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3 footer-branding">
                <div className="company-logo">
                  {/* <img
                    src="" have to put  my logo here
                    alt=""
                  /> */}
                </div>
                <div className="social-media-link mt-4">
                  <ul className="list">
                    <li>
                      {" "}
                      <a
                        href="https://www.facebook.com/abc.in"
                        target="_blank"
                      >
                        {" "}
                        <img
                          src={fb}
                          alt="social-links"
                        />{" "}
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a href="https://twitter.com/Boxigo6" target="_blank">
                        {" "}
                        <img
                          src={twitter}
                          alt="social-links"
                        />{" "}
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a
                        href=""
                        target="_blank"
                      >
                        {" "}
                        <img
                          src={linkedin}
                          alt="social-links"
                        />{" "}
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a
                        href="#"
                        target="_blank"
                      >
                        {" "}
                        <img
                          src={instagram}
                          alt="social-links"
                        />{" "}
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9">
                <div className="footer-nav-links">
                  <ul className="p-0">
                    <li>
                      <a href="#"> Home </a>
                    </li>
                    <li>
                      <a href="#"> About Us </a>
                    </li>
                    <li>
                      <a href="#"> Contact </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        {" "}
                        Login{" "}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="contact-info">
                  <div className="address">
                    <h6 className="title"> Address </h6>
                    <p className="pr-4">
                      100/D, 3rd Floor, 80 Feet Rd, Opp. Police Station,
                      HSR Layout, Bengaluru
                    </p>
                  </div>
                  <div>
                    <h6 className="title"> Mail Us At </h6>
                    <p>
                      <a
                        href="mailto:smartlogistics@gmail.com"
                        className="text-lowercase"
                      >
                        smartlogistics@gmail.com
                      </a>
                    </p>
                    <h6 className="title"> Call Us At </h6>
                    <p>
                      <a href="tel:+919490282212">+91 9490 282212</a> <br />
                      <a href="tel:+918919768322">+91 8919 768322</a>
                    </p>
                  </div>
                  <div>
                    <h6 className="title"> Quick Links </h6>
                    <ul className="p-0">
                      <li>
                        <a
                          href="#"
                          target="_blank"
                        >
                          {" "}
                          Customer FAQ{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          target="_blank"
                        >
                          {" "}
                          Vendor FAQ{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          target="_blank"
                        >
                          Refund Policy{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          target="_blank"
                        >
                          Vendor Terms and Conditions{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                      <li>
                        <a href="#"> Sitemap </a>
                      </li>
                    </ul>
                  </div>
      
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row pb-3 copyright-and-terms">
        <div className="col-sm-12 col-md-6 text-left">
          © Smart Logistics - ALL RIGHTS RESERVED 2020{" "}
        </div>
        <div className="col-sm-12 col-md-6 text-right">
          <a
            href=""
            target="_blank"
          >
            {" "}
            terms of usage{" "}
          </a>{" "}
          |{" "}
          <a href="#" target="_blank">
            {" "}
            privacy policy{" "}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
