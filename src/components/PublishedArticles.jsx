

import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { FaSearch, FaDownload, FaFilePdf, FaFileAlt, FaNewspaper, FaTrashAlt } from "react-icons/fa";
import Hero4 from "./Hero4";
import Sidebar from "./SideBar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "./Context";
import logo from '../Images/logo.png'

// **Typing Animation**
const PageTitle = styled.h2`
  font-size: 1.5rem;
  color: rgba(0, 0, 255, 0.5);
  // color:#555;
  white-space: nowrap;
  overflow: hidden;
//   border-right: 3px solid rgba(0, 0, 255, 0.7); /* Cursor effect */
  width: fit-content;
//   animation: blinkCursor 0.8s steps(2, start) infinite;
  text-align:center;
  margin:0 auto;
  text-wrap:wrap;

  @keyframes blinkCursor {
    50% {
      border-color: transparent;
    }
  }
`;

// **Fade-in Animation**
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// **Styled Components**
const Container = styled.div`
  font-family: "Arial", sans-serif;
//   background-color: white;
  color: rgba(0, 0, 255, 0.5);
  padding: 20px;
  padding-bottom:100px;
  width:100%;
`;

const Header = styled.header`
  padding: 20px;
  text-align: center;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 60%;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  outline:none;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background: rgba(0,0,255,0.5);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(0,0,255,0.7);
  }
`;

const ArchiveSection = styled.section`
  margin-top: 50px;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const ArchiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 20px;
`;

const ArchiveCard = styled.div`
  // background: rgba(0, 0, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
  transition: 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  color: rgba(0, 0, 255, 0.8);
`;

const CardText = styled.p`
  font-size: 0.8rem;
  color: #333;
  margin-top:10px;
`;

const CardActions = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const CardButton = styled.a`
  background:rgba(0,0,255,0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size:0.8rem;
  cursor:pointer;
  
  &:hover {
    background: rgba(0,0,255,0.7);
  }
`;

const Div1 = styled.div`
  display:flex;
  width:100%;
`

const Div2 = styled.div`
  width:25%;
`

const Div3 = styled.div`
  width:75%;
`

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  margin-top: 50px;
  background-color: #f4f4f4;
`;

const Img = styled.img`
  width:30px;
  height:30px;
  border-radius:50%;
`

const TitleWrap = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:10px;
`

const PublishedArticles = () => {
  const [typedText, setTypedText] = useState(""); // Typing effect state
  const fullText = "We are a world-class journal and you can browse past and current issues of our journal in any category.";
  const [publications, setPublications] = useState([]);
  const [titleShow, setTitleShow] = useState(false);
  const articleCategory=0;
  const {categories}=useContext(Context)
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm]=useState('')

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < fullText.length) {
//         setTypedText(fullText.substring(0, index + 1));
//         index++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 100);
//     return () => clearInterval(interval);
//   }, []);





   // Fetch publications based on article category
  //  const fetchPublications = async () => {
  //   // setLoading(true);
  //   // setError('');
  //   const loadingAlert = Swal.fire({text:"Please wait..."})
  //   Swal.showLoading();
    
  //   try {
  //     const response = await axios.get(
  //       `https://www.fuprecosjournals.org/api/get_publications_by_category.php?article_category=${articleCategory}`
  //     );
      
  //     if (response.data.success) {
  //       setPublications(response.data.publications);
  //       console.log(response.data.publications)
  //     } else {
  //       Swal.fire({text:'Failed to fetch publications.'});
  //     }
  //   } catch (error) {
  //     Swal.fire({text:'Error occurred while fetching publications.'});
  //     console.error('Fetch error:', error);
  //   }finally{
  //     loadingAlert.close();
  //   }    
    
  // };

   const fetchPublications = async () => {
      const loadingAlert = Swal.fire({ text: "Please wait..." });
      Swal.showLoading();
    
      try {
        const response = await axios.get(
          `https://www.fuprecosjournals.org/api/get_publications_by_category.php?article_category=${articleCategory}`
        );
    
        if (response.data.success) {
          const rawPublications = response.data.publications;
    
          // STEP 1: Group by year
          const groupedByYear = {};
          rawPublications.forEach(pub => {
            const year = new Date(pub.created_at).getFullYear();
            if (!groupedByYear[year]) groupedByYear[year] = [];
            groupedByYear[year].push(pub);
          });
    
          // STEP 2: Determine volume numbers
          const sortedYears = Object.keys(groupedByYear).sort();
          const baseVolume = 3; // Volume 3 starts in 2025
          const yearToVolume = {};
          sortedYears.forEach((year, index) => {
            yearToVolume[year] = baseVolume + index;
          });
    
          // STEP 3: Assign volume and issue numbers
          const processed = [];
          sortedYears.forEach(year => {
            const pubs = groupedByYear[year];
            pubs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); // sort oldest first
    
            pubs.forEach((pub, i) => {
              processed.push({
                ...pub,
                volume: yearToVolume[year],
                issue: i + 1,
              });
            });
          });
    
          // STEP 4: Set final state
          setPublications(processed);
          console.log(processed);
    
        } else {
          Swal.fire({ text: 'Failed to fetch publications.' });
        }
      } catch (error) {
        Swal.fire({ text: 'Error occurred while fetching publications.' });
        console.error('Fetch error:', error);
      } finally {
        loadingAlert.close();
      }
    };

  // Fetch publications when the component mounts or articleCategory changes
  useEffect(() => {
    fetchPublications();
  }, [articleCategory]);



   // Function to get category name from categories array
   const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id == categoryId);
    console.log(category)
    return category ? category.name : categoryId; // Show name if found, otherwise show ID
  };



  const fetchAuthors = async () => {
    try {
      const response = await axios.get('https://www.fuprecosjournals.org/api/get_all_authors.php');
      
      if (response.data.success) {
        setAuthors(response.data.authors);
        console.log(response.data.authors); // Check if authors are being fetched
      } else {
        console.error('Failed to fetch authors.');
      }
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };


  useEffect(() => {
    fetchAuthors();
  }, []);


  const getAuthorName = (authorId) => {
    const author = authors.find((auth) => auth.id === authorId);
    return author ? author.full_name : "Unknown Author";
  };




  
  const handleSearch = async (e) => {
      e.preventDefault();
      // setLoading(true);
      const loadingAlert = Swal.fire({text:"Please wait..."})
      Swal.showLoading();
      
      try {
        const response = await fetch(
          `https://www.fuprecosjournals.org/api/search_publications_by_title.php?search=${searchTerm}`,
          { cache: "no-store" }
        );
        const data = await response.json();
        if (data.success) {
          setPublications(data.manuscripts);
          setTitleShow(true);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error searching manuscripts:", error);
      } finally {
        // setLoading(false);
        loadingAlert.close();
      }
    };
    




 // **Delete Publication Function**
 const deletePublication = async (publicationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Deleting...",
            text: "Please wait...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const response = await fetch("https://www.fuprecosjournals.org/api/delete_publication.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publication_id: publicationId }),
          });

          const data = await response.json();

          if (data.success) {
            Swal.fire("Deleted!", "The publication has been deleted.", "success");
            setPublications((prev) => prev.filter((m) => m.id !== publicationId));
          } else {
            Swal.fire("Error!", data.error || "Failed to delete publication.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Network issue or server error.", "error");
          console.error("Error deleting publication:", error);
        }
      }
    });
  };



  return (
    <>
      {/* <Hero4 /> */}
      {/* <Div1> */}
        {/* <Div2>
        <Sidebar/>
        </Div2> */}
      {/* <Div3> */}
      <Container>
        <Header>
          <PageTitle>Published Articles</PageTitle>
        </Header>

        <SearchBarContainer>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title"
          />
          <SearchButton onClick={handleSearch}>
            <FaSearch size={20} /> 
          </SearchButton>
        </SearchBarContainer>

        <ArchiveSection>
        {!titleShow?<h3 style={{color:"#777", textDecoration:"underline"}}>{getCategoryName(articleCategory)}</h3>
          :<h3 style={{color:"#777", textDecoration:"underline"}}>Search Result: Found ({publications.length}) items</h3>}
          {titleShow&&<p style={{
            color:"rgba(0,0,255,0.7)",
            marginTop:"10px",
            textDecoration:"underline",
            cursor:"pointer",
            fontWeight:"bold", fontStyle:"italic"
          }}
          onClick={()=>{setSearchTerm('');fetchPublications(); setTitleShow(false)}}
          >Clear Search</p>}

          <ArchiveGrid>
            {/* Example Archive Card */}
            {publications.map((publication)=>(
              <ArchiveCard key={publication.id}>
             <TitleWrap>
             <Img src={logo} alt="logo"/>
             <CardTitle>{publication.title.toUpperCase()}</CardTitle>
             </TitleWrap>
              <CardText><strong>By:</strong> {getAuthorName(publication.author_id)} | In the Year {new Date(publication.created_at).getFullYear()}</CardText>
              <p><strong style={{fontSize:"0.9rem"}}>Volume {publication.volume}, Issue {publication.issue}</strong></p>
          <CardActions>
                <CardButton onClick={()=>navigate(`/publicationdetail/${publication.id}`)} >
                  <FaNewspaper size={20}  />
                  View Publication
                </CardButton>
                <CardButton onClick={()=>deletePublication(publication.id)} >
                  <FaTrashAlt size={20}  />
                  Delete Publication
                </CardButton>
      
              </CardActions>
              </ArchiveCard>
            ))}
           
          </ArchiveGrid>
        </ArchiveSection>

   
      </Container>
      {/* </Div3> */}
      
      {/* </Div1> */}
    </>
  );
};

export default PublishedArticles;
