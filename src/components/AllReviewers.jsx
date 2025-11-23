// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import Swal from 'sweetalert2';
// import axios from 'axios';


// const ReviewersContainer = styled.div`
//   padding: 50px;
//   background: #f4f4f9;
//   min-height: 100vh;
// `;

// const ReviewerCard = styled.div`
//   background: white;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   border-radius: 8px;
//   padding: 20px;
//   margin: 10px 0;
//   transition: transform 0.2s;

//   &:hover {
//     transform: scale(1.02);
//   }
// `;

// const ReviewerName = styled.h3`
//   color: rgba(0, 0, 255, 0.7);
// `;

// const ReviewerDetails = styled.p`
//   color: #333;
// `;

// const AllReviewers = () => {
//   const [reviewers, setReviewers] = useState([]);

//   useEffect(() => {
//     const fetchReviewers = async () => {
//       try {
//         const response = await fetch('https://www.fuprecosjournals.org/api/get_all_reviewers.php');
//         const data = await response.json();

//         if (data.success) {
//           setReviewers(data.reviewers);
//           console.log(data)
//         } else {
//           Swal.fire({
//             icon: 'error',
//             title: 'Failed to Load',
//             text: 'Unable to fetch reviewers.',
//           });
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Network Error',
//           text: 'Please check your connection.',
//         });
//       }
//     };

//     fetchReviewers();
//   }, []);



//   const [manuscripts, setManuscripts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

  
//   useEffect(()=>{
//     fetchManuscriptsByReviewer(1)
//   },[])
  
//   const fetchManuscriptsByReviewer = async (reviewerId) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`https://www.fuprecosjournals.org/api/get_manuscripts_assigned_to_reviewer.php?reviewer_id=${reviewerId}`);
      
//       if (response.data.success) {
//         setManuscripts(response.data.manuscripts);
//       } else {
//         setError(response.data.error || 'Failed to load manuscripts.');
//       }
//     } catch (err) {
//       setError('Network error or server issue.');
//       console.error("Error fetching manuscripts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
  



//   return (
//     <ReviewersContainer>
//       <h2 style={{ color: "rgba(0, 0, 255, 0.7)" }}>Reviewers List</h2>
//       {reviewers.map((reviewer) => (
//         <ReviewerCard key={reviewer.id}>
    
// <ReviewerDetails><strong>Email:</strong> {reviewer.email}</ReviewerDetails>
// <ReviewerDetails><strong>Full Name:</strong> {reviewer.full_name}</ReviewerDetails>
// <ReviewerDetails><strong>Phone:</strong> {reviewer.phone_code} {reviewer.phone_number}</ReviewerDetails>
// <ReviewerDetails><strong>Affiliation:</strong> {reviewer.affiliation}</ReviewerDetails>
// <ReviewerDetails><strong>ORCID:</strong> {reviewer.orcid || 'N/A'}</ReviewerDetails>
// <ReviewerDetails><strong>Joined:</strong> {new Date(reviewer.created_at).toLocaleDateString()}</ReviewerDetails>

//         </ReviewerCard>
//       ))}
//     </ReviewersContainer>
//   );
// };

// export default AllReviewers;




import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from './Context';

// Styled Components
const ReviewersContainer = styled.div`
  padding: 50px;
  background: #f4f4f9;
  min-height: 100vh;
`;

const ReviewerCard = styled.div`
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin: 30px 0;
  transition: transform 0.2s;

  &:hover {
    // transform: scale(1.02);
  }


  button{
  background-color:rgba(0,0,255,0.5);
  padding:5px;
  cursor:pointer;
  border: none;
  color:white;
  border-radius:5px;
  margin-top:5px;
  &:hover{
    background-color:rgba(0,0,255,0.7);
  }
  }
`;

const ReviewerDetails = styled.p`
  color: #333;
`;

const ManuscriptList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ManuscriptItem = styled.li`
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

// Main Component
const AllReviewers = () => {
  const [reviewers, setReviewers] = useState([]);
  const [manuscriptsByReviewer, setManuscriptsByReviewer] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});
   const { categories, status } = useContext(Context);

  // Fetch all reviewers on component mount
  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const response = await fetch('https://www.fuprecosjournals.org/api/get_all_reviewers.php');
        const data = await response.json();

        if (data.success) {
          setReviewers(data.reviewers);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Load',
            text: 'Unable to fetch reviewers.',
          });
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Network Error',
          text: 'Please check your connection.',
        });
      }
    };

    fetchReviewers();
  }, []);

  // Function to fetch manuscripts assigned to a reviewer
  const fetchManuscriptsByReviewer = async (reviewerId) => {
    try {
      setLoading((prevState) => ({ ...prevState, [reviewerId]: true }));
      setError((prevState) => ({ ...prevState, [reviewerId]: '' }));
      
      const response = await axios.get(
        `https://www.fuprecosjournals.org/api/get_manuscripts_assigned_to_all_reviewers.php?reviewer_id=${reviewerId}`
      );

      if (response.data.success) {
        setManuscriptsByReviewer((prevState) => ({
          ...prevState,
          [reviewerId]: response.data.manuscripts,
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          [reviewerId]: response.data.error || 'Failed to load manuscripts.',
        }));
      }
    } catch (err) {
      setError((prevState) => ({
        ...prevState,
        [reviewerId]: 'Network error or server issue.',
      }));
      console.error("Error fetching manuscripts:", err);
    } finally {
      setLoading((prevState) => ({ ...prevState, [reviewerId]: false }));
    }
  };


  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id == categoryId);
    return category ? category.name : categoryId;
  };
  
  
   // Function to get status name from status array
   const getStatusName = (statusId) => {
    const statusobj = status.find((stat) => stat.id == statusId);
    console.log(statusobj)
    return statusobj ? statusobj.name : statusId; // Show name if found, otherwise show ID
  };



  return (
    <ReviewersContainer>
      <h2 style={{ color: "rgba(0, 0, 255, 0.7)" }}>Reviewers List</h2>
      {reviewers.map((reviewer) => (
        <ReviewerCard key={reviewer.id}>
          <ReviewerDetails><strong>Email:</strong> {reviewer.email}</ReviewerDetails>
          <ReviewerDetails><strong>Full Name:</strong> {reviewer.full_name}</ReviewerDetails>
          <ReviewerDetails><strong>Phone:</strong> {reviewer.phone_code} {reviewer.phone_number}</ReviewerDetails>
          <ReviewerDetails><strong>Affiliation:</strong> {reviewer.affiliation}</ReviewerDetails>
          <ReviewerDetails><strong>ORCID:</strong> {reviewer.orcid || 'N/A'}</ReviewerDetails>
          <ReviewerDetails><strong>Joined:</strong> {new Date(reviewer.created_at).toLocaleDateString()}</ReviewerDetails>

          {/* Fetch Manuscripts Button */}
          <button onClick={() => fetchManuscriptsByReviewer(reviewer.id)}>
            Assigned Manuscripts
          </button>
          <br/>
          

          {/* Loading State */}
          {loading[reviewer.id] && <p>Loading manuscripts...</p>}

          {/* Error State */}
          {error[reviewer.id] && <p style={{ color: 'red' }}>{error[reviewer.id]}</p>}

          {/* Manuscripts List */}
          {manuscriptsByReviewer[reviewer.id] && (
            <ManuscriptList>
                <button onClick={() => setManuscriptsByReviewer({})} style={{backgroundColor:"gray"}}>
            Close
          </button>
              {manuscriptsByReviewer[reviewer.id].length > 0 ? (
                manuscriptsByReviewer[reviewer.id].map((manuscript) => (
                  <ManuscriptItem key={manuscript.id}>
                    <strong>Title:</strong> {manuscript.title} <br />
                    <strong>Article Code:</strong> {manuscript.article_code} <br />
                    <strong>Category:</strong> {getCategoryName(manuscript.article_category)} <br />
                    <strong>Status:</strong> {getStatusName(manuscript.status)?.toUpperCase()} <br />
                    <strong>Submitted:</strong> {new Date(manuscript.submittedDate).toLocaleDateString()} <br />
                  </ManuscriptItem>
                ))
              ) : (
                <p>No manuscripts assigned.</p>
              )}
            </ManuscriptList>
          )}
        </ReviewerCard>
      ))}
    </ReviewersContainer>
  );
};

export default AllReviewers;

