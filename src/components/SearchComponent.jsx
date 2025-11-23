
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ManuscriptDetailModal from "./ManuscriptDetailModal"; 
import Swal from "sweetalert2";
import { Context } from "./Context";
import CommentComponent from "./CommentComponent";
import { useLocation } from "react-router-dom";
import axios from 'axios'
import FilterAndSearchComponent from "./FilterAndSearchComponent";

const Container = styled.div`
  padding: 20px;
  background: #f4f4f4;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #0077B5;
`;

const TableContainer = styled.div`
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  overflow-x:scroll;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TdLabel = styled.td`
  font-weight: bold;
  background: #f1f1f1;
  padding: 10px;
  width: 30%;
`;

const TdValue = styled.td`
  padding: 10px;
`;


const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  background: ${(props) => {
    switch (props.status) {
      case "1": // submitted
        return "orange";
      case "2": // assigned for review
        return "blue";
      case "3": // under review
        return "purple";
      case "4": // reviewed
        return "gold";
      case "5": // accepted
        return "green";
      case "6": // published
        return "teal";
      case "7": // rejected
        return "red";
      default:
        return "gray";
    }
  }};
`;

const ViewButton = styled.button`
  background: rgba(0,0,255,0.5);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  margin: 10px;

  &:hover {
    background: rgba(0,0,255,0.7);
  }
`;

const AssignButton = styled.button`
  background: rgba(0,0,255,0.5);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  margin: 10px;

  &:hover {
    background: rgba(0,0,255,0.7);
  }
`;


const Select = styled.select`
  padding:5px;
  cursor:pointer;
  outline:none;
`


const SearchComponent = ({setActivePage}) => {
  const authorId = useSelector((state) => state.authorInfo?.id);
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedManuscript, setSelectedManuscript] = useState(null);
  const { categories, status } = useContext(Context);
  const [reviewers, setReviewers] = useState([]); 
  const [selectedReviewers, setSelectedReviewers] = useState({}); 
const location = useLocation();
// const [reviewers, setReviewers] = useState([]);
const [reviewerData,setReviewerData]=useState(null);
const [statusData, setStatusData]=useState('')
const [searchTerm, setSearchTerm] = useState("");
const [searchTerm2, setSearchTerm2] = useState("");




    const fetchManuscripts = async () => {
      try {
        const response = await fetch(
          `https://www.fuprecosjournals.org/api/get_all_manuscripts.php`,
          { cache: "no-store" }
        );
        const data = await response.json();

        if (data.success) {
          setManuscripts(data.manuscripts);
          console.log(data.manuscripts)
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching manuscripts:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviewers = async () => {
      try {
        const response = await fetch("https://www.fuprecosjournals.org/api/get_reviewers.php");
        const data = await response.json();

        if (data.success) {
          setReviewers(data.reviewers);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching reviewers:", error);
      }
    };



  useEffect(() => {
    // fetchManuscripts();
    fetchReviewers();
  }, [authorId]);

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

  const handleAssign = async (manuscriptId) => {
    const reviewerId = selectedReviewers[manuscriptId];
    if (!reviewerId) {
      Swal.fire("Error!", "Please select a reviewer.", "error");
      return;
    }

    try {
      const response = await fetch("https://www.fuprecosjournals.org/api/assign_manuscript_to_reviewer.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manuscript_id: manuscriptId, reviewer_id: reviewerId }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire("Success!", "Reviewer assigned successfully.", "success");
        // fetchManuscripts();
        // setReviewers([]);
        // handleGetManuscriptById(manuscriptId)
        setActivePage('profile')
      } else {
        Swal.fire("Error!", data.error || "Failed to assign reviewer.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Network issue or server error.", "error");
      console.error("Error assigning reviewer:", error);
    }
  };



  const handleUnassign = async (manuscriptId) => {
    try {
      const response = await fetch("https://www.fuprecosjournals.org/api/unassign_manuscript_from_reviewer.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ manuscript_id: manuscriptId }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        Swal.fire("Success!", "Reviewer unassigned successfully.", "success");
        // Optionally refresh the list or update state
        // fetchManuscripts();
        // fetchReviewers();
        // handleGetManuscriptById(manuscriptId)
        setActivePage('profile')
      } else {
        Swal.fire("Error!", data.error || "Failed to unassign reviewer.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Network issue or server error.", "error");
      console.error("Error unassigning reviewer:", error);
    }
  };
  



  const handleOpenComments = (manuscriptId) => {
    if (manuscriptId) {
      const updatedManuscripts = manuscripts.map((e) => 
        e.id === manuscriptId ? { ...e, comment: true } : e
      );
  
      setManuscripts(updatedManuscripts); // Assuming you're using useState
    }
  };

  const handleCloseComments = (manuscriptId) => {
    if (manuscriptId) {
      const updatedManuscripts = manuscripts.map((e) => 
        e.id === manuscriptId ? { ...e, comment: false } : e
      );
  
      setManuscripts(updatedManuscripts); // Assuming you're using useState
    }
  };

  




  
    useEffect(() => {
      const fetchReviewers = async () => {
        try {
          const response = await fetch('https://www.fuprecosjournals.org/api/get_all_reviewers.php');
          const data = await response.json();
  
          if (data.success) {
            setReviewers(data.reviewers);
            // console.log(data)
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



    const [reviewerEmails, setReviewerEmails] = useState({});

    const fetchReviewerData = async (id) => {
      console.log(id)
      try {
        const response = await axios.get(`https://www.fuprecosjournals.org/api/get_reviewer_by_id.php?id=${id}`);
    console.log(response.data)
        if (response.data.success) {
          setReviewerEmails(prev => ({
            ...prev,
            [id]: response.data.reviewer.email
          }));
        } else {
          setReviewerEmails(prev => ({
            ...prev,
            [id]: "No reviewer assigned"
          }));
        }
      } catch (err) {
        console.error("Failed to fetch reviewer details:", err);
        setReviewerEmails(prev => ({
          ...prev,
          [id]: "Error fetching email"
        }));
      }
    };
    

    useEffect(() => {
      manuscripts.forEach((manuscript) => {
        if (manuscript.reviewer_id && !reviewerEmails[manuscript.reviewer_id]) {
          fetchReviewerData(manuscript.reviewer_id);
        }
      });
    }, [manuscripts]);




    
  const handleUpdateStatus = async (manuscriptId) => {
    const loadingAlert = Swal.fire({text:"please wait..."})
    Swal.showLoading();

    try {
      const response = await axios.post('https://www.fuprecosjournals.org/api/update_manuscript_status.php', {
        manuscript_id: manuscriptId,
        status: statusData
      });
      
      if (response.data.success) {
        Swal.fire("Success!", "Status updated successfully.", "success");
        // fetchManuscripts();
        // handleGetManuscriptById(manuscriptId)
        setActivePage('profile')
      } else {
        Swal.fire("Error!", response.data.error || "Failed to update status.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Network issue or server error.", "error");
      console.error("Error updating status:", error);

    }finally{
      loadingAlert.close();
    }
  };
  
const [filteredArray, setFilteredArray]=useState([])
const [statusId,setStatusId]=useState('')

useEffect(() => {
  const filterByStatus = () => {
    if (statusId) {
      const filteredArray2 = manuscripts.filter((e) => e.status == statusId);
      setFilteredArray(filteredArray2);
    } else {
      setFilteredArray(manuscripts); // Show all manuscripts when no filter is applied
    }
  };

  filterByStatus();
}, [statusId, manuscripts]); 

   

// get manuscript by id
const handleGetManuscriptById = async (manuscriptId) => {
 

    try {
      const response = await axios.get(`https://www.fuprecosjournals.org/api/get_manuscript_by_id.php?id=${manuscriptId}`);
      
      if (response.data.success) {
        setManuscripts(response.data.manuscript);
      } else {
        Swal.fire({text:response.data.error || 'Failed to fetch manuscript'});
        setManuscripts(null); // Clear previous data
      }
    } catch (err) {
      console.error('Error fetching manuscript:', err);
      Swal.fire({text:'Network issue or server error.'});
      setManuscripts(null); // Clear previous data
    }
  };



const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingAlert = Swal.fire({text:"Please wait..."})
    Swal.showLoading();
    
    try {
      const response = await fetch(
        `https://www.fuprecosjournals.org/api/search_manuscripts_by_title.php?search=${searchTerm}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      if (data.success) {
        setManuscripts(data.manuscripts);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error searching manuscripts:", error);
    } finally {
      setLoading(false);
      loadingAlert.close();
    }
  };
  
  
  const handleSearch2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingAlert = Swal.fire({text:"Please wait..."})
    Swal.showLoading();
    
    try {
      const response = await fetch(
        `https://www.fuprecosjournals.org/api/search_manuscripts_by_article_code.php?search=${searchTerm2}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      if (data.success) {
        setManuscripts(data.manuscripts);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error searching manuscripts:", error);
    } finally {
      setLoading(false);
      loadingAlert.close();
    }
  };



//   if (loading) {
//     return (
//       <Container>
//         <Title>Loading...</Title>
//       </Container>
//     );
//   }





  return (
    <Container>
      <Title> Search Submitted Manuscripts</Title>
      <form onSubmit={handleSearch} style={{ textAlign: "center", marginBottom: "20px" }}>
  <input
    type="text"
    placeholder="Search manuscripts by title"
    value={searchTerm}
    onChange={(e) => {setSearchTerm(e.target.value);setSearchTerm2('')}}
    style={{ padding: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc", outline:"none" }}
  />
  <button
    type="submit"
    style={{
      padding: "10px 15px",
      margin: "10px",
      background: "#0077B5",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Search
  </button>
</form>

<form onSubmit={handleSearch2} style={{ textAlign: "center", marginBottom: "20px" }}>
  <input
    type="text"
    placeholder="Search by Article code"
    value={searchTerm2}
    onChange={(e) => {setSearchTerm2(e.target.value);setSearchTerm('')}}
    style={{ padding: "10px", width: "300px", borderRadius: "5px", border: "1px solid #ccc", outline:"none" }}
  />
  <button
    type="submit"
    style={{
      padding: "10px 15px",
      margin: "10px",
      background: "#0077B5",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Search
  </button>
</form>


      {/* <Select style={{marginBottom:"10px"}} onChange={(e)=>setStatusId(e.target.value)}>
        <option value="">-- Filter by status --</option>
        {status.map((stat)=>(
            <option value={stat.id} key={stat.id}>{stat.name.toUpperCase()}</option>
        ))}
      </Select>
      {statusId!==""&&<button style={{cursor:"pointer",
         marginLeft:"5px",
         backgroundColor:"red", 
         border:"none",color:"white", padding:"5px", borderRadius:"5px"}} onClick={()=>setStatusId("")}>Cancel filter</button>}
       */}


      {manuscripts.length === 0 ? (
        <p>No manuscripts found.</p>
      ) : (

        manuscripts.map((manuscript) => (
          <TableContainer key={manuscript.id}>
            <Table>
              <tbody>
              <tr>
                  <TdLabel>Submission Type:</TdLabel>
                  <TdValue>{manuscript.submission_type}</TdValue>
                </tr>
              {manuscript.original_article_code&&<tr>
                  <TdLabel>Original Article Code:</TdLabel>
                  <TdValue>{manuscript.original_article_code}</TdValue>
                </tr>}
                <tr>
                  <TdLabel>Title:</TdLabel>
                  <TdValue>{manuscript.title}</TdValue>
                </tr>
                <tr>
                  <TdLabel>Article Code:</TdLabel>
                  <TdValue>{manuscript.article_code}</TdValue>
                </tr>
                <tr>
                  <TdLabel>Category:</TdLabel>
                  <TdValue>{getCategoryName(manuscript.article_category)}</TdValue>
                </tr>
            
                <tr>
                  <TdLabel>Status:</TdLabel>
                  <TdValue>
                    <StatusBadge status={manuscript.status}>
                    {getStatusName(manuscript.status)?.toUpperCase()}
                    </StatusBadge>
                  </TdValue>
                </tr>
                <tr>
                  <TdLabel>Submitted Date:</TdLabel>
                  <TdValue>{manuscript.submittedDate}</TdValue>
                </tr>
                {/* <tr>
                  <TdLabel>Last Updated:</TdLabel>
                  <TdValue>{manuscript.lastUpdated}</TdValue>
                </tr> */}
                <tr>
                  <TdLabel>Action:</TdLabel>
                  <TdValue>
                    <ViewButton onClick={() => setSelectedManuscript(manuscript)}>
                      View Details
                    </ViewButton>
                   {manuscript.reviewer_id===null&& <select style={{padding:"7px",cursor:"pointer",marginLeft:"5px",outline:"none"}}
                      value={selectedReviewers[manuscript.id] || ""}
                      onChange={(e) =>
                        setSelectedReviewers((prev) => ({
                          ...prev,
                          [manuscript.id]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select Reviewer</option>
                      {reviewers.map((reviewer) => (
                        <option key={reviewer.id} value={reviewer.id}>
                          {reviewer.email}
                        </option>
                      ))}
                    </select>}
                    {manuscript.reviewer_id===null&&<AssignButton onClick={() => handleAssign(manuscript.id)}>
                      Assign
                    </AssignButton>}
                    {manuscript.reviewer_id!==null&&<AssignButton onClick={() => handleUnassign(manuscript.id)}>
                      UnAssign
                    </AssignButton>}
                    <ViewButton onClick={() => handleOpenComments(manuscript.id)}>
                      Comments
                    </ViewButton>
                   <p
  style={{
    color: "rgba(0, 0, 255, 0.7)",
    fontWeight: "bold",
    marginTop: "10px",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "normal",
  }}
>
  Assigned to: {reviewerEmails[manuscript.reviewer_id] || "none"}
</p>

                      <p>Update status:</p>
                    <Select onChange={(e)=>setStatusData(e.target.value)}>
                      <option>-- Select Status --</option>
                      {status.map((stat)=>(
                        <option value={stat.id} key={stat.id}>{stat.name}</option>
                      ))}
                    </Select>

                    <ViewButton onClick={()=>handleUpdateStatus(manuscript.id)}>
                      Update Status
                    </ViewButton>
                  </TdValue>
                </tr>
              </tbody>
            </Table>

            {manuscript.comment&&<CommentComponent manuscriptId={manuscript.id} handleCloseComments={handleCloseComments}/>}

          </TableContainer>
        ))
      )}

      {selectedManuscript && (
        <ManuscriptDetailModal
          manuscript={selectedManuscript}
          onClose={() => setSelectedManuscript(null)}
        />
      )}
    </Container>
  );
};

export default SearchComponent;
