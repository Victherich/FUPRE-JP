// import React from "react";
// import styled from "styled-components";
// import { FaBook, FaPenNib, FaUsers } from "react-icons/fa";
// import Issues from "./Issues";
// import h1 from '../Images/h1.jpg'
// import lp1 from '../Images/lp1.jpg'
// import lp2 from '../Images/lp2.jpg'

// const AboutContainer = styled.section`
//   padding: 60px 20px;
//   text-align: center;
//   background-image:url(${lp2});
//   background-size:cover;
//   background-position:center;
//   position:relative;
//   margin-top:10px;
//   display:flex;
//   justify-content:center;
//   flex-direction:column;
//   align-items:center;
//   width:100%;

//   h2{
// //   color:rgba(0,0,255,0.5);
// color:white;
// text-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
// // background-color:rgba(0,0,0,0.2);
// border-radius:10px;
// padding:10px;
//   font-size:2rem;
//   position:relative;
//   }
//   h3{
//     // color:#444;
//     color:rgba(0,0,255,0.7);
//     position:relative;
//   }
//     p{
//         color:#444;
//         position:relative;
//     }


//     &::before{
//     content:'';
//     position:absolute;
//     top:0;
//     left:0;
//     width:100%;
//     height:100%;
//     background-color:rgba(255,255,255,0.9);
//     }
// `;

// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 20px;
//   margin-top: 30px;
//   position:relative;
//   width:100%;
// `;

// const FeatureBox = styled.div`
//   background: rgba(0, 0, 0, 0.1);
//   padding: 20px;
//   border-radius: 10px;
// `;

// const AboutFeature = () => {
//   return (
//     <AboutContainer id="about">
//       <h2>Why Research and Publish With Us?</h2>
//       <FeaturesGrid>
//         <FeatureBox>
//           <FaBook size={40} 
//           style={{ 
//             // color: "rgba(0,0,255,0.4)" ,
//             color:"white"
//             }} />
//           <h3>High Impact Factor</h3>
//           <p>Indexed in top global databases.</p>
//         </FeatureBox>
//         <FeatureBox>
//           <FaPenNib size={40} 
//           style={{ 
//             // color: "rgba(0,0,255,0.4)",
//                 color:"white"
//            }} />
//           <h3>Rigorous Peer Review</h3>
//           <p>Ensuring research quality and integrity.</p>
//         </FeatureBox>
//         <FeatureBox>
//           <FaUsers size={40} 
//           style={{ 
//             // color: "rgba(0,0,255,0.4)" ,
//             color:"white",
//             textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)"
//             }} />
//           <h3>Renowned Editorial Board</h3>
//           <p>Experts from top institutions.</p>
//         </FeatureBox>
//       </FeaturesGrid>
//       <Issues/>
//     </AboutContainer>
//   );
// };

// export default AboutFeature;



import React from "react";
import styled from "styled-components";
import { FaShareAlt, FaUsers, FaClock } from "react-icons/fa";
import lp2 from "../Images/lp2.jpg";
import Issues from "./Issues";

const AboutContainer = styled.section`
  padding: 70px 20px;
  text-align: center;
  background-image: url(${lp2});
  background-size: cover;
  background-position: center;
  position: relative;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;

  h2 {
    color: white;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
    font-size: 2rem;
    position: relative;
    margin-bottom: 15px;
    z-index: 2;
  }

  p {
    color: white;
    max-width: 750px;
    margin-top: 10px;
    font-size: 1.1rem;
    line-height: 1.7;
    z-index: 2;
    position: relative;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
  margin-top: 40px;
  width: 100%;
  max-width: 1100px;
  position: relative;
  z-index: 2;
`;

const FeatureBox = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 25px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
  color: white;
  transition: transform 0.3s, background 0.3s;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.25);
  }

  h3 {
    margin-top: 15px;
    font-size: 1.3rem;
    text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7);
  }

  p {
    color: #f0f0f0;
    font-size: 1rem;
    margin-top: 8px;
  }
`;

const AboutFeature = () => {
  return (
    <AboutContainer id="about">
      <h2>We provide a platform for researchers to share their valuable findings with the global academic community.</h2>

      <FeaturesGrid>
        <FeatureBox>
          <FaShareAlt size={45} style={{ color: "white" }} />
          <h3>Research Dissemination</h3>
          <p>Share your research with the global academic community.</p>
        </FeatureBox>

        <FeatureBox>
          <FaUsers size={45} style={{ color: "white" }} />
          <h3>Collaborative Research</h3>
          <p>Enhance collaboration among researchers worldwide.</p>
        </FeatureBox>

        <FeatureBox>
          <FaClock size={45} style={{ color: "white" }} />
          <h3>Timely Reviews</h3>
          <p>Get timely responses and constructive feedback.</p>
        </FeatureBox>
      </FeaturesGrid>

      <Issues />
    </AboutContainer>
  );
};

export default AboutFeature;
