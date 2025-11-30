import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowUp, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from '../Images/logo.png'
import logo3 from '../Images/logo3.jpeg'

const FooterContainer = styled.footer`
  background: rgba(0, 0, 50, 0.5);
  color: white;
  padding: 60px 20px 30px;
  backdrop-filter: blur(6px);
  position: relative;
`;

const FooterGrid = styled.div`
  max-width: 1300px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 45px;
`;

const FooterSection = styled.div`
  h2 {
    font-size: 1.3rem;
    color: #ffffff;
    margin-bottom: 15px;
    font-weight: 900;
    letter-spacing: 0.8px;
  }

  p, a {
    font-size: 15px;
    color: white;
    display: block;
    margin-top: 8px;
    line-height: 1.5;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #ffffff;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  a {
    color: #cfd4e3;
    font-size: 22px;
    transition: 0.3s ease;
  }

  a:hover {
    color: #ffffff;
    transform: scale(1.1);
  }
`;

const NewsletterInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  border-radius: 6px;
  border: none;
  outline: none;
  font-size: 15px;
`;

const SubscribeButton = styled.button`
  margin-top: 12px;
  padding: 12px 16px;
  font-size: 15px;
  border: none;
  background: #0048ff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
  width: 100%;

  &:hover {
    background: #002f9c;
  }
`;

const FooterInfo = styled.div`
  margin-top: 45px;
  text-align: center;
  color: #ebedf1ff;
  font-size: 14px;
  line-height: 1.6;
`;

const BackToTop = styled.button`
  position: fixed;
  bottom: 22px;
  right: 22px;
  background: #0048ff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.3);
  transition: 0.3s ease;

  &:hover {
    background: #002f9c;
    transform: scale(1.15);
  }
`;

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => setShowTopBtn(window.scrollY > 300));
  }, []);

  return (
    <FooterContainer>
      <FooterGrid>
        {/* About Section */}
        <FooterSection>
          <h2>FUPRE Journal of Petroscience</h2>
          <p>A peer-reviewed platform committed to advancing research in reservoir studies, drilling innovation, geoscience, and sustainable energy exploration.</p>
        </FooterSection>

   


        {/* Quick Links */}
        <FooterSection>
          <h2>Quick Links</h2>
          <a onClick={() => navigate("/")}>Home</a>
          <a onClick={() => navigate("/aboutus")}>About</a>
          <a onClick={() => navigate("/publishingpolicy")}>Publishing Policies</a>
          <a onClick={() => navigate("/authorlogin")}>Submit a Manuscript</a>
          <a onClick={() => navigate("/contactus")}>Contact</a>
        </FooterSection>

        {/* Indexing Info */}
        <FooterSection>
          <h2>Journal Information</h2>
          <p>ISSN (Print): 1595-5028</p>
          <p>ISSN (Online): xxxx-xxxx</p>
          <p>Indexed in:</p>
          <p>• Google Scholar</p>
          <p>• Scopus</p>
          <p>• Web of Science</p>
        </FooterSection>

        {/* Contact Info */}
        <FooterSection>
          <h2>Contact</h2>
          <p>College of Science, Federal University of Petroleum Resources Effurun,</p>
          <p>Delta State, Nigeria</p>
          <p>📧 cosjournals@fupre.edu.ng</p>
          <p>📞 +234 (0) 907 042 2286</p>
          <SocialIcons>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </SocialIcons>
        </FooterSection>

        {/* Newsletter */}
        <FooterSection>
          <h2>Stay Updated</h2>
          <p>Get alerts on new issues, calls for papers, and journal updates.</p>
          <NewsletterInput type="email" placeholder="Enter your email" required />
          <SubscribeButton>Subscribe</SubscribeButton>
        </FooterSection>

     <FooterSection>
          <img src={logo} alt='logo' style={{width:"100px", borderRadius:"20px"}}/>
          <img src={logo3} alt='logo3' style={{width:"300px", borderRadius:"20px", marginTop:"20px"}}/>
        </FooterSection>

      </FooterGrid>

      <FooterInfo>
        © {new Date().getFullYear()} FUPRE JP. All rights reserved.
        <br />
        <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/publishingpolicy")}>
          Publishing Policy
        </a>
      </FooterInfo>

      <FooterInfo>
     
        <a style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() =>window.open('https://elexdontech.com/', '_blank')}>
          POWERED BY ELEXDON  DIGITAL TECHNOLOGIES LIMITED
        </a>
      </FooterInfo>

      {showTopBtn && (
        <BackToTop onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <FaArrowUp size={18} />
        </BackToTop>
      )}
    </FooterContainer>
  );
}
