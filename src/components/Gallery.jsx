
import React from "react";
import styled from "styled-components";

// Import your images
import p10 from "../Images/p10.jpeg";
import p11 from "../Images/p11.jpeg";

import p5 from "../Images/p5.jpeg";
import p6 from "../Images/p6.jpeg";
import p7 from "../Images/p7.jpeg";
import p8 from "../Images/p8.jpeg";
import p9 from "../Images/p9.jpeg";
import p13 from '../Images/p13.jpg'

// ===================== Styled Components =====================

// Page wrapper
const GalleryWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fc;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Page title
const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  color: #002855;
  margin-bottom: 40px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

// Responsive grid layout
const GalleryGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 22px;
`;

// Card/box for each image
const ImageCard = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background: #dfe7f5;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// ===================== Gallery Component =====================
export default function Gallery() {
  const IMAGES = [p5, p6, p7, p8, p9, p10, p11, p13];

  return (
    <GalleryWrapper>
      <Title>Gallery</Title>

      <GalleryGrid>
        {IMAGES.map((src, i) => (
          <ImageCard key={i}>
            <Img src={src} alt={`Gallery Image ${i + 1}`} />
          </ImageCard>
        ))}
      </GalleryGrid>
    </GalleryWrapper>
  );
}
