import React from "react";
import "./styles/Footer.css";
import Image from 'next/image';
import logo from '@/assets/logo.svg';
import fb from "@/assets/icons/facebook.png";
import twitter from "@/assets/icons/twitter.png";
import linkedin from "@/assets/icons/linkedin.png";
import instagram from "@/assets/icons/instagram.png";
import google from "@/assets/icons/google.png";
import app from "@/assets/icons/app.png";
import youtube from "@/assets/icons/youtube.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer section_padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links_div">
            <Image src={logo} alt="logo" className="logo" />
            <div className='text'>
              Best information about the company<br/>
              goes here but now lorem ipsum is
            </div>
            <div className="socialMedia">
              <a href="https://facebook.com/">
                <p><Image src={fb} alt=""/></p>
              </a>
              <a href="https://twitter.com/">
                <p><Image src={twitter} alt=""/></p>
              </a>
              <a href="https://linkedin.com/">
                <p><Image src={linkedin} alt=""/></p>
              </a>
              <a href="https://instagram.com/">
                <p><Image src={instagram} alt=""/></p>
              </a>
              <a href="https://www.youtube.com/">
                <p><Image src={youtube} alt=""/></p>
              </a>
            </div>
          </div>
          <div className="sb__footer-links_div">
            <h4>About</h4>
            <a href="/About Us">
              <p>About Us</p>
            </a>
            <a href="/Find store">
              <p>Find Store</p>
            </a>
            <a href="/Categories">
              <p>Categories</p>
            </a>
            <a href="/Blogs">
              <p>Blogs</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Partnership</h4>
            <a href="/About Us">
              <p>About Us</p>
            </a>
            <a href="/Find store">
              <p>Find Store</p>
            </a>
            <a href="/Categories">
              <p>Categories</p>
            </a>
            <a href="/Blogs">
              <p>Blogs</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Information</h4>
            <a href="/Help Center">
              <p>Help Center</p>
            </a>
            <a href="/Money Refund">
              <p>Money Refund</p>
            </a>
            <a href="/Shipping">
              <p>Shipping</p>
            </a>
            <a href="/Contact Us">
              <p>Contact Us</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>For Users</h4>
            <a href="/Login">
              <p>Login</p>
            </a>
            <a href="/Register">
              <p>Register</p>
            </a>
            <a href="/Settings">
              <p>Settings</p>
            </a>
            <a href="/My Orders">
              <p>My Orders</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Get app</h4>
            <div className="socialMedia">
              <p><img src={google} alt=""/></p>
            </div>
            <div className="socialMedia">
              <p><img src={app} alt=""/></p>
            </div>
          </div>
        </div>

        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <p>
              @{new Date().getFullYear()} MboaMarket. All right reserved.
            </p>
          </div>
          <div className="sb__footer-below-links">
            <a href="/terms"><div><p>Terms & Conditions</p></div></a>
            <a href="/privacy"><div><p>Privacy</p></div></a>
            <a href="/security"><div><p>Security</p></div></a>
            <a href="/cookie"><div><p>Cookie Declaration</p></div></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;