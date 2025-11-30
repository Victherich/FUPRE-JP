


// // src/components/PublicationDetail.js
// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { FaUser, FaCalendar, FaLink, FaFilePdf } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';
// import logo from '../Images/logo.jpeg'
// import { Context } from './Context';
// import { useSelector } from 'react-redux';

// // Styled Components
// const ContainerWrap = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     padding-top: 100px;
//     padding-bottom: 100px;
//     flex-direction:column;
// `;

// const Container = styled(motion.div)`
//   max-width: 1200px;
//   margin: auto;
//   padding: 20px;
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 30px;
//   background: #f5f5f5;
//   border-radius: 20px;
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

//   color: #333;
//   width: 100%;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     padding: 15px;
//   }
// `;

// const ImageWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: white;
//   border-radius: 10px;
//   padding: 20px;
//   box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;

//   img {
//     width: 100%;
//     max-height: 500px;
//     object-fit: cover;
//     border-radius: 10px;
//     transition: transform 0.3s ease;
    
//     &:hover {
//       transform: scale(1.05);
//     }
//   }
// `;

// const Details = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const Title = styled.h1`
//   font-size: 2em;
//   color: rgba(0,0,255,0.5);
//   margin-bottom: 10px;
// `;

// const Subtitle = styled.p`
//   font-size: 1em;
//   color: #555;
//   margin: 5px 0;
//   display: flex;
//   align-items: center;

//   svg {
//     margin-right: 8px;
//     color: rgba(0,0,255,0.5);
//   }
// `;

// const Description = styled.p`
//   font-size: 1rem;
//   color: #444;
//   line-height: 1.6;
//   margin-top: 20px;
// `;

// const StyledLink = styled.a`
//   display: inline-block;
//   margin-top: 20px;
//   padding: 10px 20px;
//   background: rgba(0,0,255,0.5);
//   color: #fff;  
//   text-decoration: none;
//   border-radius: 5px;
//   transition: background 0.3s ease;
//   font-weight: bold;
//   cursor:pointer;

//   &:hover {
//     background: rgba(0,0,255,0.7);
//   }
// `;

// const DownloadButton = styled(StyledLink)`
//   background: #1e90ff;


//   &:hover {
//     background: #007bff;
//   }
// `;

// const BackButton = styled.button`
//       display: inline-block;
//   margin-top: 20px;
//   padding: 10px 20px;

//   color: blue;  
//   text-decoration: none;
//   border-radius: 5px;
//   border:1px solid blue;
//   transition: background 0.3s ease;
//   font-weight: bold;
//   cursor:pointer;


// `


// const ViewPdfButton = styled(StyledLink)`
//   background: #ff6347;

//   &:hover {
//     background: #ff4500;
//   }
// `;


// // Component Logic
// const PublicationDetail = () => {
//   const [publication, setPublication] = useState(null);
//   const [error, setError] = useState('');
//   const { id } = useParams();
//   const {categories}=useContext(Context)


//   const [authorName, setAuthorName] = useState('');





//   useEffect(() => {
//     axios.get(`https://www.fuprecosjournals.org/api/get_publication_by_id.php?id=${id}`)
//       .then(response => {
//         if (response.data.success) {
//           setPublication(response.data.publication);
//           console.log(response.data.publication);
//         } else {
//           setError(response.data.message);
//         }
//       })
//       .catch(() => setError('Failed to fetch publication.'));
//   }, [id]);


//   // Function to get category name from categories array
//   const getCategoryName = (categoryId) => {
//     const category = categories.find((cat) => cat.id == categoryId);
//     console.log(category)
//     return category ? category.name : categoryId; // Show name if found, otherwise show ID
//   };



  
//   useEffect(() => {
//     const getAuthorName = async () => {
//       const name = await fetchAuthorData(publication?.author_id);
//       setAuthorName(name);
//     };
  
//     getAuthorName();
//   }, [publication?.author_id]);



//   const fetchAuthorData = async (id) => {
//     try {
//       const response = await axios.get(`https://www.fuprecosjournals.org/api/get_author_by_id.php?id=${id}`);
  
//       if (response.data.success && response.data.author) {
//         return response.data.author.full_name;
//       } else {
//         return "Author not found"; // Optional: Default message
//       }
//     } catch (err) {
//       console.error("Failed to fetch author details:", err);
//       return "Error fetching author"; // Optional: Error message
//     }
//   };


//   const openDocument = (filePath) => {
//     if (filePath.endsWith('.pdf')) {
//       window.open(`https://www.fuprecosjournals.org/api/${filePath}`, "_blank");
//     } else if (filePath.endsWith('.docx') || filePath.endsWith('.doc')) {
//       window.open(`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(`https://www.fuprecosjournals.org/api/${filePath}`)}`, "_blank");
//     } else {
//       alert('Unsupported file type.');
//     }
//   };
  
  


//   if (error) {
//     return <Container>{error}</Container>;
//   }

//   if (!publication) {
//     return <Container>Loading...</Container>;
//   }

//   return (
//     <ContainerWrap>
//       <Container
//         initial={{ opacity: 0 }} 
//         animate={{ opacity: 1 }} 
//         transition={{ duration: 1 }}
//       >
//         {/* Left Column - Product Image */}
//         <ImageWrapper>
//           <img 
//             src={logo} 
//             alt="Publication"
//           />
//         </ImageWrapper>

//         {/* Right Column - Product Details */}
//         <Details>
//           <Title>{publication.title.toUpperCase()}</Title>

//           <Subtitle>
//             <FaUser /> Author : {authorName}
//           </Subtitle>

//           <Subtitle>
//   <FaCalendar /> Published Year: {new Date(publication.created_at).getFullYear()}
// </Subtitle>




//           <Description>
//             <strong>Abstract:</strong> {publication.abstract}
//           </Description>

//           <Description>
//             <strong>Keywords:</strong> {publication.keywords}
//           </Description>

//           <Description>
//             <strong>Co-Authors:</strong> {publication.co_authors}
//           </Description>

//           <Description>
//             <strong>Article Category:</strong> {getCategoryName(publication.article_category)}
//           </Description>

//           <Description>
//             <strong>Article Code:</strong> {publication.article_code}
//           </Description>


          

//           {/* <ViewPdfButton 
//   onClick={() => window.open(`https://www.fuprecosjournals.org/api/${publication.file_path}`, "_blank")}
// >
//   <FaFilePdf /> View PDF
// </ViewPdfButton> */}

// <ViewPdfButton onClick={() => openDocument(publication.file_path)}>
//   <FaFilePdf /> View Document
// </ViewPdfButton>





//           <DownloadButton 
//             href={`https://www.fuprecosjournals.org/api/${publication.file_path}`} 
//             target="_blank"
//           >
//             <FaFilePdf /> Download Document
//           </DownloadButton>


//           <StyledLink onClick={()=>window.open(`${publication.doiLink}`,"_blank")}>
//             <FaLink /> View DOI Link
//           </StyledLink>
//         </Details>
//       </Container>
//       <BackButton onClick={()=>window.history.back()}>Back</BackButton>
//     </ContainerWrap>
//   );
// };

// export default PublicationDetail;





// PublicationDetail.js without logo, redesigned layout
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar, FaLink, FaFilePdf, FaShareAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Context } from './Context';
import { Helmet } from "react-helmet-async";


const Wrapper = styled.div`
  width: 100%;
  background: #f1f3f7;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
`;

const Card = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 25px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #1b2a4a;
  margin: 0;
  // line-height: 1.3;
`;

const Meta = styled.p`
  font-size: 1rem;
  color: #44506a;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Section = styled.div`
  background: #f7f9fc;
  padding: 20px;
  border-radius: 15px;
  border-left: 4px solid #3c74ff;
`;

const Label = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #3c74ff;
`;

const Content = styled.p`
  margin-top: 8px;
  font-size: 0.95rem;
  color: #333;
  line-height: 1.6;
`;

const ButtonRow = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Button = styled.a`
  padding: 12px 18px;
  border-radius: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  background: ${(p)=>p.color || '#3c74ff'};
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
    transform: translateY(-3px);
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 22px;
  border-radius: 10px;
  background: transparent;
  border: 2px solid #3c74ff;
  color: #3c74ff;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: #3c74ff;
    color: white;
  }
`;

const PublicationDetail = () => {
  const [publication, setPublication] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { categories } = useContext(Context);
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    axios.get(`https://www.fuprecosjournals.org/api/get_publication_by_id.php?id=${id}`)
      .then((res) => {
        if (res.data.success) {
          setPublication(res.data.publication);
        } else setError(res.data.message);
      })
      .catch(() => setError('Failed to fetch publication.'));
  }, [id]);

  const getCategoryName = (catId) => {
    const c = categories.find((x) => x.id == catId);
    return c ? c.name : catId;
  };

  useEffect(() => {
    if (!publication?.author_id) return;

    axios.get(`https://www.fuprecosjournals.org/api/get_author_by_id.php?id=${publication.author_id}`)
      .then(res => {
        if (res.data.success) setAuthorName(res.data.author.full_name);
        else setAuthorName('Unknown Author');
      })
      .catch(() => setAuthorName('Unknown'));
  }, [publication?.author_id]);

  const openDocument = (filePath) => {
    if (!filePath) return;

    if (filePath.endsWith('.pdf')) {
      window.open(`https://www.fuprecosjournals.org/api/${filePath}`, '_blank');
    } else {
      window.open(`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(`https://www.fuprecosjournals.org/api/${filePath}`)}`);
    }
  };



// Build full PDF URL
const pdfUrl = publication?.file_path 
  ? `https://www.fuprecosjournals.org/api/${publication.file_path}`
  : "";





const handleShare = async () => {
  const shareData = {
    title: publication.title,
    text: publication.abstract?.slice(0, 150) + "...",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log("Shared successfully");
    } catch (err) {
      console.log("Share cancelled:", err);
    }
  } else {
    // Fallback: copy link to clipboard
    navigator.clipboard.writeText(shareData.url);
    alert("Link copied to clipboard!");
  }
};






  if (error) return <Wrapper>{error}</Wrapper>;
  if (!publication) return <Wrapper>Loading...</Wrapper>;

  return (
    <>
  
    <Helmet>
  <title>{publication.title}</title>

  {/* Google Scholar Required Metadata */}
  <meta name="citation_title" content={publication.title} />
  <meta name="citation_author" content={authorName} />
  <meta name="citation_publication_date" content={publication.created_at?.split(" ")[0]} />
  <meta name="citation_journal_title" content="FUPRE Journal of Petroscience" />
  <meta name="citation_pdf_url" content={pdfUrl} />
  <meta name="citation_keywords" content={publication.keywords} />

  {/* Optional but recommended */}
  {publication.co_authors && publication.co_authors
    .split(",")
    .map((co) => (
      <meta name="citation_author" content={co.trim()} />
    ))}

  <meta name="citation_abstract" content={publication.abstract} />
  <meta name="citation_language" content="en" />
</Helmet>


<Helmet>
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "headline": "${publication.title}",
        "author": "${authorName}",
        "datePublished": "${publication.created_at}",
        "description": "${publication.abstract}",
        "keywords": "${publication.keywords}",
        "url": "https://www.fuprecosjournals.org/publicationdetail/${publication.id}",
        "publisher": {
          "@type": "Organization",
          "name": "FUPRE Journal of Petroscience"
        },
        "encoding": {
          "@type": "MediaObject",
          "contentUrl": "https://www.fuprecosjournals.org/api/${publication.file_path}",
          "encodingFormat": "application/pdf"
        }
      }
    `}
  </script>
</Helmet>


    <Wrapper>
      <Card initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Title>{publication.title.toUpperCase()}</Title>

        <Meta><FaUser /> {authorName}</Meta>
        <Meta><FaCalendar /> Published: {new Date(publication.created_at).getFullYear()}</Meta>

        <Section>
          <Label>Abstract</Label>
          <Content>{publication.abstract}</Content>
        </Section>

        <Section>
          <Label>Keywords</Label>
          <Content>{publication.keywords}</Content>
        </Section>

        <Section>
          <Label>Co-Authors</Label>
          <Content>{publication.co_authors}</Content>
        </Section>

        <Section>
          <Label>Category</Label>
          <Content>{getCategoryName(publication.article_category)}</Content>
        </Section>

        <Section>
          <Label>Article Code</Label>
          <Content>{publication.article_code}</Content>
        </Section>

        <ButtonRow>
          <Button color="#ff6347" onClick={() => openDocument(publication.file_path)}>
            <FaFilePdf /> View Document
          </Button>

          <Button color="#1e90ff" href={`https://www.fuprecosjournals.org/api/${publication.file_path}`} target="_blank">
            <FaFilePdf /> Download
          </Button>

          <Button color="#3c74ff" onClick={() => window.open(publication.doiLink, '_blank')}>
            <FaLink /> DOI Link
          </Button>

          {/* <Button 
  color="#28a745" 
  href={`https://www.fuprecosjournals.org/api/publicationdetail.php?id=${publication.id}`} 
  target="_blank"
>
  <FaLink /> Google Scholar Version
</Button> */}

<Button color="#17a2b8" onClick={handleShare}>
  <FaShareAlt /> Share
</Button>


        </ButtonRow>

        <BackButton onClick={() => window.history.back()}>Back</BackButton>
      </Card>
    </Wrapper>

      </>
  );
};

export default PublicationDetail;