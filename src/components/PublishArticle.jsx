



import React, { useContext, useState ,useEffect } from "react";
import styled from "styled-components";
import { FaFileUpload, FaTag, FaFileAlt, FaUserFriends, FaUpload, FaLink } from "react-icons/fa";
import { Context } from './Context';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import CommentComponent from "./CommentComponent";


const SubmissionContainer = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding:bottom:100px;
`;

const FormWrapper = styled.div`
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  text-align: center;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background: #f9f9f9;

  input, select, textarea {
    border: none;
    outline: none;
    width: 100%;
    padding: 5px;
    background: transparent;
  }

  textarea {
    resize: none;
    height: 100px;
  }

  select{
    cursor:pointer;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 10px;
  background: #1DA1F2;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #005A93;
  }
`;

const FileNameDisplay = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #333;
`;

const SubmitButton = styled.button`
  background: #0077B5;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #005A93;
  }
`;





// more styling


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
  margin-left: 5px;

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
  margin-left: 5px;

  &:hover {
    background: rgba(0,0,255,0.7);
  }
`;


const Select = styled.select`
  padding:5px;
  cursor:pointer;
  outline:none;
`


const PublishArticle = ({setActivePage}) => {
  const { categories, status } = useContext(Context);
  const editorInfo = useSelector(state=>state.editorInfo)
  const authorId = useSelector(state=>state.authorInfo?.id)
   const [manuscripts, setManuscripts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchTerm2, setSearchTerm2] = useState("");
  const [formData, setFormData] = useState({
    author_id:'',
    doiLink:'',
    lastRevisedArticleCode: "",
    title: "",
    abstract: "",
    keywords: "",
    coAuthors: "",
    articleCategory: "Research Article", // Updated field name
    manuscriptFile: null,
    articleCode: generateArticleCode(), // Generate 9-digit article code
  });

  console.log(formData)

  const [fileName, setFileName] = useState("");

  function generateArticleCode() {
    return Math.floor(100000000 + Math.random() * 900000000).toString(); // Generate a 9-digit code
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, manuscriptFile: file });

    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.manuscriptFile) {
      Swal.fire({text:"Please select a manuscript file."});
      return;
    }

    const loadingAlert=Swal.fire({text:"Please wait..."})
    Swal.showLoading();

    const formDataToSend = new FormData();
    formDataToSend.append("doiLink", formData.doiLink);
    formDataToSend.append("lastRevisedArticleCode", formData.lastRevisedArticleCode);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("abstract", formData.abstract);
    formDataToSend.append("keywords", formData.keywords);
    formDataToSend.append("coAuthors", formData.coAuthors);
    formDataToSend.append("articleCategory", formData.articleCategory); // Updated field
    formDataToSend.append("articleCode", formData.articleCode);
    formDataToSend.append("author_id", formData.author_id); 
    formDataToSend.append("manuscriptFile", formData.manuscriptFile);
    formDataToSend.append("editor_id", editorInfo.id);

    try {
      const response = await fetch("https://www.fuprecosjournals.org/api/publish_article.php", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      Swal.fire({text:result.message,icon:"success"});

      if (result.success) {
        setFormData({
            author_id:"",
         doiLink:"",
          lastRevisedArticleCode:"",
          title: "",
          abstract: "",
          keywords: "",
          coAuthors: "",
          articleCategory: "",
          manuscriptFile: null,
          articleCode: generateArticleCode(),
        });
        setFileName("");
        setActivePage('profile')

      }
    } catch (error) {
      Swal.fire({text:"Failed to submit manuscript. Please try again."});
    }finally{
      loadingAlert.close();

    }
  };





  const handleSearch2 = async (e) => {
    e.preventDefault();
    if(searchTerm2.length!==9){
        Swal.fire({text:"Please enter complete Article code "})
        return 
    }

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
        setFormData({...formData, lastRevisedArticleCode:searchTerm2, author_id:data.manuscripts[0].author_id})
        

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

  


// ALL MIXTURE OF USED AND UNUSED CODES EEEEEEEEEEE3333################################################################################


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






  return (
    <SubmissionContainer>
        <h2 style={{color:"#0077B5"}}>Publish Article</h2>
        <p>Enter the <strong>Article code</strong> of the last Revision of the manuscript for the article you wish to publish and then proceed.</p>
        <form onSubmit={handleSearch2} style={{ textAlign: "center", marginBottom: "20px", marginTop:"20px" }}>
  <input
    type="text"
    placeholder="Enter Article code"
    value={searchTerm2}
    // name="lastRevisedArticleCode"
    onChange={(e) => {setSearchTerm2(e.target.value)}}
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
    Get Manuscript
  </button>
</form>

{manuscripts.length === 0 ? (
        <p>No manuscripts found.</p>
      ) : (manuscripts.map((manuscript) => (
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
               
              </tbody>
            </Table>

            {/* {manuscript.comment&&<CommentComponent manuscriptId={manuscript.id} handleCloseComments={handleCloseComments}/>} */}

          </TableContainer>
        )))}


      {manuscripts.length>0&&<FormWrapper>
        
        <form onSubmit={handleSubmit}>
       
          <InputField>
            <FaFileAlt />
            <input type="text" name="title" placeholder="Title" required onChange={handleChange} />
          </InputField>

          <InputField>
            <textarea name="abstract" placeholder="Abstract" required onChange={handleChange}></textarea>
          </InputField>

          <InputField>
            <FaTag />
            <input type="text" name="keywords" placeholder="Keywords (comma-separated)" required onChange={handleChange} />
          </InputField>

          <InputField>
            <FaUserFriends />
            <input type="text" name="coAuthors" placeholder="Co-Authors (if any)" onChange={handleChange} />
          </InputField>

          <InputField>
            <select name="articleCategory" required onChange={handleChange}>
              <option value="Research Article">-- Select Article Category --</option>
              {categories.slice(1).map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </InputField>

          <InputField>
            <FaLink />
            <input type="text" name="doiLink" placeholder="DOI Link (optional)" onChange={handleChange} />
          </InputField>

          <InputField>
            <FaFileAlt />
            Article Code:
            <input type="text" name="articleCode" value={formData.articleCode} readOnly />
          </InputField>



          <FileInput id="file" type="file" accept=".pdf" required onChange={handleFileChange} />
          <FileLabel htmlFor="file">
            <FaUpload /> Upload File (pdf)
          </FileLabel>

          {fileName && <FileNameDisplay>Selected File: {fileName}</FileNameDisplay>}

          <SubmitButton type="submit">Submit</SubmitButton>
        </form>
      </FormWrapper>}
    </SubmissionContainer>
  );
};

export default PublishArticle;




