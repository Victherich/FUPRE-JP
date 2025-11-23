import React from "react";
import styled,{keyframes} from "styled-components";
import policycompbg from '../Images/policycompbg.jpg'
import { useNavigate } from "react-router-dom";



const buttonSlide = keyframes`
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 200% 0%;
    }
  `

const SubmitContainer = styled.section`
  background-image: url(${policycompbg});
  background-size: cover;
  // background-position: bottom;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 60px 20px;
  text-align: center;
`;

const SubmitText = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  color: white;

  h2 {
    font-size: 2rem;
  }

  p {
    margin-bottom: 10px;
    text-align: left;
  }
`;

const Button = styled.button`
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

const PublishingPolicyIntro = () => {
    const navigate=useNavigate();
  return (
    <SubmitContainer id="submit">
      <SubmitText>
        <h2>Publishing Policies</h2>
       <p>This journal upholds rigorous peer review, ethical publishing practices, and broad accessibility to ensure the dissemination of high-quality research. We emphasize transparency, global collaboration, and responsible scholarly communication. Explore our policies on open access, article processing charges, copyright, peer review, and indexing to learn more.</p> <ol>
   
        </ol>
      </SubmitText>
      <Button onClick={()=>navigate('/publishingpolicy')}>Explore</Button>
    </SubmitContainer>
  );
};

export default PublishingPolicyIntro;
