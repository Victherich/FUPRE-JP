import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import axios from "axios";

const API = "https://www.fuprecosjournals.org/api/"; // backend base URL

const ConferencePage = () => {
  const [conferences, setConferences] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    abstract: null,
    proof: null,
  });

  

  const proofRef = useRef(null);
  const abstractRef = useRef(null);


  const [showFlier, setShowFlier] = useState(false);
const [selectedFlier, setSelectedFlier] = useState(null);

// Function to open flier full screen
const viewFlier = (flierUrl) => {
  setSelectedFlier(flierUrl);
  setShowFlier(true);
};

// Function to close flier modal
const closeFlier = () => {
  setShowFlier(false);
  setSelectedFlier(null);
};


  // Fetch conferences from backend
  const fetchConferences = async () => {
    try {
      const res = await axios.get(API + "fetch_conferences.php");
      if (res.data.success) {
        setConferences(res.data.data);
      } else {
        Swal.fire("Error", res.data.message || "Failed to fetch conferences.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch conferences.", "error");
    }
  };

  useEffect(() => {
    fetchConferences();
  }, []);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const openRegistrationModal = (conference) => {
    setSelectedConference(conference);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedConference) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("school", formData.school);
    data.append("abstract", formData.abstract);
    data.append("proof", formData.proof);
    data.append("conference_id", selectedConference.id);

    try {
      Swal.fire({
        text: "Submitting registration...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await axios.post(API + "conference_registration.php", data);
      Swal.close();

      if (res.data.success) {
        Swal.fire("Success!", "Registration submitted successfully!", "success");
        setFormData({ name: "", email: "", school: "", abstract: null, proof: null });
        proofRef.current.value = "";
        abstractRef.current.value = "";
        setShowModal(false);
      } else {
        Swal.fire("Error", res.data.message || "Failed to submit registration.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.close();
      Swal.fire("Error", "Something went wrong, please try again.", "error");
    }
  };

  return (
    <Wrapper>
      {/* Conferences Section */}
      <Section>
        <Title>OUR CONFERENCES</Title>
        <Gallery>
         {conferences.map((conf) => (
  <ConferenceCard key={conf.id}>
    <Flier src={`https://www.fuprecosjournals.org/api/${conf.flier_path}`} alt={conf.title} />
    <h4>{conf.title.charAt(0).toUpperCase() + conf.title.slice(1)}</h4>
    <p><b>Venue:</b> {conf.venue}</p>
    <p><b>Dates:</b> {conf.start_date} → {conf.end_date}</p>
    <RegisterBtn onClick={() => openRegistrationModal(conf)}>Register</RegisterBtn>
    <ViewFlierBtn onClick={() => viewFlier(`https://www.fuprecosjournals.org/api/${conf.flier_path}`)}>View Flier</ViewFlierBtn>
  </ConferenceCard>
))}

        </Gallery>
      </Section>

      {/* About */}
      <Section>
        <Title>About the Institution’s Conferences</Title>
        <Text>
          The Federal University of Petroleum Resources Effurun (FUPRE) holds 
          annual academic conferences aimed at promoting global research in 
          science, engineering, petroleum technology, sustainable energy, and 
          environmental management.  
          These conferences attract scholars, professionals, students, and industry 
          experts from around the world, providing a platform for knowledge 
          exchange, innovation, collaboration, and scientific advancement.  
        </Text>
      </Section>

      {/* Fees */}
      <Section>
        <Title>Conference Registration Fees</Title>
        <Table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Early Bird</th>
              <th>Late Registration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Foreign Participants</td>
              <td>100 USD</td>
              <td>150 USD</td>
            </tr>
            <tr>
              <td>Local Participants</td>
              <td>35,000 NGN</td>
              <td>40,000 NGN</td>
            </tr>
            <tr>
              <td>Students</td>
              <td>15,000 NGN</td>
              <td>20,000 NGN</td>
            </tr>
          </tbody>
        </Table>
      </Section>

      {/* Registration Modal */}
      {showModal && selectedConference && (
        <Overlay>
          <Modal>
            <h3>Register for {selectedConference.title}</h3>
            <Form onSubmit={handleSubmit}>
              <label>Name</label>
              <input type="text" name="name" required onChange={handleChange} value={formData.name} />
              <label>Email</label>
              <input type="email" name="email" required onChange={handleChange} value={formData.email} />
              <label>School</label>
              <input type="text" name="school" required onChange={handleChange} value={formData.school} />

              <label>Proof of Payment (PDF / Image)</label>
              <input type="file" name="proof" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleChange} ref={proofRef} />

              <label>Abstract Submission (Optional)</label>
              <input type="file" name="abstract" accept=".pdf,.doc,.docx" onChange={handleChange} ref={abstractRef} />

              <SaveButton type="submit">Submit Registration</SaveButton>
              <CancelBtn onClick={() => setShowModal(false)}>Cancel</CancelBtn>
            </Form>
          </Modal>
        </Overlay>
      )}

{/* Flier Fullscreen Modal */}
{showFlier && selectedFlier && (
  <Overlay onClick={closeFlier}>
    <FlierModal>
      <img src={selectedFlier} alt="Conference Flier" />
    </FlierModal>
  </Overlay>
)}


    </Wrapper>
  );
};

export default ConferencePage;

/* ================== STYLED COMPONENTS =================== */

const Wrapper = styled.div`
  width: 100%;
  background: #f8f9fb;
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  padding-top:100px;
`;

const Section = styled.section`
  margin-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
  color: #0a2a43;
  font-weight: bold;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.7;
  max-width: 900px;
  color: #333;
`;

const Gallery = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content:center;
`;

const ConferenceCard = styled.div`
  width: 300px;
//   background: white;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
//   box-shadow: 0 3px 6px rgba(0,0,0,0.1);
   color: #0a2a43;

  h4 {
    margin: 10px 0;
    font-size: 0.9rem;
    font-weight: 600;
  }

  p {
    margin: 5px 0;
    font-size: 0.8rem;
  }
`;

const Flier = styled.img`
  width: 100%;
//   height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const RegisterBtn = styled.button`
  margin-top: 10px;
  padding: 10px 16px;
  background: #0a2a43;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #0d3c60;
  }
`;

const Table = styled.table`
  width: 100%;
  max-width: 700px;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);

  th, td {
    padding: 16px;
    border: 1px solid #ddd;
    font-size: 18px;
    text-align: left;
  }

  th {
    background: #0a2a43;
    color: white;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-top: 15px;
    font-weight: bold;
  }

  input {
    margin-top: 5px;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #bbb;
    font-size: 16px;
  }
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 12px;
  background: #0a2a43;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #0d3c60;
  }
`;

const CancelBtn = styled.button`
  margin-top: 10px;
  padding: 12px;
  background: gray;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #555;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 500;
`;

const Modal = styled.div`
  background: white;
  width: 450px;
  max-width: 90%;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(0,0,0,0.2);
height:90vh;
overflow-y:scroll;
 color: #0a2a43;
`;


const ViewFlierBtn = styled.button`
  margin-top: 10px;
  margin-left:10px;
  padding: 8px 14px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #0056b3;
  }
`;

const FlierModal = styled.div`
  max-width: 90%;
  max-height: 90%;
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
    overflow-y:scroll;
`;
