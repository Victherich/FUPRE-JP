


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// // Styled Components
// const IntroSection = styled.section`
// //   background: linear-gradient(135deg, #0f172a, #1e293b);
// // background:gray;
// background-color:rgba(0,0,255,0.4);
//   color: white;
//   padding: 80px 20px;
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

// `;

// // Typing Animation
// const TypingText = styled.h1`
//   font-size: 2.8rem;
//   font-weight: bold;
//   max-width: 800px;
//   line-height: 1.3;
//   margin-bottom: 20px;
//   white-space: nowrap;
//   overflow: hidden;
//   border-right: 3px solid white; /* Cursor effect */
//   width: fit-content;
//   animation: blinkCursor 0.8s steps(2, start) infinite;

//   @keyframes blinkCursor {
//     50% {
//       border-color: transparent;
//     }
//   }
// `;

// const Subtitle = styled.p`
//   font-size: 1.2rem;
//   max-width: 700px;
// //   color: #ddd;
//   margin-bottom: 30px;
//   opacity: 0;
// //   transition: opacity 1s ease-in-out 1s;
// `;

// const CTAButton = styled.a`
//   background: #007bff;
//   color: white;
//   padding: 12px 24px;
//   font-size: 1rem;
//   font-weight: bold;
//   border-radius: 8px;
//   text-decoration: none;
//   transition: background 0.3s, transform 0.2s;
//   opacity: 0;
//   transition: opacity 1s ease-in-out 1.5s;

//   &:hover {
//     background: #0056b3;
//     transform: scale(1.1);
//   }
// `;


// const More = styled.p`
//  text-decoration:underline;
//  font-style:italic;
//  cursor:pointer;

//  &:hover{
//   color:blue;
//  }
// `

// export default function JournalIntro() {
//   const navigate = useNavigate();
//   const [typedText, setTypedText] = useState("");
//   const fullText = " AJGA Journal is your trusted source for insightful articles, research, and in-depth analysis across a wide range of disciplines. 📢 For Publishers: We welcome researchers, academics, and professionals to share their knowledge with a global audience and contribute to the advancement of knowledge in your field.";

  
  
  
//   const [isVisible, setIsVisible] = useState(false);
//   const introRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           handleShowMore();
//         }
//       },
//       { threshold: 0.5 } // Trigger when 50% is visible
//     );

//     if (introRef.current) {
//       observer.observe(introRef.current);
//     }

//     return () => {
//       if (introRef.current) {
//         observer.unobserve(introRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       let index = 0;
//       const interval = setInterval(() => {
//         if (index < fullText.length) {
//           setTypedText(fullText.substring(0, index + 1));
//           index++;
//         } else {
//           clearInterval(interval);
//         }
//       }, 25);
//       return () => clearInterval(interval);
//     }
//   }, [isVisible]);


//   const [showMore,setShowMore]=useState(false)

//   const handleShowMore=()=>{
//     const id = setTimeout(()=>{
//       setShowMore(true)
//     },8000)

//     return()=>clearTimeout(id)
//   }




//   return (
//     <IntroSection ref={introRef}>
//       {/* <TypingText>{typedText}</TypingText> */}

//       <Subtitle style={{ opacity: isVisible ? 1 : 0 }}>
       
//         {typedText}
//       </Subtitle>

//    {showMore&&<More onClick={()=>navigate('/aboutus')}>More about AJGA</More>}
//     </IntroSection>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const IntroSection = styled.section`
  background: rgba(0, 0, 50, 0.5);
  color: white;
  padding: 100px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  min-height: 65vh;
`;

// Main Typing Text
// const TypingText = styled.h1`
//   font-size: 2.6rem;
//   font-weight: bold;
//   max-width: 900px;
//   line-height: 1.4;
//   margin-bottom: 20px;
//   white-space: nowrap;
//   overflow: hidden;
//   border-right: 3px solid white;
//   width: fit-content;
//   animation: blinkCursor 0.8s steps(2, start) infinite;

//   @keyframes blinkCursor {
//     50% {
//       border-color: transparent;
//     }
//   }

//   @media (max-width: 768px) {
//     font-size: 1.9rem;
//     white-space: normal;
//     border-right: none;
//   }
// `;


const TypingText = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  max-width: 900px;
  line-height: 1.4;
  margin-bottom: 20px;

  /* Allow wrapping ALWAYS */
  white-space: normal;

  /* Typing cursor effect */
  overflow: hidden;
  border-right: 3px solid white;
  width: fit-content;
  animation: blinkCursor 0.8s steps(2, start) infinite;

  @keyframes blinkCursor {
    50% {
      border-color: transparent;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.9rem;
    border-right: none;
  }
`;




const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 850px;
  margin-top: 15px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  line-height: 1.6;

  &.visible {
    opacity: 1;
  }
`;

// CTA Buttons Container
const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 35px;
  opacity: 0;
  transition: opacity 1s ease-in-out 0.5s;

  &.visible {
    opacity: 1;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

// CTA Button
const CTAButton = styled.button`
  background: #007bff;
  color: white;
  padding: 14px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: transform 0.25s, background 0.25s;

  &:hover {
    background: #0056b3;
    transform: scale(1.08);
  }
`;

export default function JournalIntro() {
  const navigate = useNavigate();
  const introRef = useRef(null);
  const [typedText, setTypedText] = useState("");

  const fullText =
    "Welcome to the official journal of the Federal University of Petroleum Resources, Effurun — your gateway to pioneering research and insights in petroleum engineering and energy studies.";

  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (introRef.current) observer.observe(introRef.current);

    return () => {
      if (introRef.current) observer.unobserve(introRef.current);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <IntroSection ref={introRef}>
      {/* Typing Header */}
      <TypingText>{typedText}</TypingText>

      {/* Subtitle fades in once text is done */}
      <Subtitle className={typedText.length === fullText.length ? "visible" : ""}>
        Explore innovative ideas, groundbreaking studies, and contributions from scholars worldwide.
      </Subtitle>

      {/* CTA buttons */}
      <ButtonRow className={typedText.length === fullText.length ? "visible" : ""}>
        <CTAButton onClick={() => navigate("/authorlogin")}>Submit Your Research</CTAButton>
        <CTAButton onClick={() => navigate("/issuesandpubs/0")}>Browse Publications</CTAButton>
      </ButtonRow>
    </IntroSection>
  );
}
