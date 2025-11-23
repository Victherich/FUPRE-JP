
// src/pages/FUPREJP.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// -------- Styled Components --------
const PageWrapper = styled.div`
  padding: 100px 20px;
  background: #edf2faff;
  display: flex;
  justify-content: center;
`;

const ContentBox = styled(motion.div)`
  max-width: 1100px;
  background: #ffffff;
  padding: 50px 40px;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 6px 20px;
  line-height: 1.7;
  font-size: 1.05rem;
  color: #333;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 40px;
  font-weight: 800;
  color: #002d62;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: 700;
  color: #004b8d;
`;

const Paragraph = styled.p`
  margin-top: 12px;
`;

const List = styled.ul`
  margin-top: 10px;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-top: 6px;
`;

const Divider = styled.hr`
  margin: 35px 0;
  border: none;
  border-top: 1px solid #d9d9d9;
`;

// -------- Component --------
export default function Scope() {
  return (
    <PageWrapper>
      <ContentBox
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Heading>FUPRE JOURNAL OF PETROSCIENCE (FUPREJP)</Heading>

        <Paragraph>
          FUPRE Journal of Petroscience is a journal devoted to the publication of peer reviewed
          original research on general science, applied science, engineering and technology. with
          special interest in petroleum science related works including, petroleum exploration, data
          acquisition, monitoring and management, petroleum engineering, petrochemicals, physics,
          chemistry and biology of petroleum, energy science and petroleum environment. The journal
          aims to receive research papers, critical review articles, short communications and
          scientific policy briefs in the field of petroleum science covering:
        </Paragraph>

        <SectionTitle>(A) Developments of the Petroleum industry in different perspectives:</SectionTitle>
        <List>
          <ListItem>(1) Exploration and exploitation</ListItem>
          <ListItem>(2) Petroleum refining and petrochemicals</ListItem>
          <ListItem>(3) Petrophysics</ListItem>
          <ListItem>(4) Sustainable hydrocarbon exploration and production</ListItem>
          <ListItem>(4) Catalysis</ListItem>
          <ListItem>(5) Petroleum data science and machine learning; process integration & intensification</ListItem>
        </List>

        <SectionTitle>(B) Monitoring and Management papers should cover the fields of:</SectionTitle>
        <List>
          <ListItem>(1) Petroleum analysis and the environment</ListItem>
          <ListItem>(2) Fate and transport of pollutants in the environment</ListItem>
          <ListItem>(3) Case studies covering petroleum monitoring and public health</ListItem>
          <ListItem>(4) Environmental regulation and legislation in petroleum industry</ListItem>
          <ListItem>(5) Industrial and hazardous waste- legislation, characterization, management practices, minimization, treatment and disposal</ListItem>
          <ListItem>(6) Environmental management and remediation</ListItem>
          <ListItem>(7) climate-water-energy-food nexus; novel materials for environmental, chemical and energy applications;</ListItem>
          <ListItem>(8) Achieving net-zero emission targets</ListItem>
          <ListItem>(9) Sensing, impact and risk assessment methodologies with applications in petroleum environmental engineering;</ListItem>
          <ListItem>(10) Endogenous resource recovery</ListItem>
        </List>

        <SectionTitle>(C) Development of advanced, safer, green and sustainable energy technologies covering:</SectionTitle>
        <List>
          <ListItem>(1) carbon-neutral circular and self-sufficient bio-based economy</ListItem>
          <ListItem>(2) Bioenergy and biofuels</ListItem>
          <ListItem>(3) Energy transition and conversion technologies</ListItem>
          <ListItem>(4) Responsible and sustainable energy generation; carbon capture, utilization and storage (CCUS); geothermal energy; hydrogen production, transport, and storage; underground gas storage; application of artificial intelligence, machine learning and data analytics in energy industry; and sustainable hydrocarbon exploration and production.</ListItem>
        </List>

        <SectionTitle>(D) All fields of General Science</SectionTitle>
        <Divider />
      </ContentBox>
    </PageWrapper>
  );
}
