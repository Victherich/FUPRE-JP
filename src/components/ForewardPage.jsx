
import React from "react";
import styled from "styled-components";
import forewordImg from "../Images/p12.jpg"; // <- optional banner image (replace if needed)

// ---------------------- Styled Components ----------------------

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f7fb;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
`;

const Banner = styled.div`
  width: 100%;
  max-width: 1200px;
//   height: 260px;
  border-radius: 18px;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentCard = styled.div`
  background: white;
  width: 100%;
  max-width: 900px;
  padding: 45px 40px;
  border-radius: 16px;
  line-height: 1.75;
  font-size: 1.12rem;
  color: #2a2a2a;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    padding: 30px 22px;
    font-size: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.6rem;
  font-family: "Georgia", serif;
  font-weight: 700;
  color: #002855;
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Signature = styled.div`
  margin-top: 40px;
  font-weight: bold;
  font-size: 1.15rem;
  color: #002855;
  text-align: right;
`;

// ---------------------- Component ----------------------

export default function ForewordPage() {
  return (
    <PageWrapper>

      {/* Optional Header Image */}
      <Banner>
        <BannerImg src={forewordImg} alt="Foreword banner" />
      </Banner>

      <ContentCard>
        <Title>FOREWORD</Title>

        <p>
          The FUPRE Journal of PetroScience is a well thought journal publication by Prof Ezekiel
          Agbalagba (The former Dean, College of Science) and was considered by the professors in the
          College of Science, Federal University of Petroleum Resources Effurun, Nigeria. The editors
          were appointed and relevant articles that will interest a greater number of the public
          within the science and engineering fields were called for submissions. In addition, the
          maiden conference of the college was organized, papers were presented and quality ones
          among them were considered for publication. This journal is proud to roll out her maiden
          edition with 16 articles.
        </p>

        <p>
          The aim of the journal is to publish quality papers and to become a globally accepted journal.
          On that note, there is a submission website (www.fuprecosjournals.org) and an official email
          cosjournal@fupre.edu.ng dedicated for this purpose. Authors are encouraged to use the email
          for all their correspondence as whatsapp is not official and not allowed. The submissions made
          in this journal is forwarded to the section editor who is familiar with the submitted work and
          he decides whether to send the work out for review or to reject the submission if it doesn’t
          fall within the scope of the journal.
        </p>

        <p>
          This journal is ready to disseminate exciting and interesting outcomes from research within
          the science and engineering fields. It will continue to enhance in size, quality, output,
          knowledge and acceptability. The editors are committed to ensuring original works that will
          add value to humanity and new knowledge based articles are published in this journal. The
          authors are always encouraged to strictly follow the guidelines in order to reduce time wasted
          in formatting the articles for publication.
        </p>

        <p>
          It is our priority to ensure that authors and readers of this journal are satisfied with the
          quality of the publication and information contained in any volume or issue of this great
          journal. The editorial board will make sure that there are no misleading information or
          contribution in this journal, however, in case of any, the authors take full responsibility
          for any consequences that may result therein.
        </p>

        <p>
          Articles are collected any time of the year and responses shall be given to authors without
          delay as we understand that information could become stale or obsolete when delayed.
        </p>

        <Signature>
          Prof Mary Olire Edema<br />
          Editor in Chief
        </Signature>
      </ContentCard>
    </PageWrapper>
  );
}
