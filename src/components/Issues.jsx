import React from "react";
import styled from "styled-components";
import drilling from "../Images/p1.png";
import reservoir from "../Images/p2.png";
import energy from "../Images/p3.png";
import geology from '../Images/p4.jpg'

const FeaturesSection = styled.section`
  padding: 70px 20px;
  text-align: center;
  background: #0b203a; /* Deep petroleum blue */
  position: relative;
  border-radius: 8px;
  margin-top: 30px;

  h2 {
    color: #ffffff;
    font-size: 2.2rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
  }

  p.lead {
    color: #dce3ec;
    max-width: 750px;
    margin: 10px auto;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

/* Accepts prop `single` to change layout when there is only one card */
const FeaturesGrid = styled.div`
  display: grid;
  gap: 25px;
  margin-top: 40px;

  /* normal responsive grid */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

  /* when single prop provided, make single item span full width */
  ${(props) =>
    props.single &&
    `
    grid-template-columns: 1fr;
    & > * {
      grid-column: 1 / -1;
    }
  `}

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(5px);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  color: white;
  transition: 0.3s ease-in-out;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.2);
  }

  h3 {
    margin-top: 15px;
    font-size: 1.35rem;
    color: #89c4ff;
  }

  p {
    margin-top: 8px;
    color: #e6eff7;
    font-size: 1rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 10px;
`;

/* You can manage features as an array — easier to render and control length */
const FEATURES = [
  {
    id: 1,
    img: drilling,
    title: "Advanced Drilling Technologies",
    desc: "Innovative methods improving drilling efficiency, safety, and subsurface accuracy.",
  },
  {
    id: 2,
    img: reservoir,
    title: "Reservoir Simulation & Modeling",
    desc: "Cutting-edge simulations for predicting fluid flow and optimizing hydrocarbon recovery.",
  },
  {
    id: 3,
    img: energy,
    title: "Sustainable Energy & Petro-Innovation",
    desc: "Exploring cleaner technologies and the future of energy within the petro-industry.",
  },
  {
    id: 4,
    img: geology,
    title: "Geological & Geophysical Analysis",
    desc: "Integrating seismic interpretation and subsurface evaluation for precise exploration decisions.",
  },
];


const MajorFeatures = ({ items = FEATURES }) => {
  // items is an array of features; component caller may pass a custom array
  const single = items.length === 1;

  return (
    <FeaturesSection id="features">
      <h2>Major Features</h2>
      <p className="lead">
        Discover key areas of research driving innovation in petroleum science, reservoir engineering,
        drilling technology, and sustainable energy exploration.
      </p>

      <FeaturesGrid single={single}>
        {items.map((f) => (
          <Card key={f.id}>
            <CardImage src={f.img} alt={f.title} />
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </Card>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
};

export default MajorFeatures;
