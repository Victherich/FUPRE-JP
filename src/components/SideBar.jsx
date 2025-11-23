import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { 
  FaBook, FaFlask, FaHistory, FaNewspaper, FaAngleDown, FaAngleRight,
  FaHeartbeat, FaGraduationCap, FaLeaf, FaRobot, FaBrain, FaSatellite,
  FaTools, FaPalette, FaBalanceScale, FaUsers, FaGavel, FaFutbol,
  FaMusic, FaUtensils, FaGlobe, FaDragon, FaSeedling, FaSkullCrossbones, 
  FaRecycle, FaShieldAlt, FaGlobeAmericas
} from "react-icons/fa";
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";




const SidebarContainer = styled.aside`

  width:100%;
  height: 100%;
  background: #222;
  color: white;
  padding: 20px;

  left: 0;
  top: 0;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
`;

const SidebarTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 2px solid #444;
  padding-bottom: 10px;


  @media(max-width:768px){
  font-size:20px;
}
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #444;
  }

  @media(max-width:768px){
  font-size:14px;
}
`;

const YearSection = styled.div`
  margin-top: 15px;
`;

const YearTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background: #333;
  transition: 0.3s;
  &:hover {
    background: #555;
  }
`;

const IssuesList = styled.ul`
  list-style: none;
  padding-left: 20px;
  margin-top: 5px;
`;

const IssueItem = styled.li`
  font-size: 16px;
  padding: 8px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #444;
    border-radius: 5px;
  }
`;

const Sidebar = () => {
  const [expandedYear, setExpandedYear] = useState(null);
  const {categories, mobileMenuOpen, setMobileMenuOpen}=useContext(Context);
  const navigate = useNavigate()
  const [publications, setPublications]=useState([]);
  const articleCategory=0;

  console.log(publications);


  const years = {
    2025: ["Vol 12, Issue 1", "Vol 12, Issue 2"],
    2024: ["Vol 11, Issue 1", "Vol 11, Issue 2", "Special Edition"],
    2023: ["Vol 10, Issue 1", "Vol 10, Issue 2"],
  };



  
  

 

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
    // const loadingAlert = Swal.fire({ text: "Please wait..." });
    Swal.fire({
  background: "transparent",
  backdrop: "rgba(0,0,0,0.4)", // or "none"
  showConfirmButton: false,
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();
  }
});

  
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
      // loadingAlert.close();
      Swal.close();
    }
  };
  




  // Fetch publications when the component mounts or articleCategory changes
  useEffect(() => {
    fetchPublications();
  }, [articleCategory]);







  return (
    <SidebarContainer>
      <SidebarTitle>Browse Categories</SidebarTitle>

      
      
  
      {/* Categories Section */}
      {categories.map((category, index) => (
        <MenuItem key={index} onClick={()=>{navigate(`/issuesandpubs/${category.id}`); setMobileMenuOpen(false)}}>
          {category.icon} {category.name}
        </MenuItem>
      ))}

      {/* Archive Section */}
      <SidebarTitle style={{ marginTop: "30px" }}>Archives</SidebarTitle>
      {/* {Object.keys(years).map((year) => (
        <YearSection key={year}>
          <YearTitle onClick={() => setExpandedYear(expandedYear === year ? null : year)}>
            {year} {expandedYear === year ? <FaAngleDown /> : <FaAngleRight />}
          </YearTitle>
          {expandedYear === year && (
            <IssuesList>
              {years[year].map((issue, idx) => (
                <IssueItem key={idx}>{issue}</IssueItem>
              ))}
            </IssuesList>
          )}
        </YearSection>
      ))} */}


{publications.map((pub) => (
  <div key={pub.id} className="journal-entry" style={{marginBottom:"10px", cursor:"pointer"}} onClick={()=>navigate(`/publicationdetail/${pub.id}`)}>
    <h3 style={{fontSize:"0.9rem"}}>{pub.title.slice(0,40)}...</h3>
    <p  style={{fontSize:"0.9rem"}} >Volume {pub.volume}, Issue {pub.issue}</p>
    {/* <p>Published: {new Date(pub.created_at).toLocaleDateString()}</p> */}
    {/* <a href={`https://www.fuprecosjournals.org/${pub.file_path}`} target="_blank" rel="noreferrer">Download PDF</a> */}
  </div>
))}

    </SidebarContainer>
  );
};

export default Sidebar;



