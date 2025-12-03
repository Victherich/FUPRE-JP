import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 60px 20px;

  /* Cool color gradient (no warm tones) */
  background: linear-gradient(
    135deg,
    #001f3f 0%,
    #004080 20%,
    #0077b6 40%,
    #00b4d8 60%,
    #48cae4 80%,
    #90e0ef 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  background: rgba(255, 255, 255, 0.85);
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  line-height: 1.7;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 34px;
  margin-bottom: 30px;
  font-weight: 900;
  text-transform: uppercase;

color:#000080;
`;

const Section = styled.div`
  margin-bottom: 28px;
  background: rgba(255, 255, 255, 0.55);
  padding: 18px 20px;
  border-radius: 12px;
  border-left: 5px solid #00b4d8;
`;

const Label = styled.h2`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 12px;
  color: #000080;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Text = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
  color: #0d0d0d;
`;

const Bold = styled.span`
  font-weight: 900;
  color: #000080;
`;

const ImportanceNotice = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Importance Notice</Title>

        <Section>
          <Text>
            Only Highly Quality Papers Will Be Selected For Publication In The
            Fupre Journal of Petroscience.
          </Text>
        </Section>

        <Section>
          <Text>
            All Paper Must Be Sent To The Submission platform:{" "}
            <Bold>www.fuprecosjournals.org</Bold> or the Email:{" "}
            <Bold>cosjournals@fupre.edu.ng</Bold>
          </Text>
        </Section>

        <Section>
          <Label>Fees</Label>
          <Text>
            <Bold>VETTING FEE - ₦5,000</Bold>
          </Text>
          <Text>
            <Bold>PUBLICATION FEE - ₦35,000</Bold>
          </Text>
        </Section>

        <Section>
          <Label>Payment Details</Label>
          <Text>
            <Bold>Account Number:</Bold> 1312648137
          </Text>
          <Text>
            <Bold>Bank:</Bold> Zenith Bank
          </Text>
          <Text>
            <Bold>Account Name:</Bold> College of Sci. conference
          </Text>
        </Section>
      </Container>
    </Wrapper>
  );
};

export default ImportanceNotice;
