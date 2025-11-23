


import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ManuscriptDetailModal from "./ManuscriptDetailModal"; // Import the modal component
import Swal from "sweetalert2";
import PayManuscriptAPC from "./PayManuscriptAPC";
import { Context } from "./Context";
import CommentComponent from "./CommentComponent";
import PayManuscriptAPCFlutterwave from "./PayManuscriptAPCFlutterwave";


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
  background: #0077B5;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  margin-bottom:10px;
  &:hover {
    background: #005A93;
  }
`;



const AuthorManuscripts = ({ setActivePage }) => {
  const authorId = useSelector((state) => state.authorInfo.id);
  const author = useSelector((state) => state.authorInfo);
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedManuscript, setSelectedManuscript] = useState(null); // State for modal
  const { categories, status } = useContext(Context);

  useEffect(() => {
    const fetchManuscripts = async () => {
      try {
        const response = await fetch(
          `https://www.fuprecosjournals.org/api/get_manuscripts_by_author.php?author_id=${authorId}`,
          { cache: "no-store" } // Prevent caching
        );
        const data = await response.json();

        if (data.success) {
          setManuscripts(data.manuscripts);
          console.log(data.manuscripts);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching manuscripts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchManuscripts();
  }, [authorId]);

  // Function to get category name from categories array
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id == categoryId);
    console.log(category)
    return category ? category.name : categoryId; // Show name if found, otherwise show ID
  };


   // Function to get status name from status array
   const getStatusName = (statusId) => {
    const statusobj = status.find((stat) => stat.id == statusId);
    console.log(statusobj)
    return statusobj ? statusobj.name : statusId; // Show name if found, otherwise show ID
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



  
  const deleteManuscript = async (manuscriptId) => {
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
            text: "Please wait while the manuscript is being deleted.",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
  
          const response = await fetch("https://www.fuprecosjournals.org/api/delete_manuscript.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ manuscript_id: manuscriptId }),
          });
  
          const data = await response.json();
  
          if (data.success) {
            Swal.fire("Deleted!", "Manuscript has been deleted.", "success");
            setManuscripts((prev) => prev.filter((m) => m.id !== manuscriptId));
          } else {
            Swal.fire("Error!", data.error || "Failed to delete manuscript.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Network issue or server error.", "error");
          console.error("Error deleting manuscript:", error);
        }
      }
    });
  };

  





  if (loading) {
    return (
      <Container>
        <Title>Loading...</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Your Submitted Manuscripts</Title>
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
                    <ViewButton
                      onClick={() => setSelectedManuscript(manuscript)}
                    >
                      View Details
                    </ViewButton>
                    {manuscript.APC === "unpaid" &&
      
                      <ViewButton
                        onClick={() => deleteManuscript(manuscript.id)}
                        style={{ marginLeft: "5px", backgroundColor: "red" }}
                      >
                        Delete
                      </ViewButton>
                    }

                    {manuscript.APC === "unpaid" &&manuscript.status==="5"&&  (
                      <PayManuscriptAPC
                        manuscriptId={manuscript.id}
                        amount={50000} // Set the APC amount
                        authorEmail={author.email}
                        setActivePage={setActivePage}
                      />
                    )}

{manuscript.APC === "unpaid" &&manuscript.status==="5"&&  (
                      <PayManuscriptAPCFlutterwave
                        manuscriptId={manuscript.id}
                        amount={60} // Set the APC amount
                        authorEmail={author.email}
                        setActivePage={setActivePage}
                      />
                    )}
                   


<ViewButton onClick={() => handleOpenComments(manuscript.id)} style={{marginLeft:"5px"}}>
                      Comments
                    </ViewButton>

                    {manuscript.APC === "paid" && (
                      <p
                        style={{
                          color: "green",
                          fontWeight: "bold",
                          marginTop: "10px",
                        }}
                      >
                        APC PAID ✅
                      </p>
                    )}



                    
                  </TdValue>
                </tr>
              </tbody>
            </Table>
            {manuscript.comment&&<CommentComponent manuscriptId={manuscript.id} handleCloseComments={handleCloseComments}/>}
          </TableContainer>
        ))
      )}

      {/* Render the modal when a manuscript is selected */}
      {selectedManuscript && (
        <ManuscriptDetailModal
          manuscript={selectedManuscript}
          onClose={() => setSelectedManuscript(null)}
        />
      )}
    </Container>
  );
};

export default AuthorManuscripts;



