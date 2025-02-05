// src/components/Footer.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>
          <img src="/images/logo.svg" alt="Disney+" />
        </Logo>
        <LinksWrapper>
          <FooterLinks>
            <Link to="/">Disney Terms of Use</Link>
            <Link to="/">Subscriber Agreement</Link>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">US State Privacy Rights</Link>
            <Link to="/">Do Not Sell My Info</Link>
            <Link to="/">Children's Privacy</Link>
            <Link to="/">Help</Link>
            <Link to="/">Supported Devices</Link>
            <Link to="/">Gift Disney+</Link>
            <Link to="/">About Us</Link>
          </FooterLinks>
          <FooterLinks>
            <Link to="/">Partner Program</Link>
            <Link to="/">Interest-based Ads</Link>
          </FooterLinks>
        </LinksWrapper>
        <Copyright> Disney. All Rights Reserved.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  padding: 24px 24px;
  padding-top: 48px;
  background-color: #090b13;
  position: relative;
  z-index: 1;
  margin-top: auto;
  min-height: 200px; /* Ensure consistent footer height */
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Logo = styled.div`
  text-align: center;
  padding-bottom: 28px;

  img {
    width: 80px;
    height: auto;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;

  a {
    color: #f9f9f9;
    font-size: 13px;
    opacity: 0.75;
    transition: opacity 0.2s;
    white-space: nowrap;

    &:hover {
      opacity: 1;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: #f9f9f9;
  font-size: 13px;
  opacity: 0.75;
  padding-top: 16px;
  padding-bottom: 24px;
`;

export default Footer;
