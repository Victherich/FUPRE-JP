// src/pages/PublishingPolicies.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ImportanceNotice from "./ImportanceNotice";

// -------- Styled Components --------

const PageWrapper = styled.div`
  padding: 120px 20px 80px;
  background: #f7f9fc;
  display: flex;
  justify-content: center;
`;

const ContentBox = styled(motion.div)`
  max-width: 1100px;
  background: #ffffff;
  padding: 50px 40px;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 14px;
  line-height: 1.7;
  font-size: 1.07rem;
  color: #333;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 35px;
  color: #003366;
  font-weight: 800;
`;

const SectionTitle = styled.h2`
  font-size: 1.45rem;
  margin-top: 30px;
  color: #004b8d;
  font-weight: 700;
`;

const Paragraph = styled.p`
  margin-top: 10px;
`;

const Divider = styled.hr`
  margin: 35px 0;
  border: none;
  border-top: 1px solid #d9d9d9;
`;

// -------- Component --------

export default function PublishingPolicies() {
  return (
    <PageWrapper>
      <ContentBox
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Heading>PUBLICATION POLICIES</Heading>

        <SectionTitle>Publication Ethics</SectionTitle>
        <Paragraph>
          The journal ensures that top quality articles are published. Authors should give credits to
          original authors that made discoveries which they referenced. These are the proper ethics
          in publishing and we are poised to uphold such standards in order to provide accurate and
          up to date information to the public.
        </Paragraph>

        <Divider />

        <SectionTitle>Falsification and fabrication of data</SectionTitle>
        <Paragraph>
          The journal prohibits any form of false date which implies that the research was not
          conducted. In addition, any alteration of data in order to provide more interesting data
          is not allowed. Any result whether good or bad is a result and should be submitted as
          obtained. When discovered that authors of research works or manuscripts or published
          papers have fabricated or falsified any data or results, such could be punished and the
          publication removed and the authors would be blacklisted.
        </Paragraph>

        <Divider />

        <SectionTitle>Editors and Reviewers</SectionTitle>
        <Paragraph>
          The editors, reviewers should not have any form of relationship with authors of a
          manuscript. When reviewers are familiar with a work submitted by an author, they should
          inform the managing editor so that the work will be re-assigned to an unknown reviewer.
          The journal maintains blind review of manuscripts for fairness and constructive comments.
        </Paragraph>

        <Divider />

        <SectionTitle>Plagiarism</SectionTitle>
        <Paragraph>
          Any form of plagiarism is not acceptable in this journal. Plagiarism is a serious offence
          and authors should not take one’s ideas without proper citation. A work will be retracted
          when the journal notices that it was plagiarized without adequate referencing.
        </Paragraph>

        <Divider />

        <SectionTitle>Multiple submissions</SectionTitle>
        <Paragraph>
          Authors should refrain from multiple submissions at the same time as this leads to waste
          of time for peer reviewers and editors. It could also damage the credibility of authors as
          well as journals If discovered and sanctions follows.
        </Paragraph>

        <Divider />

        <SectionTitle>Citation of works</SectionTitle>
        <Paragraph>
          Authors must make sure that works are cited appropriately, wrong citations are not allowed
          or unnecessary citations of one’s work in order to increase citation index is not
          encouraged.
        </Paragraph>

        <Divider />

        <SectionTitle>Authorship of works</SectionTitle>
        <Paragraph>
          The authors in a manuscript must be researchers who have contributed towards the work in
          form of conceptualization, writing, editing, experimentation, funding, resources etc. The
          corresponding author should ensure that authors who have not contributed must not be
          listed, however, institutions, persons and agencies can be acknowledged.
        </Paragraph>

        <Divider />

        <SectionTitle>Sanctions</SectionTitle>
        <Paragraph>
          FUPREJP is positioned for readers delight and proper dissemination of new findings. Anyone
          who tries to breach or violate the policies and guidelines of the journal will be
          sanctioned.
        </Paragraph>
        <ImportanceNotice/>
      </ContentBox>
    </PageWrapper>
  );
}
