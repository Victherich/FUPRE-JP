



import React, { useContext, useState ,useEffect } from "react";
import styled from "styled-components";
import { FaFileUpload, FaTag, FaFileAlt, FaUserFriends, FaUpload } from "react-icons/fa";
import { Context } from './Context';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const SubmissionContainer = styled.div`
  display: flex;
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

const ManuscriptSubmission = ({setActivePage}) => {
  const { categories } = useContext(Context);
  const authorInfo = useSelector(state=>state.authorInfo)
  const authorId = useSelector(state=>state.authorInfo.id)
   const [manuscripts, setManuscripts] = useState([]);
   const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    submissionType:"",
    originalArticleCode: "",
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
    formDataToSend.append("submissionType", formData.submissionType);
    formDataToSend.append("originalArticleCode", formData.originalArticleCode);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("abstract", formData.abstract);
    formDataToSend.append("keywords", formData.keywords);
    formDataToSend.append("coAuthors", formData.coAuthors);
    formDataToSend.append("articleCategory", formData.articleCategory); // Updated field
    formDataToSend.append("articleCode", formData.articleCode);
    formDataToSend.append("author_id", authorInfo.id); // Replace with actual logged-in author's ID
    formDataToSend.append("manuscriptFile", formData.manuscriptFile);

    try {
      const response = await fetch("https://www.fuprecosjournals.org/api/submit_manuscript.php", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      Swal.fire({text:result.message,icon:"success"});

      if (result.success) {
        setFormData({
          submissionType:"",
          originalArticleCode:"",
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



  return (
    <SubmissionContainer>
      <FormWrapper>
        <h2 style={{color:"#0077B5"}}>Submit Your Manuscript</h2>
        <form onSubmit={handleSubmit}>
        <InputField>
            <select name="submissionType" required onChange={handleChange}>
              <option>-- Select Submission Type --</option>
                <option value="New Submission">New Submission</option>
                <option value="Revised Submission">Revised Submission</option>
            </select>
          </InputField>

          {formData.submissionType==="Revised Submission"&&<InputField>
            <select name="originalArticleCode" onChange={handleChange}>
              <option>-- Select Original Article Code--</option>
                {manuscripts.map((manuscript)=>(
                  <option value={manuscript.article_code} key={manuscript.id}>{manuscript.article_code}-{manuscript.title} </option>
                ))}
                
            </select>
          </InputField>}

          <InputField>
            <FaFileAlt />
            <input type="text" name="title" placeholder="Manuscript Title" required onChange={handleChange} />
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
            <FaFileAlt />
            Article Code:
            <input type="text" name="articleCode" value={formData.articleCode} readOnly />
          </InputField>

          <FileInput id="file" type="file" accept=".doc,.docx,.pdf" required onChange={handleFileChange} />
          <FileLabel htmlFor="file">
            <FaUpload /> Upload File
          </FileLabel>

          {fileName && <FileNameDisplay>Selected File: {fileName}</FileNameDisplay>}

          <SubmitButton type="submit">Submit Manuscript</SubmitButton>
        </form>
      </FormWrapper>
    </SubmissionContainer>
  );
};

export default ManuscriptSubmission;




