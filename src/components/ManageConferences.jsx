import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import RegistrationsModal from "./RegistrationsModal";


/* -------------------- API CONFIG -------------------- */

const API = "https://www.fuprecosjournals.org/api/";

/* -------------------- STYLED COMPONENTS -------------------- */

const Container = styled.div`
  padding: 40px;
  min-height: 100vh;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 18px;
  border: none;
  background: #1a73e8;
  color: white;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #125fcc;
  }
`;

const Grid = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.div`
  width: 260px;
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.08);

  @media(max-width:428px){
  width:100%;
  }
`;

const Flier = styled.img`
  width: 100%;
  height: 160px;
  border-radius: 8px;
  object-fit: cover;
`;

const DeleteBtn = styled.button`
  width: 100%;
  margin-top: 10px;
  background: red;
  color: white;
  padding: 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #b80000;
  }
`;

/* -------------------- MODAL -------------------- */

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
  width: 420px;
  padding: 25px;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
`;

const SaveButton = styled.button`
  background: #1a73e8;
  border: none;
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  color: white;
  cursor: pointer;

  &:hover {
    background: #125fcc;
  }
`;


const SmallBtn = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: ${(p) => p.red ? "red" : "#1a73e8"};
  color: white;

  &:hover {
    background: ${(p) => p.red ? "#b80000" : "#125fcc"};
  }
`;


/* -------------------- MAIN COMPONENT -------------------- */

export default function ManageConferences({ setActivePage }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
const [currentConf, setCurrentConf] = useState(null);


  /* ---------------- FETCH CONFERENCES ---------------- */

  const loadData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}fetch_conferences.php`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        Swal.fire("Error", "Failed to load conferences", "error");
      }
    } catch (err) {
      Swal.fire("Network Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, []);

  /* ---------------- DELETE CONFERENCE ---------------- */
const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: "Delete Conference?",
    text: "Are you sure you want to delete this conference?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel"
  });

  if (!confirm.isConfirmed) return;

  try {
    setLoading(true);

    const fd = new FormData();
    fd.append("id", id);

    const response = await axios.post(`${API}delete_conference.php`, fd);

    if (response.data.success) {
      Swal.fire("Deleted", response.data.message, "success");
      loadData(); // refresh conference list
    } else {
      Swal.fire({text: response.data.message,});
    }

  } catch (err) {
    Swal.fire("Network Error", "Could not delete conference", "error");
  } finally {
    setLoading(false);
  }
};


  const openRegistrations = (conf) => {
  setCurrentConf(conf);
  setShowRegs(true);
};


  return (
    <Container>
      <TopBar>
        <h2 style={{color:"#0a2a43"}}>CONFERENCES</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Button onClick={() => setActivePage("profile")}>Back</Button>
          <Button onClick={() => setShowModal(true)}>+ Create Conference</Button>
        </div>
      </TopBar>

      {loading && <p>Loading...</p>}

      <Grid>
        {list.map((item) => (
          <Card key={item.id}>
            <Flier src={`https://www.fuprecosjournals.org/api/${item.flier_path}`} />
            <h4 style={{color:"#0a2a43"}}>
  {item.title
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")}
</h4>

            <p><b style={{color:"#0a2a43"}}>Venue:</b> {item.venue}</p>
            <p><b style={{color:"#0a2a43"}}>Dates:</b> {item.start_date} → {item.end_date}</p>

            <DeleteBtn onClick={() => handleDelete(item.id)}>
              Delete
            </DeleteBtn>
            <SmallBtn onClick={() => openRegistrations(item)}>
  View Registrations
</SmallBtn>

          </Card>
        ))}
      </Grid>

      {showModal && (
        <CreateConferenceModal
          close={() => setShowModal(false)}
          refresh={loadData}
        />
      )}

      {showRegs && (
  <RegistrationsModal
    conference={currentConf}
    close={() => setShowRegs(false)}
  />
)}

    </Container>
  );
}

/* -------------------- MODAL COMPONENT -------------------- */

function CreateConferenceModal({ close, refresh }) {
  const [data, setData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    venue: "",
  });

  const [flier, setFlier] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!data.title || !data.venue || !data.start_date) {
      return Swal.fire("Missing Fields", "All fields are required", "warning");
    }

    if (!flier) {
      return Swal.fire("No File", "Please upload a conference flier", "warning");
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("title", data.title);
      fd.append("start_date", data.start_date);
      fd.append("end_date", data.end_date);
      fd.append("venue", data.venue);
      fd.append("flier", flier);

      const response = await axios.post(`${API}create_conference.php`, fd);

      if (response.data.success) {
        Swal.fire("Success", response.data.message, "success");
        refresh();
        close();
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (err) {
      Swal.fire("Network Error", "Could not create conference", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <Modal>
        <h3>Create Conference</h3>

        <Label>Flier (jpg, jpeg, png)</Label>
        <Input 
  type="file" 
  accept="image/*" 
  onChange={(e) => setFlier(e.target.files[0])} 
/>


        <Label>Title</Label>
        <Input type="text" onChange={(e) => setData({ ...data, title: e.target.value })} />

        <Label>Start Date</Label>
        <Input type="date" onChange={(e) => setData({ ...data, start_date: e.target.value })} />

        <Label>End Date</Label>
        <Input type="date" onChange={(e) => setData({ ...data, end_date: e.target.value })} />

        <Label>Venue</Label>
        <Input type="text" onChange={(e) => setData({ ...data, venue: e.target.value })} />

        <SaveButton onClick={handleSubmit}>
          {loading ? "Saving..." : "Save"}
        </SaveButton>

        <Button style={{ marginTop: "10px" }} onClick={close}>
          Cancel
        </Button>
      </Modal>
    </Overlay>
  );
}
