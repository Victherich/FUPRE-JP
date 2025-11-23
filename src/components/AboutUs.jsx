// import React from "react";
// import styled, { keyframes } from "styled-components";
// import { FaGlobe, FaBullseye, FaBook, FaUsers, FaHandshake, FaEnvelope, FaPhone } from "react-icons/fa";
// import introImage from "../Images/logo.jpeg";
// import missionImage from "../Images/p1.png";
// import journalsImage from "../Images/p2.png";
// import conferenceImage from "../Images/p3.png";
// import contactImage from "../Images/p1.png";

// // Animations
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// // Styled Components
// const Container = styled.div`
//   font-family: "Arial", sans-serif;
//   padding: 60px 20px;
//   background: #f2f6fb;
//   animation: ${fadeIn} 1s ease-in-out;
// `;

// const Section = styled.section`
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: center;
//   max-width: 1200px;
//   margin: 40px auto;
//   background: white;
//   padding: 30px;
//   border-radius: 12px;
//   box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
//   animation: ${fadeIn} 1s ease-in-out;

//   &:nth-child(even) {
//     flex-direction: row-reverse;
//   }

//   @media (max-width: 768px) {
//     flex-direction: column !important;
//     text-align: center;
//   }
// `;

// const Image = styled.img`
//   width: 40%;
//   border-radius: 12px;
//   margin: 0 20px;

//   @media (max-width: 768px) {
//     width: 80%;
//     margin: 0 auto 20px;
//   }
// `;

// const Content = styled.div`
//   flex: 1;
// `;

// const Title = styled.h2`
//   font-size: 28px;
//   margin-bottom: 15px;
//   color: #003366;
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const Text = styled.p`
//   font-size: 17px;
//   line-height: 1.6;
//   color: #333;
// `;

// const List = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin-top: 10px;
// `;

// const ListItem = styled.li`
//   font-size: 16px;
//   margin: 8px 0;
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const AboutUs = () => {
//   return (
//     <Container>
//       {/* Introduction */}
//       <Section>
//         <Image src={introImage} alt="Introduction" />
//         <Content>
//           <Title><FaGlobe /> About the Journal</Title>
//           <Text>
//             Our journal is a peer-reviewed academic platform dedicated to advancing research in petroleum sciences. We provide a credible platform for researchers, industry professionals, and academics to publish, collaborate, and share innovative ideas in the field.
//           </Text>
//         </Content>
//       </Section>

//       {/* Mission */}
//       <Section>
//         <Content>
//           <Title><FaBullseye /> Mission</Title>
//           <Text>
//             Our mission is to foster knowledge, innovation, and collaboration in petroleum sciences. We aim to disseminate high-quality research, promote ethical publication practices, and contribute to the development of the industry through rigorous peer-reviewed publications and conferences.
//           </Text>
//         </Content>
//         <Image src={missionImage} alt="Mission" />
//       </Section>

//       {/* Journals */}
//       <Section>
//         <Image src={journalsImage} alt="Journals" />
//         <Content>
//           <Title><FaBook /> Our Journals</Title>
//           <Text>
//             We publish multiple peer-reviewed journals covering petroleum engineering, geoscience, energy studies, and environmental impact. All journals adhere to strict editorial and ethical standards to ensure high-quality scholarly output.
//           </Text>
//         </Content>
//       </Section>

//       {/* Conferences */}
//       <Section>
//         <Content>
//           <Title><FaUsers /> Conferences</Title>
//           <Text>
//             Our conferences bring together global researchers, professionals, and students to discuss cutting-edge developments in petroleum sciences. Participants gain opportunities for networking, collaboration, and knowledge exchange.
//           </Text>
//         </Content>
//         <Image src={conferenceImage} alt="Conferences" />
//       </Section>

//       {/* Contact */}
//       <Section>
//         <Image src={contactImage} alt="Contact" />
//         <Content>
//           <Title><FaEnvelope /> Contact Us</Title>
//           <List>
//             <ListItem><FaGlobe /> Petroleum Sciences Journal Platform</ListItem>
//             <ListItem><FaUsers /> Delta State, Nigeria</ListItem>
//             <ListItem><FaEnvelope /> journal@fupre.edu.ng</ListItem>
//             <ListItem><FaPhone /> +234 (0) 123 456 7890</ListItem>
//           </List>
//         </Content>
//       </Section>
//     </Container>
//   );
// };

// export default AboutUs;




import React from 'react';
import styled from 'styled-components';
import p5 from '../Images/p5.jpeg'
import p6 from '../Images/p6.jpeg'
import p7 from '../Images/p7.jpeg'
import p8 from '../Images/p8.jpeg'
import p9 from '../Images/p9.jpeg'
import p10 from '../Images/p10.jpeg'
import p11 from '../Images/p11.jpeg'


// --- Styled Components ---

const AboutUsContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin-top:50px;
`;

const Section = styled.section`
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const SectionTitle = styled.h2`
  color: #004d40; /* Dark Teal */
  border-bottom: 3px solid #004d40;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const SubSectionTitle = styled.h3`
  color: #00796b; /* Medium Teal */
  margin-top: 25px;
  margin-bottom: 15px;
`;

const TextBlock = styled.p`
  margin-bottom: 15px;
`;

const List = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
  margin-bottom: 15px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const Emphasis = styled.strong`
  color: #d84315; /* Deep Orange for emphasis */
`;

const EmailLink = styled.a`
  color: #004d40;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const ContactInfo = styled.div`
  background-color: #e0f2f1; /* Light Teal background */
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
`;

const TeamList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TeamMember = styled.li`
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 1px dashed #bdbdbd;
`;

const MemberName = styled.strong`
  display: block;
  font-size: 1.1em;
  color: #00796b;
`;

const MemberRole = styled.span`
  display: block;
  font-style: italic;
  margin-bottom: 5px;
  color: #5d5d5d;
`;

const MemberDetails = styled.span`
  display: block;
  margin-left: 10px;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  color: #333;
  font-style: italic;
  border-radius: 8px;
  backgroundimage
`;

// --- React Component ---

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <SectionTitle>About Us</SectionTitle>

      {/* ABOUT THE JOURNAL */}
      <Section>
        <SubSectionTitle>ABOUT THE JOURNAL</SubSectionTitle>
        <TextBlock>
          The <strong>
            FUPRE Journal of PetroScience (FUPREJP)
            </strong> is a peer reviewed that publishes **hot topics and research results /articles/papers, communications and reviews** in all aspects of **Science and Applied science fields**. It receives submission at any time of the year, after which the manuscript is assigned to a sectional editor who sends the work out for review. The papers are accepted based on the outcome of the peer review process and the editorial assessment.
        </TextBlock>
        {/* <ImagePlaceholder> */}
          <img src={p10} alt="p10" style={{width:"100%"}}/>
        {/* </ImagePlaceholder> */}
        <TextBlock>
          The mission of this journal is to make it easy for researchers to have access to **cutting edge innovations in the field of sciences and applied sciences**.
        </TextBlock>

        <SubSectionTitle>The main objectives of the journal are:</SubSectionTitle>
        <List>
          <ListItem>To create a platform where researchers share their works and get clearer views from colleagues.</ListItem>
          <ListItem>For collaborations and connectivity with one another especially researchers in this same field.</ListItem>
          <ListItem>To enhance productivity and growth of knowledge</ListItem>
        </List>
      </Section>

      {/* Contributors/Authors Guidelines */}
      <Section>
        <SubSectionTitle>Contributors/Authors Guidelines</SubSectionTitle>
        <TextBlock>
          The journal will accept papers at any time of the year and publish online but the print copies would be printed **twice a year – in May and December**. The format for the presentation of the manuscript is as follows: **Title, Abstract, Keywords, Introduction, Materials and Methods, Results and Discussion, Conclusion, Acknowledgement, References**.
        </TextBlock>

        <SubSectionTitle>Keywords</SubSectionTitle>
        <TextBlock>
          Key words (**3-5**) should be below the Abstract to assist with indexing of the articles. These should not duplicate key words from the title.
        </TextBlock>

        <SubSectionTitle>1. Originality</SubSectionTitle>
        <TextBlock>
          The research submitted by authors must be **original articles not submitted elsewhere**, review articles are such that will stimulate the interest of the readers and all articles must be in **clear and understandable language**.
        </TextBlock>

        <SubSectionTitle>2. Requirement:</SubSectionTitle>
        <TextBlock>
          All manuscripts must be prepared in **English** and in **Microsoft Word format** using on a **12-point font-face of Times New Roman**. Manuscripts are submitted to this journal with the understanding that they have not been previously published neither are they currently under consideration for publication elsewhere. Also, it is considered that the author has obtained any necessary authorization for publication of the material submitted. Hence, authors are required to certify in a cover letter stating that <Emphasis>"This manuscript has not been previously published, nor is it currently under consideration for publication in another journal"</Emphasis> Prior to submission, authors are encouraged to take advantage of professional language editing and copyediting services. Electronic copies of manuscripts typewritten in **Times New Roman (12)**, are properly arranged before sending as attachments to <EmailLink href="mailto:cosjournals@fupre.edu.ng">cosjournals@fupre.edu.ng</EmailLink> or <EmailLink href="mailto:fuprejp@fupre.edu.ng">fuprejp@fupre.edu.ng</EmailLink>
        </TextBlock>
        
        <SubSectionTitle>3. Title papers:</SubSectionTitle>
        <TextBlock>
          The title should be **concise, clear** and reflect the content of the paper.
        </TextBlock>
        
        <SubSectionTitle>4. Names and address of the authors:</SubSectionTitle>
        <TextBlock>
          The names of the authors (s) should follow the title. The address of the place where the research was conducted should be given. **Avoid the use of titles for authors**. Also E-mail address and phone numbers should be specified for easy reach
        </TextBlock>
        
        <SubSectionTitle>5. Abstract:</SubSectionTitle>
        <TextBlock>
          The abstract should be **clear and concise** and **not more than 300 words**. The abstract should give the scope, purpose, procedures, significant result and conclusions of the research work.
        </TextBlock>
        
        <SubSectionTitle>6. Introduction:</SubSectionTitle>
        <TextBlock>
          The introduction should contain the purpose of the study being reported. There should be **adequate literature search** of works earlier done in order to reflect the knowledge gap. Literature that does not contribute to understanding the problem or research work should not be included.
        </TextBlock>
        
        <SubSectionTitle>7. Materials and Methods</SubSectionTitle>
        <TextBlock>
          The authors should state procedures of common knowledge and **avoid clumsy explanations**. Details should be referred to literature cited. **New approaches or methodology should however receive detailed attention**.
        </TextBlock>
        
        <SubSectionTitle>8. Results and Discussion:</SubSectionTitle>
        <TextBlock>
          The **results and Discussion should be combined**. Direct repetition of methodology should be avoided under this section. Authors should discuss their results and avoid just highlighting their results.
        </TextBlock>
        
        <SubSectionTitle>9. Tables and figures</SubSectionTitle>
        <TextBlock>
          Tables and figures should be placed in the appropriate places within the text. The figures are tagged appropriately while the table headings should be done properly.
        </TextBlock>
        
        <SubSectionTitle>10. Nomenclature and Abbreviations:</SubSectionTitle>
        <TextBlock>
          Authors are requested to follow the nomenclature and abbreviations that are to be found in other reputable journals. Specialized terms, unusual abbreviations trade names and semi- ambiguous terms should be defined at first point of use.
        </TextBlock>
        
        <SubSectionTitle>11. Acknowledgment:</SubSectionTitle>
        <TextBlock>
          Acknowledgement should be limited to a minimum. All assistance obtained in the form of finance as well as collection of data may be indicated.
        </TextBlock>

        <SubSectionTitle>12. References:</SubSectionTitle>
        <TextBlock>
          Bibliographic references in the text appear like **(Twows, 2010)**, using brackets. When there are more than two authors, only the first author‘s name should be mentioned, followed by **’et al‘**. Papers by the same author in the same year should be identified by lower case letter such as **‘a’, ‘b’, ‘c’** after the date to distinguish the works. Examples include Elemike (2018), Sonto et al. (2011), (Agbalagba, 2019), (Edema and Ogeleka, 2020), (Ogeleka et al., 2020a,b).
        </TextBlock>
        <TextBlock>
          A list of cited references should be presented in **alphabetical order** at the end of the manuscript. All references cited in the work should be found in this list and vice versa. **Unpublished work should not be included** in the list of references. The list of references should be done in the following format.
        </TextBlock>
        
        <SubSectionTitle>Books</SubSectionTitle>
        <TextBlock><Emphasis>Entire book:</Emphasis></TextBlock>
        <TextBlock>
          Chaco, M.C.; Okieimen, F.E. and Edema, M.O. (1993) Laboratory Course in Organic Chemistry, Uri Publishers, Benin City. P. 214
        </TextBlock>
        <TextBlock><Emphasis>Chapter in a book:</Emphasis></TextBlock>
        <TextBlock>
          Anderson, R.J., Schrier, R.W. (1987). Acute renal failure. In: Braunswald, E., Isselbacher, K.J. and Petersdorf, R.G. (eds). Harrison's principles of internal medicine. 11th ed. New York: McGraw-Hill, pp. 1149-1155.
        </TextBlock>

        <SubSectionTitle>Journal articles:</SubSectionTitle>
        <TextBlock>
          Edema, M.O. and Usifoh, C.O. (2000) Synthesis of 2-(-2-aminophenyl)-5-methyloxazole S. Afr.J.Chem.53 (2), 47 – 48.
        </TextBlock>

        <SubSectionTitle>Conference Proceedings:</SubSectionTitle>
        <TextBlock>
          Amenaghawon, N.A., Asogwa, U.J. and Okieimen C.O. (2015). Optimisation of nutrient medium for the production of xanthan gum from pineapple waste using Xanthomonas campestris via submerged fermentation. In: Proceedings of the 1st International Conference on Bioscience Research: 25 – 27 May 2015, Awka, Anambra State, Nigeria.
        </TextBlock>
        
        <SubSectionTitle>Tables:</SubSectionTitle>
        <TextBlock>
          Tables can be used to present data but they must be referred to in the text. The tables should be prepared to be as simple and as small as possible. Each table should have a caption above it that sufficiently describes it with resorting to the text for explanation.
        </TextBlock>
        <TextBlock>
          The table caption (indicating the source) must be placed below the table if the table was obtained outside of the study. Each table must be numbered consecutively as **Table 1, Table 2** etc. As much as possible, tables should be placed close to where they are mentioned in the text.
        </TextBlock>
        {/* <ImagePlaceholder></ImagePlaceholder> */}

        <SubSectionTitle>Figures:</SubSectionTitle>
        <TextBlock>
          Figures should be **electronically drawn or produced in black and white colour** using appropriate software and should be made to be as small as possible. Photographs shall also be in black and white. They should be of adequate quality such the quality is not significantly reduced upon resizing.
        </TextBlock>
        <TextBlock>
          Figures should be very clear and they should be inserted in the appropriate position where they were first referred to in the text. Each figure must be numbered consecutively as **Figure 1, Figure 2** etc. Each figure should have a caption below it that provides sufficient description of the figure. The **same data should not be presented both as a table and as a figure**.
        </TextBlock>

        <SubSectionTitle>Equations:</SubSectionTitle>
        <TextBlock>
          All equations should be written using **equation editor** and numbered consecutively using **Arabic numerals in parenthesis on the right hand margin**. The equation should be referred to in the text as **Equation (1), Equation (2)** etc. All variables must be expressed in **S.I units**.
        </TextBlock>

        <SubSectionTitle>Abbreviations:</SubSectionTitle>
        <TextBlock>
          All variables and non-standard abbreviations should be defined at their first appearance in the text.
        </TextBlock>

        <SubSectionTitle>13. Electronic copies</SubSectionTitle>
        <TextBlock>
          On acceptance of a manuscript, the FUPRE Journal of Petroscience demands an **electronic copy of an error-free manuscript** based on the comments of the reviewers. It should be prepared on compatible system using **Microsoft word**
        </TextBlock>

        <SubSectionTitle>14. Page charges:</SubSectionTitle>
        <TextBlock>
          Handling and page charges are levied on authors. Each article must be accompanied by a processing fee of **Five Thousand Naira (N5,000.00) only**, while the page charge of **Thirty-Five Thousand Naira (N35,000)** is required for the first 8 pages and an additional **One thousand Naira N1000.00)** per page thereafter after a successful peer review process. All payments should be made to the **Zenith Bank, current account (1312648137) of FEDERAL UNIVERSITY OF PETROLEUM RESOURCES COLLEGE OF SCIENCE CONFERENCE**. Scanned tellers should be sent as attachments along with the manuscript to <EmailLink href="mailto:cosjournals@fupre.edu.ng">cosjournals@fupre.edu.ng</EmailLink>. **Lengthy articles (above 8 pages) and will attract extra charge**.
        </TextBlock>

        <SubSectionTitle>15. Submission of Manuscript</SubSectionTitle>
        <TextBlock>
          Manuscripts should be submitted to the Managing Editor as an attached file in **MS-Word format** to <EmailLink href="mailto:cosjournals@fupre.edu.ng">cosjournals@fupre.edu.ng</EmailLink> or <EmailLink href="mailto:managingeditor@fupre.edu.ng">managingeditor@fupre.edu.ng</EmailLink>.
        </TextBlock>

        <ContactInfo>
          <TextBlock><Emphasis>Editorial Office:</Emphasis> Dean’s Office, College of Science, Federal University of Petroleum Resources Effurun, Delta State, Nigeria.</TextBlock>
        </ContactInfo>
      </Section>

      {/* EDITORIAL TEAM */}
      <Section>
        <SectionTitle>EDITORIAL TEAM</SectionTitle>

        <SubSectionTitle>EDITOR IN CHIEF</SubSectionTitle>
        <TeamList>
          <TeamMember>
            <MemberName>PROF MARY OLIRE EDEMA</MemberName>
            <MemberDetails>DEPARTMENT OF CHEMISTRY, FEDERAL UNIVERSITY OF PETROLEUM RESOURCES EFFURUN, NIGERIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:edema.mary@fupre.edu.ng">edema.mary@fupre.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
        </TeamList>

        <SubSectionTitle>MANAGING EDITOR</SubSectionTitle>
        <TeamList>
          <TeamMember>
            <MemberName>DR ELIAS EMEKA ELEMIKE</MemberName>
            <MemberDetails>DEPARTMENT OF CHEMISTRY, FEDERAL UNIVERSITY OF PETROLEUM RESOURCES EFFURUN, NIGERIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:elemike.elias@fupre.edu.ng">elemike.elias@fupre.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
        </TeamList>

        <SubSectionTitle>ASSOCIATE EDITORS</SubSectionTitle>
        <TeamList>
          {/* Physical sciences */}
          <MemberRole>Section editors: Physical sciences</MemberRole>
          <TeamMember>
            <MemberName>1. PROF OSAFILE OMOSEDE</MemberName>
            <MemberDetails>DEPARTMENT OF PHYSICS, FEDERAL UNIVERSITY OF PETROLEUM RESOURCES EFFURUN, NIGERIA.</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:osafile.omosede@fupre.edu.ng">osafile.omosede@fupre.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>2. DR KARTIK N. SHINDE</MemberName>
            <MemberDetails>DIRECTOR, N.S. SCIENCE AND ARTS COLLEGE, BHADRAWATI, DIST-CHANDRAPUR INDIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:rajekartik@gmail.com">rajekartik@gmail.com</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>3. DR JUDITH UMUKORO</MemberName>
            <MemberDetails>DEPARTMENT OF PHYSICS, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:Umukoro.judith@fupre.edu.ng">Umukoro.judith@fupre.edu.ng</EmailLink></MemberDetails>
          </TeamMember>

          {/* Mathematical & Computing sciences */}
          <MemberRole>Section Editors: Mathematical & Computing sciences</MemberRole>
          <TeamMember>
            <MemberName>4. DR IFEANYI UGBENE JEFF</MemberName>
            <MemberDetails>DEPARTMENT OF MATHEMATICS, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:Ugbene.ifeanyichukwu@fupre.edu.ng">Ugbene.ifeanyichukwu@fupre.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>5. DR CHRISTOPHER IFEANYI EKE</MemberName>
            <MemberDetails>DEPARTMENT OF COMPUTER SCIENCE, FEDERAL UNIVERSITY LAFIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:eke.christopher@science.fulafia.edu.ng">eke.christopher@science.fulafia.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>6. DR SAMUEL ZELIBE</MemberName>
            <MemberDetails>SCHOOL OF COMPUTING AND MATHEMATICAL SCIENCES, UNIVERSITY OF GREENWICH, UNITED KINGDOM</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:s.zelibe@greenwich.ac.uk">s.zelibe@greenwich.ac.uk</EmailLink></MemberDetails>
          </TeamMember>
          
          {/* Materials Science & Engineering */}
          <MemberRole>Section Editors: Materials Science & Engineering</MemberRole>
          <TeamMember>
            <MemberName>7. PROF CHINEDUM MGBEMENA</MemberName>
            <MemberDetails>DEPARTMENT OF MECHANICAL ENGINEERING, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:mgbemena.ogonna@fupre.edu.ng">mgbemena.ogonna@fupre.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>8. PROF DAMIAN ONWUDIWE</MemberName>
            <MemberDetails>DEPARTMENT OF CHEMISTRY, NORTH WEST UNIVERSITY MAFIKENG, SOUTH AFRICA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:Damian.onwudiwe@nwu.ac.za">Damian.onwudiwe@nwu.ac.za</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>9. PROF AMBALI ABDULKARIM SAKA</MemberName>
            <MemberDetails>DEPARTMENT OF CHEMICAL ENGINEERING, FEDERAL UNIVERSITY OF TECHNOLOGY MINNA, NIGERIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:kasaka2003@futminna.edu.ng">kasaka2003@futminna.edu.ng</EmailLink></MemberDetails>
          </TeamMember>

          {/* Chemical and Petroleum sciences */}
          <MemberRole>Sectional editors: Chemical and Petroleum sciences</MemberRole>
          <TeamMember>
            <MemberName>10. DR PRINCE JOE NNA</MemberName>
            <MemberDetails>DEPARTMENT OF CHEMISTRY, IGNATIUS AJURU UNIVERSITY OF EDUCATION PORT HARCOURT, RIVERS STATE NIGERIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:princejoe.nna@iaue.edu.ng">princejoe.nna@iaue.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>11. DR OZIOMA AKAKURU</MemberName>
            <MemberDetails>DEPARTMENT OF CHEMICAL AND PETROLUEM ENGINEEERING, UNIVERSITY OF CALGARY, CANADA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:ozioma.akakuru@ucalgary.ca">ozioma.akakuru@ucalgary.ca</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>12. DR WILFRED OKOLOGUME</MemberName>
            <MemberDetails>DEPARTMENT OF PETROLEUM ENGINEERING, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:okologume.wilfred@fupre.edu.ng">okologume.wilfred@fupre.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>13. DR CALLISTUS IHEME</MemberName>
            <MemberDetails>DEPARTMENT OF FORENSIC SCIENCE, FEDERAL UNIVERSITY OF TECHNOLOGY OWERRI, NIGERIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:kallyiheme@gmail.com">kallyiheme@gmail.com</EmailLink></MemberDetails>
          </TeamMember>

          {/* Environmental Sciences */}
          <MemberRole>Sectional Editors: Environmental Sciences</MemberRole>
          <TeamMember>
            <MemberName>14. DR EDJERE OGHENEKOHWIRORO</MemberName>
            <MemberDetails>DEPARTMENT OF ENVIRONMENTAL MANAGEMENT AND TOXICOLOGY, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN, NIGERIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:edjere.oghenekohwiroro@fupre.edu.ng">edjere.oghenekohwiroro@fupre.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>15. PROF ANTHONY OKOYE</MemberName>
            <MemberDetails>DEPARTMENT OF ENVIRONMENTAL MANAGEMENT, NNAMDI AZIKIWE UNIVERSITY AWKA, NIGERIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:ac.okoye@unizik.edu.ng">ac.okoye@unizik.edu.ng</EmailLink></MemberDetails>
          </TeamMember>

          {/* Geological and Earth Sciences */}
          <MemberRole>Section Editors: Geological and Earth Sciences</MemberRole>
          <TeamMember>
            <MemberName>16. DR EKEOMA CHINEMELU</MemberName>
            <MemberDetails>DEPARTMENT OF EARTH SCIENCES, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN, NIGERIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:ekeoma.chinemelu@fupre.edu.ng">ekeoma.chinemelu@fupre.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
          <TeamMember>
            <MemberName>17. PROF LEONARD ONUBA</MemberName>
            <MemberDetails>DEPARTMENT OF GEOLOGY, CHUKWUEMEKA ODUMEGWU OJUKWU UNIVERSITY, ANAMBRA, NIGERIA</MemberDetails>
            <MemberDetails>Contact: <EmailLink href="mailto:ln.onuba@coou.edu.ng">ln.onuba@coou.edu.ng</EmailLink></MemberDetails>
          </TeamMember>
        </TeamList>
      </Section>

      {/* EDITORIAL ADVISORY BOARD */}
      <Section>
        <SectionTitle>EDITORIAL ADVISORY BOARD</SectionTitle>
        <List style={{ listStyleType: 'decimal' }}>
          <ListItem>PROF AKPOFURE RIM-RUKEH<MemberDetails>DEPARTMENT OF ENVIRONMENTAL MANAGEMENT AND TOXICOLOGY, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN, NIGERIA</MemberDetails></ListItem>
          <ListItem>PROF EZEKIEL O. AGBALAGBA<MemberDetails>DEPARTMENT OF PHYSICS, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN, NIGERIA</MemberDetails></ListItem>
          <ListItem>PROF IWEKUMO EBIBOFE AGBOZU<MemberDetails>DEPARTMENT OF ENVIRONMENTAL MANAGEMENT AND TOXICOLOGY, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN, NIGERIA.</MemberDetails></ListItem>
          <ListItem>PROF EDISON ENAIBE<MemberDetails>DEPARTMENT OF PHYSICS, FEDERAL UNIVERSITY OF PETROLEUM RESOURCES EFFFURN</MemberDetails></ListItem>
          <ListItem>PROF KENNETH A.IBE<MemberDetails>DEPARTMENT OF CHEMISTRY, FEDERAL UNIVERSITY OF PETROLEUM RESOURCES EFFURUN</MemberDetails></ListItem>
          <ListItem>PROF DIFFERENCE OGAGARUE<MemberDetails>DEPARTMENT OF EARTH SCIENCES, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN, NIGERIA</MemberDetails></ListItem>
          <ListItem>PROF DORIS OGELEKA<MemberDetails>DEPARTMENT OF CHEMISTRY, FEDERAL UNIVERSITY OF PETROLUEM RESOURCES EFFURUN, NIGERIA</MemberDetails></ListItem>
        </List>
        <img src={p7} alt="p7"/>
      </Section>

      {/* Correspondence */}
      <Section>
        <SubSectionTitle>All correspondence to:</SubSectionTitle>
        <ContactInfo>
          <TextBlock>
            **Dr Elias Emeka Elemike** (BSc, MSc, PhD, MCSN, MICCON, MRSC)
          </TextBlock>
          <TextBlock>
            Department of Chemistry,
            <br />
            Federal University of Petroleum Resources Effurun, Nigeria.
            <br />
            <EmailLink href="mailto:cosjournals@fupre.edu.ng">cosjournals@fupre.edu.ng</EmailLink>
          </TextBlock>
        </ContactInfo>
      </Section>

    </AboutUsContainer>
  );
};

export default AboutUs;