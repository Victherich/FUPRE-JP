import React from "react";
import { useNavigate } from "react-router-dom";
import styled , {keyframes} from "styled-components";




const buttonSlide = keyframes`
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 200% 0%;
    }
  `


const CTAContainer = styled.section`
  padding: 60px 20px;
  text-align: center;
   position:relative;

  h2{
    color:#f4f4f4;
    font-size:2rem;
  }
    p{
    color:#f6f6f6;
    }
`;



const CTAButton = styled.button`
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 18px;
  background: linear-gradient(to right, #3a1c71, #d76d77, #3a1c71);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
   animation: ${buttonSlide} 3s linear infinite;
   background-size: 200% 200%;

  &:hover {
    // background: #d76d77;
  }
`;

const CTA = () => {
  const navigate = useNavigate();
  return (
    <CTAContainer id="cta">
      <h2>Get Involved Today</h2>
      <p>Submit your research and join a global network of researchers.</p>
      <CTAButton  onClick = {()=>navigate('/authordashboard')}>Submit Now</CTAButton>
    </CTAContainer>
  );
};

export default CTA;
