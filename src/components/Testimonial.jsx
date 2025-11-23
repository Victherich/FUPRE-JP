import React from "react";
import styled from "styled-components";
import { FaThumbsUp } from "react-icons/fa";
import CTA from "./CTA";

const Section = styled.section`
  padding: 80px 20px;
  background: rgba(0, 0, 50, 0.5);  /* Your chosen color */
  backdrop-filter: blur(4px);
  text-align: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 10px;
  text-shadow: 0 4px 10px rgba(0,0,0,0.4);
`;

const Subtitle = styled.p`
  font-size: 1.15rem;
  color: #d0d8ff;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 28px;
  width: 100%;
`;

const Card = styled.div`
  width: 320px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.25);
  box-shadow: 0 10px 25px rgba(0,0,0,0.35);
  transition: 0.35s ease-in-out;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.18);
    box-shadow: 0 14px 30px rgba(0,0,0,0.45);
  }

  h3 {
    margin-top: 15px;
    font-size: 1.28rem;
    font-weight: 700;
    color: #a8c8ff;
  }

  p {
    margin-top: 10px;
    font-size: 1rem;
    color: #e8eeff;
    line-height: 1.55;
  }
`;

const IconWrap = styled.div`
  width: 65px;
  height: 65px;
  background: rgba(180, 200, 255, 0.25);
  border: 1px solid rgba(255,255,255,0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  margin: 0 auto;
  box-shadow: 0 8px 18px rgba(0,0,0,0.4);
`;

const Testimonials = () => {
  return (
    <Section id="testimonials">
      <Title>What Our Authors & Researchers Say</Title>
      <Subtitle>
        Trusted by professionals, researchers, and academics worldwide.
      </Subtitle>

      <Grid>
        <Card>
          <IconWrap>
            <FaThumbsUp size={28} color="#ffffff" />
          </IconWrap>
          <h3>Amazing Experience</h3>
          <p>"The peer review process was seamless and highly professional." — Dr. Alice</p>
        </Card>

        <Card>
          <IconWrap>
            <FaThumbsUp size={28} color="#ffffff" />
          </IconWrap>
          <h3>Global Reach</h3>
          <p>"My work gained international visibility through this journal." — Dr. Mark</p>
        </Card>

        <Card>
          <IconWrap>
            <FaThumbsUp size={28} color="#ffffff" />
          </IconWrap>
          <h3>Reliable Platform</h3>
          <p>"This journal significantly enhanced my research impact." — Prof. Susan</p>
        </Card>

        <Card>
          <IconWrap>
            <FaThumbsUp size={28} color="#ffffff" />
          </IconWrap>
          <h3>Excellent Support</h3>
          <p>"The editorial team offered feedback that strengthened my work." — Dr. James</p>
        </Card>
      </Grid>

      <CTA />
    </Section>
  );
};

export default Testimonials;
