import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import heroVideo from "../Images/media1.mp4";
import logo3 from '../Images/logo3.jpeg'

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  overflow: hidden;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Transparent overlay ABOVE video but BELOW text
const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2); /* Adjust opacity here */
  z-index: 1;
`;

// Text Container
const HeroText = styled.div`
  position: absolute;
  z-index: 2; /* Text above overlay */
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
  opacity: 0;
  transform: translateY(50px);
  animation: ${(props) => (props.isVisible ? "flyInFromBottom 1.5s ease-out forwards" : "none")};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 428px) {
    font-size: 2rem;
  }

  @keyframes flyInFromBottom {
    from {
      opacity: 0;
      transform: translateY(300px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroTitle2 = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
  opacity: 0;
  transform: translateY(50px);
  animation: ${(props) => (props.isVisible ? "flyInFromSide 1.5s ease-out forwards" : "none")};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 428px) {
    font-size: 2rem;
  }

  @keyframes flyInFromSide {
    from {
      opacity: 0;
      transform: translateX(500px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: translateY(-50px);
  animation: ${(props) => (props.isVisible ? "flyInFromTop 1s ease-out forwards" : "none")};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 428px) {
    font-size: 1rem;
  }

  @keyframes flyInFromTop {
    from {
      opacity: 0;
      transform: translateY(-300px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroImg  = styled.img`
width:250px;
border-radius:20px;
`

// Hero Component
const Hero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <HeroContainer ref={heroRef}>
      <video autoPlay muted loop>
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay added */}
      <HeroOverlay />

      <HeroText>
        <HeroTitle isVisible={isVisible}>FUPRE JP</HeroTitle>
        <HeroTitle2 isVisible={isVisible}>
          FUPRE JOURNAL OF PETROSCIENCE
        </HeroTitle2>
        <HeroImg src={logo3} alt='logo3'/>
        {/* <HeroSubtitle isVisible={isVisible}>Advancing knowledge and innovation globally</HeroSubtitle> */}
      </HeroText>
    </HeroContainer>
  );
};

export default Hero;
