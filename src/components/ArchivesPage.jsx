// import React, { useState, useEffect, useContext } from "react";
// import styled, { keyframes } from "styled-components";
// import { FaSearch, FaNewspaper } from "react-icons/fa";
// import Hero4 from "./Hero4";
// import Sidebar from "./SideBar";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { Context } from "./Context";
// import logo from '../Images/logo.png';

// // Typing animation
// const TypingContainer = styled.h2`
//   font-size: 1.4rem;
//   color: rgba(0, 0, 50, 0.5);
//   white-space: nowrap;
//   overflow: hidden;
//   border-right: 3px solid rgba(0, 0, 50, 0.5);
//   width: fit-content;
//   animation: blinkCursor 0.8s steps(2, start) infinite;
//   text-align:center;
//   margin: 0 auto 25px;

//   @keyframes blinkCursor {
//     50% { border-color: transparent; }
//   }
// `;

// // Fade-in animation
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(-10px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// // Styled Components
// const Container = styled.div`
//   font-family: "Arial", sans-serif;
//   background-color: #f9f9f9;
//   padding: 30px 20px 100px;
//   color: rgba(0, 0, 50, 0.5);
// `;

// const Header = styled.header`
//   text-align: center;
// `;

// const SearchBarContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 30px;
//   flex-wrap: wrap;
//   gap: 10px;
// `;

// const SearchInput = styled.input`
//   padding: 12px 15px;
//   width: 60%;
//   font-size: 1rem;
//   border: 1px solid rgba(0,0,50,0.3);
//   border-radius: 10px;
//   outline: none;
//   background: rgba(255,255,255,0.8);
// `;

// const SearchButton = styled.button`
//   padding: 12px 20px;
//   font-size: 1rem;
//   background: rgba(0,0,50,0.5);
//   color: #fff;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   display:flex;
//   align-items:center;
//   gap:5px;
//   transition: 0.3s;

//   &:hover {
//     background: rgba(0,0,50,0.7);
//   }
// `;

// const ArchiveSection = styled.section`
//   margin-top: 50px;
//   animation: ${fadeIn} 1.2s ease-in-out;
// `;

// const ArchiveGrid = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 25px;
//   justify-content: center;
// `;

// const ArchiveCard = styled.div`
//   flex: 1 1 400px;
//   max-width: 480px;
//   background: rgba(255,255,255,0.7);
//   backdrop-filter: blur(5px);
//   border-radius: 15px;
//   padding: 25px;
//   box-shadow: 0 8px 25px rgba(0,0,50,0.15);
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   transition: transform 0.3s, box-shadow 0.3s;

//   &:hover {
//     transform: translateY(-5px) scale(1.02);
//     box-shadow: 0 15px 35px rgba(0,0,50,0.2);
//   }
// `;

// const CardHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 15px;
//   width: 100%;
//   margin-bottom: 15px;
// `;

// const CardTitle = styled.h3`
//   font-size: 1.1rem;
//   color: rgba(0, 0, 50, 0.7);
//   font-weight: 600;
//   flex:1;
// `;

// const CardText = styled.p`
//   font-size: 0.85rem;
//   color: rgba(0, 0, 50, 0.5);
//   margin-bottom: 10px;
// `;

// const CardActions = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   gap: 12px;
//   margin-top: auto;
// `;

// const CardButton = styled.a`
//   background: rgba(0,0,50,0.5);
//   color: white;
//   padding: 7px 14px;
//   border-radius: 8px;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   font-size:0.85rem;
//   cursor:pointer;
//   transition: 0.3s;

//   &:hover {
//     background: rgba(0,0,50,0.7);
//   }
// `;

// const Div1 = styled.div`
//   display:flex;
//   flex-wrap:wrap;
// `;

// const Div2 = styled.div`
//   width: 25%;
//   @media(max-width:768px){ display:none; }
// `;

// const Div3 = styled.div`
//   width: 75%;
//   @media(max-width:768px){ width:100%; }
// `;

// const Img = styled.img`
//   width:45px;
//   height:45px;
//   border-radius:50%;
//   object-fit:cover;
// `;

// const TitleWrap = styled.div`
//   display:flex;
//   align-items:center;
//   gap:10px;
//   flex-wrap:wrap;
// `;

// const Footer = styled.footer`
//   text-align: center;
//   padding: 30px;
//   margin-top: 50px;
//   background-color: #f4f4f4;
//   color: rgba(0,0,50,0.7);
// `;

// const ArchivesPage = () => {
//   const [typedText, setTypedText] = useState(""); 
//   const fullText = "Browse past and current issues of our world-class journal across all categories.";
//   const [publications, setPublications] = useState([]);
//   const [titleShow, setTitleShow] = useState(false);
//   const {articleCategory}=useParams();
//   const {categories }=useContext(Context)
//   const navigate = useNavigate();
//   const [authors, setAuthors] = useState([]);
//   const [searchTerm, setSearchTerm]=useState('')

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       if (index < fullText.length) {
//         setTypedText(fullText.substring(0, index + 1));
//         index++;
//       } else clearInterval(interval);
//     }, 80);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchPublications = async () => {
//     // const loadingAlert = Swal.fire({  });
//     Swal.showLoading();
//     try {
//       const response = await axios.get(
//         `https://www.fuprecosjournals.org/api/get_publications_by_category.php?article_category=${articleCategory}`
//       );
//       if (response.data.success) {
//         const rawPublications = response.data.publications;
//         const groupedByYear = {};
//         rawPublications.forEach(pub => {
//           const year = new Date(pub.created_at).getFullYear();
//           if (!groupedByYear[year]) groupedByYear[year] = [];
//           groupedByYear[year].push(pub);
//         });
//         const sortedYears = Object.keys(groupedByYear).sort();
//         const baseVolume = 3;
//         const yearToVolume = {};
//         sortedYears.forEach((year, index) => { yearToVolume[year] = baseVolume + index; });
//         const processed = [];
//         sortedYears.forEach(year => {
//           const pubs = groupedByYear[year].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
//           pubs.forEach((pub, i) => {
//             processed.push({ ...pub, volume: yearToVolume[year], issue: i + 1 });
//           });
//         });
//         setPublications(processed);
//       } else Swal.fire({ text: 'Failed to fetch publications.' });
//     } catch (error) { Swal.fire({ text: 'Error fetching publications.' }); console.error(error); }
//     finally { 
//       // loadingAlert.close();

//      }    
//   };

//   useEffect(() => { fetchPublications(); }, [articleCategory]);

//   const getCategoryName = (categoryId) => {
//     const category = categories.find((cat) => cat.id == categoryId);
//     return category ? category.name : categoryId;
//   };

//   const fetchAuthors = async () => {
//     try {
//       const response = await axios.get('https://www.fuprecosjournals.org/api/get_all_authors.php');
//       if (response.data.success) setAuthors(response.data.authors);
//     } catch (error) { console.error('Error fetching authors:', error); }
//   };
//   useEffect(() => { fetchAuthors(); }, []);

//   const getAuthorName = (authorId) => {
//     const author = authors.find((auth) => auth.id === authorId);
//     return author ? author.full_name : "Unknown Author";
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const loadingAlert = Swal.fire({text:"Please wait..."});
//     Swal.showLoading();
//     try {
//       const response = await fetch(
//         `https://www.fuprecosjournals.org/api/search_publications_by_title.php?search=${searchTerm}`, { cache: "no-store" }
//       );
//       const data = await response.json();
//       if (data.success) { setPublications(data.manuscripts); setTitleShow(true); }
//     } catch (error) { console.error("Error searching manuscripts:", error); }
//     finally { loadingAlert.close(); }
//   };

//   return (
//     <>
//       <Hero4 />
//       <Div1>
//         <Div2><Sidebar/></Div2>
//         <Div3>
//           <Container>
//             <Header><TypingContainer>{typedText}</TypingContainer></Header>

//             <SearchBarContainer>
//               <SearchInput
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search articles by title"
//               />
//               <SearchButton onClick={handleSearch}><FaSearch size={18} /> Search</SearchButton>
//             </SearchBarContainer>

//             <ArchiveSection>
//               {!titleShow 
//                 ? <h3 style={{color:"rgba(0,0,50,0.5)", textDecoration:"underline"}}>{getCategoryName(articleCategory)}</h3>
//                 : <h3 style={{color:"rgba(0,0,50,0.5)", textDecoration:"underline"}}>Search Result: Found ({publications.length}) items</h3>
//               }
//               {titleShow &&
//                 <p style={{
//                   color:"rgba(0,0,50,0.7)",
//                   marginTop:"10px",
//                   textDecoration:"underline",
//                   cursor:"pointer",
//                   fontWeight:"bold", fontStyle:"italic"
//                 }}
//                   onClick={()=>{setSearchTerm(''); fetchPublications(); setTitleShow(false)}}
//                 >Clear Search</p>
//               }

//               <ArchiveGrid>
//                 {publications.map((publication) => (
//                   <ArchiveCard key={publication.id}>
//                     <CardHeader>
//                       <Img src={logo} alt="logo"/>
//                       <CardTitle>{publication.title.toUpperCase()}</CardTitle>
//                     </CardHeader>
//                     <CardText>
//                       <strong>By:</strong> {getAuthorName(publication.author_id)}
//                     </CardText>
//                     <CardText>
//                       <strong>Year:</strong> {new Date(publication.created_at).getFullYear()} | <strong>Volume {publication.volume}, Issue {publication.issue}</strong>
//                     </CardText>
//                     <CardActions>
//                       <CardButton onClick={()=>navigate(`/publicationdetail/${publication.id}`)}>
//                         <FaNewspaper size={18} /> View Publication
//                       </CardButton>
//                     </CardActions>
//                   </ArchiveCard>
//                 ))}
//               </ArchiveGrid>
//             </ArchiveSection>
//           </Container>
//         </Div3>
//       </Div1>
//       <Footer>© {new Date().getFullYear()} FUPRE Journal of Petroscience</Footer>
//     </>
//   );
// };

// export default ArchivesPage;





import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { FaSearch, FaNewspaper,FaShareAlt } from "react-icons/fa";
import Hero4 from "./Hero4";
import Sidebar from "./SideBar";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "./Context";
import logo from '../Images/logo.jpeg';

// ---------- Typing animation ----------
// const TypingContainer = styled.h2`
//   font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
//   font-weight: 600;
//   letter-spacing: 0.2px;
//   font-size: 1.35rem;
//   color: rgba(8, 12, 32, 0.85);
//   white-space: normal;      /* allow wrapping */
//   overflow-wrap: break-word; /* break long words */
//   word-break: break-word;    /* handle edge cases */
//   border-right: 3px solid rgba(8,12,32,0.2);
//   width: 100%;              /* full width so it can wrap */
//   max-width: 900px;         /* optional: limit max width */
//   margin: 0 auto 26px;
//   animation: blinkCursor 0.8s steps(2, start) infinite;

//   @keyframes blinkCursor { 50% { border-color: transparent; } }
// `;


const TypingContainer = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  max-width: 900px;
  line-height: 1.4;
  margin-bottom: 20px;
  text-align:center;
  padding:5px;

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
    font-size: 1rem;
    border-right: none;
  }
`;



// ---------- Animations ----------
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ---------- Layout ----------
const PageWrap = styled.div`
  font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  min-height: 100vh;
  background: linear-gradient(180deg, #e9f1ff 0%, #f7fbff 60%, #ffffff 100%);
  // padding: 36px 20px 120px;
  color: rgba(8,12,32,0.85);
`;

/* Top area that holds hero + content */
const TopArea = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 920px) {
    flex-direction: column;
    gap: 14px;
  }
`;

/* Sidebar column */
const LeftCol = styled.aside`
  width: 260px;
  @media (max-width: 920px) { width: 100%; }
`;

/* Main content column */
const MainCol = styled.main`
  flex: 1;
`;

/* Floating glass search */
const SearchWrapper = styled.form`
  display:flex;
  // flex-direction:column;
  align-items:center;
  gap:12px;
  margin: 12px 0 22px;
  width: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.55), rgba(245,250,255,0.35));
  border: 1px solid rgba(255,255,255,0.5);
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 24px rgba(20,30,60,0.06);
  padding: 10px;
  border-radius: 14px;
  transition: transform .18s ease;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  &:focus-within { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(20,30,60,0.09); }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 10px;
  font-size: 0.98rem;
  background: transparent;
  color: rgba(8,12,32,0.88);
`;

/* Glassy search button */
const SearchButton = styled.button`
  display:flex;
  align-items:center;
  gap:8px;
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(90deg, rgba(7,55,99,0.95), rgba(4,102,153,0.95));
  color: #fff;
  box-shadow: 0 6px 18px rgba(7,55,99,0.18);
  transition: transform .15s ease, box-shadow .15s ease;

  &:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(7,55,99,0.2); }
`;

/* Archive section */
const ArchiveSection = styled.section`
  margin-top: 18px;
  animation: ${fadeIn} 1s ease both;
  // padding: 0 6px;
`;

/* Title strip */
const SectionTitle = styled.h3`
  text-align: center;
  color: rgba(8,12,32,0.8);
  margin-bottom: 10px;
  text-decoration: underline;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

/* Grid of cards */
const ArchiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 22px;
  margin-top: 18px;
  padding:5px;
`;

/* Glass card */
const ArchiveCard = styled.article`
  background: linear-gradient(180deg, rgba(255,255,255,0.55), rgba(245,250,255,0.45));
  border-radius: 16px;
  padding: 10px;
  border: 1px solid rgba(255,255,255,0.6);
  backdrop-filter: blur(10px) saturate(120%);
  box-shadow: 0 10px 30px rgba(10,20,40,0.06);
  display:flex;
  flex-direction:column;
  gap:10px;
  transition: transform .22s ease, box-shadow .22s ease;
  min-height: 150px;

  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 20px 50px rgba(10,20,40,0.10);
  }
`;

/* header content within card */
const CardHeader = styled.div`
  display:flex;
  align-items:center;
  gap:12px;
`;

const Img = styled.img`
  width:56px;
  height:56px;
  border-radius:12px;
  object-fit:cover;
  box-shadow: 0 6px 16px rgba(10,20,40,0.06);
`;

/* Title area */
const CardTitle = styled.h4`
  margin:0;
  font-size:1rem;
  color: rgba(6,18,40,0.9);
  font-weight:700;
  letter-spacing:0.2px;
`;

/* meta and description */
const CardText = styled.p`
  margin:0;
  font-size:0.9rem;
  color: rgba(6,18,40,0.65);
`;

/* bottom actions */
const CardActions = styled.div`
  margin-top:auto;
  display:flex;
  gap:10px;
  align-items:center;
`;

/* Glass action button (link) */
const CardButton = styled.button`
  display:flex;
  align-items:center;
  gap:8px;
  padding:8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.35);
  background: linear-gradient(90deg, rgba(9,80,140,0.9), rgba(8,120,200,0.9));
  color: #fff;
  cursor: pointer;
  font-size:0.9rem;
  font-weight:600;
  box-shadow: 0 8px 26px rgba(8,80,140,0.12);
  transition: transform .14s ease;
  &:hover { transform: translateY(-3px); }
`;

/* small helper */
const SmallMeta = styled.div`
  display:flex;
  gap:8px;
  font-size:0.83rem;
  color: rgba(6,18,40,0.58);
`;

/* footer */
const Footer = styled.footer`
  text-align:center;
  margin-top: 48px;
  padding: 24px 12px;
  color: rgba(6,18,40,0.6);
`;

/* clear search link style */
const ClearSearch = styled.p`
  color: rgba(6,18,40,0.7);
  margin-top:10px;
  text-decoration: underline;
  cursor:pointer;
  font-weight:600;
  text-align:center;
`;


/* ---------- Component ---------- */
const ArchivesPage = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Browse past and current issues of our world class journal across all categories.";
  const [publications, setPublications] = useState([]);
  const [titleShow, setTitleShow] = useState(false);
  const { articleCategory } = useParams();
  const { categories } = useContext(Context);
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Typing animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  // Fetch publications (grouped and processed into volume/issue)
  const fetchPublications = async () => {
    Swal.showLoading();
    try {
      const response = await axios.get(
        `https://www.fuprecosjournals.org/api/get_publications_by_category.php?article_category=${articleCategory}`
      );
      if (response.data.success) {
        const rawPublications = response.data.publications;
        // group by year
        const groupedByYear = {};
        rawPublications.forEach(pub => {
          const year = new Date(pub.created_at).getFullYear();
          if (!groupedByYear[year]) groupedByYear[year] = [];
          groupedByYear[year].push(pub);
        });
        const sortedYears = Object.keys(groupedByYear).sort();
        const baseVolume = 3;
        const yearToVolume = {};
        sortedYears.forEach((year, idx) => { yearToVolume[year] = baseVolume + idx; });

        const processed = [];
        sortedYears.forEach(year => {
          const pubs = groupedByYear[year].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          pubs.forEach((pub, i) => processed.push({ ...pub, volume: yearToVolume[year], issue: i + 1 }));
        });
        setPublications(processed);
      } else {
        Swal.fire({ text: 'Failed to fetch publications.' });
      }
    } catch (error) {
      Swal.fire({ text: 'Error fetching publications.' });
      console.error(error);
    } finally {
      Swal.close();
    }
  };

  useEffect(() => { fetchPublications(); }, [articleCategory]);

  const getCategoryName = (categoryId) => {
    const category = categories?.find((cat) => cat.id == categoryId);
    return category ? category.name : categoryId;
  };

  // Fetch authors
  const fetchAuthors = async () => {
    try {
      const response = await axios.get('https://www.fuprecosjournals.org/api/get_all_authors.php');
      if (response.data.success) setAuthors(response.data.authors);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };
  useEffect(() => { fetchAuthors(); }, []);

  const getAuthorName = (authorId) => {
    const author = authors.find((auth) => auth.id === authorId);
    return author ? author.full_name : "Unknown Author";
  };

  // Search handler (keeps existing behavior)
  const handleSearch = async (e) => {
    e?.preventDefault();
    const loadingAlert = Swal.fire({ text: "Please wait..." });
    Swal.showLoading();
    try {
      const response = await fetch(
        `https://www.fuprecosjournals.org/api/search_publications_by_title.php?search=${encodeURIComponent(searchTerm)}`, { cache: "no-store" }
      );
      const data = await response.json();
      if (data.success) {
        setPublications(data.manuscripts);
        setTitleShow(true);
      } else {
        Swal.fire({ text: "No results found." });
      }
    } catch (error) {
      console.error("Error searching manuscripts:", error);
      Swal.fire({ text: "Error searching manuscripts." });
    } finally {
      loadingAlert.close();
      Swal.close();
    }
  };

  useEffect(()=>{
    window.scroll(0,0)
  },[])




  const handleShare = async (publication) => {
  const shareData = {
    title: publication.title,
    text: publication.abstract?.slice(0, 150) + "...",
    url: `${window.location.origin}/publicationdetail/${publication.id}`,
  };

  // If browser supports native share
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log("Shared successfully");
    } catch (err) {
      console.log("Share cancelled:", err);
    }
  } else {
    // Fallback for desktop
    navigator.clipboard.writeText(shareData.url);
    alert("Link copied to clipboard!");
  }
};


  return (
    <>
      <Hero4 />
      <PageWrap>
        <TopArea>
          <LeftCol><Sidebar /></LeftCol>

          <MainCol>
            <TypingContainer>{typedText}</TypingContainer>

            <SearchWrapper onSubmit={handleSearch} aria-label="Search publications">
              <FaSearch size={16} style={{ opacity: 0.9 }} />
              <SearchInput
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles by title — e.g. 'Reservoir' "
              />
              <br/>
              <SearchButton type="submit"><FaSearch /></SearchButton>
            </SearchWrapper>

            <ArchiveSection>
              {!titleShow
                ? <SectionTitle>{getCategoryName(articleCategory)}</SectionTitle>
                : <SectionTitle>Search Result: Found ({publications.length}) items</SectionTitle>
              }

              {titleShow &&
                <ClearSearch onClick={() => { setSearchTerm(''); fetchPublications(); setTitleShow(false); }}>
                  Clear Search
                </ClearSearch>
              }

              <ArchiveGrid>
                {publications.map((publication) => (
                  <ArchiveCard key={publication.id} aria-labelledby={`title-${publication.id}`}>
                    <CardHeader>
                      <Img src={logo} alt="journal logo" />
                      <div style={{ flex: 1 }}>
                        <CardTitle id={`title-${publication.id}`}>{publication.title?.toUpperCase()}</CardTitle>
                        <SmallMeta>
                          <span><strong>By:</strong> {getAuthorName(publication.author_id)}</span>
                          <span>•</span>
                          <span>{new Date(publication.created_at).getFullYear()}</span>
                          <span>•</span>
                          {/* <span>Vol {publication.volume}, Issue {publication.issue}</span> */}
                          <span>Vol 1, Issue 1</span>
                        </SmallMeta>
                      </div>
                    </CardHeader>

                    <CardText>
                      {publication.abstract ? (publication.abstract.length > 180 ? publication.abstract.slice(0, 180) + "…" : publication.abstract) : "No abstract available."}
                    </CardText>

                   <CardActions>
  <CardButton onClick={() => navigate(`/publicationdetail/${publication.id}`)}>
    <FaNewspaper /> View Publication
  </CardButton>

  <CardButton onClick={() => handleShare(publication)}>
    <FaShareAlt /> Share
  </CardButton>
</CardActions>
                  </ArchiveCard>
                ))}
              </ArchiveGrid>
            </ArchiveSection>
          </MainCol>
        </TopArea>

        <Footer>© {new Date().getFullYear()} FUPRE Journal of Petroscience</Footer>
      </PageWrap>
    </>
  );
};

export default ArchivesPage;
