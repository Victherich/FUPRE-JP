


// src/components/PublicationDetail.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar, FaLink, FaFilePdf } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import logo from '../Images/logo.png'
import { Context } from './Context';
import { useSelector } from 'react-redux';

// Styled Components
const ContainerWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 100px;
    padding-bottom: 100px;
    flex-direction:column;
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  background: #f5f5f5;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  color: #333;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 15px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;

  img {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2em;
  color: rgba(0,0,255,0.5);
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1em;
  color: #555;
  margin: 5px 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
    color: rgba(0,0,255,0.5);
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
  margin-top: 20px;
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: rgba(0,0,255,0.5);
  color: #fff;  
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
  font-weight: bold;
  cursor:pointer;

  &:hover {
    background: rgba(0,0,255,0.7);
  }
`;

const DownloadButton = styled(StyledLink)`
  background: #1e90ff;


  &:hover {
    background: #007bff;
  }
`;

const BackButton = styled.button`
      display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;

  color: blue;  
  text-decoration: none;
  border-radius: 5px;
  border:1px solid blue;
  transition: background 0.3s ease;
  font-weight: bold;
  cursor:pointer;


`


const ViewPdfButton = styled(StyledLink)`
  background: #ff6347;

  &:hover {
    background: #ff4500;
  }
`;


// Component Logic
const PublicationDetail = () => {
  const [publication, setPublication] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const {categories}=useContext(Context)


  const [authorName, setAuthorName] = useState('');





  useEffect(() => {
    axios.get(`https://www.ajga-journal.org/api/get_publication_by_id.php?id=${id}`)
      .then(response => {
        if (response.data.success) {
          setPublication(response.data.publication);
          console.log(response.data.publication);
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => setError('Failed to fetch publication.'));
  }, [id]);


  // Function to get category name from categories array
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id == categoryId);
    console.log(category)
    return category ? category.name : categoryId; // Show name if found, otherwise show ID
  };



  
  useEffect(() => {
    const getAuthorName = async () => {
      const name = await fetchAuthorData(publication?.author_id);
      setAuthorName(name);
    };
  
    getAuthorName();
  }, [publication?.author_id]);



  const fetchAuthorData = async (id) => {
    try {
      const response = await axios.get(`https://www.ajga-journal.org/api/get_author_by_id.php?id=${id}`);
  
      if (response.data.success && response.data.author) {
        return response.data.author.full_name;
      } else {
        return "Author not found"; // Optional: Default message
      }
    } catch (err) {
      console.error("Failed to fetch author details:", err);
      return "Error fetching author"; // Optional: Error message
    }
  };


  const openDocument = (filePath) => {
    if (filePath.endsWith('.pdf')) {
      window.open(`https://www.ajga-journal.org/api/${filePath}`, "_blank");
    } else if (filePath.endsWith('.docx') || filePath.endsWith('.doc')) {
      window.open(`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(`https://www.ajga-journal.org/api/${filePath}`)}`, "_blank");
    } else {
      alert('Unsupported file type.');
    }
  };
  
  


  if (error) {
    return <Container>{error}</Container>;
  }

  if (!publication) {
    return <Container>Loading...</Container>;
  }

  return (
    <ContainerWrap>
      <Container
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        {/* Left Column - Product Image */}
        <ImageWrapper>
          <img 
            src={logo} 
            alt="Publication"
          />
        </ImageWrapper>

        {/* Right Column - Product Details */}
        <Details>
          <Title>{publication.title.toUpperCase()}</Title>

          <Subtitle>
            <FaUser /> Author : {authorName}
          </Subtitle>

          <Subtitle>
  <FaCalendar /> Published Year: {new Date(publication.created_at).getFullYear()}
</Subtitle>




          <Description>
            <strong>Abstract:</strong> {publication.abstract}
          </Description>

          <Description>
            <strong>Keywords:</strong> {publication.keywords}
          </Description>

          <Description>
            <strong>Co-Authors:</strong> {publication.co_authors}
          </Description>

          <Description>
            <strong>Article Category:</strong> {getCategoryName(publication.article_category)}
          </Description>

          <Description>
            <strong>Article Code:</strong> {publication.article_code}
          </Description>


          

          {/* <ViewPdfButton 
  onClick={() => window.open(`https://www.ajga-journal.org/api/${publication.file_path}`, "_blank")}
>
  <FaFilePdf /> View PDF
</ViewPdfButton> */}

<ViewPdfButton onClick={() => openDocument(publication.file_path)}>
  <FaFilePdf /> View Document
</ViewPdfButton>





          <DownloadButton 
            href={`https://www.ajga-journal.org/api/${publication.file_path}`} 
            target="_blank"
          >
            <FaFilePdf /> Download Document
          </DownloadButton>


          <StyledLink onClick={()=>window.open(`${publication.doiLink}`,"_blank")}>
            <FaLink /> View DOI Link
          </StyledLink>
        </Details>
      </Container>
      <BackButton onClick={()=>window.history.back()}>Back</BackButton>
    </ContainerWrap>
  );
};

export default PublicationDetail;
