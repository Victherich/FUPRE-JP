import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const buttonSlide = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
`;

const SubmitContainer = styled.section`
  background: #f4f8fc; /* Soft light petroleum-neutral */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 70px 20px;
  text-align: center;
  border-radius: 8px;
  margin-top: 30px;
`;

const SubmitText = styled.div`
  background: rgba(11, 32, 58, 0.06); /* subtle bluish tint */
  backdrop-filter: blur(4px);
  padding: 25px 30px;
  max-width: 650px;
  border-radius: 12px;
  color: #1a2e40;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  text-align: left;

  h2 {
    font-size: 2rem;
    color: #0b203a;
    text-align: center;
    margin-bottom: 15px;
    font-weight: 700;
  }

  p {
    margin-bottom: 12px;
    line-height: 1.6;
    color: #34495e;
  }

  ol {
    margin-left: 18px;
  }

  ol li {
    margin-bottom: 8px;
    color: #2c3e50;
  }
`;

const Button = styled.button`
  margin-top: 25px;
  padding: 15px 35px;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(to right, #3a1c71, #d76d77, #3a1c71);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  animation: ${buttonSlide} 3s linear infinite;
  background-size: 200% 200%;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.08);
  }
`;

const Submit = () => {
  const navigate = useNavigate();

  return (
    <SubmitContainer id="submit">
      <SubmitText>
        <h2>How to Submit</h2>
        <p>Submitting your research paper is simple. Follow these steps:</p>

        <ol>
          <li>Create an account on our platform.</li>
          <li>Upload your manuscript with all required details.</li>
          <li>Our editorial board will review your submission.</li>
        </ol>
      </SubmitText>

      <Button onClick={() => navigate("/authordashboard")}>
        Submit Your Paper
      </Button>
    </SubmitContainer>
  );
};

export default Submit;
