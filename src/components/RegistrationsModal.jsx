import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

const API = "https://www.fuprecosjournals.org/api/";

/* -------------------- STYLED COMPONENTS -------------------- */

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
  width: 950px;
  max-height: 90vh;
  overflow-y: auto;
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

const Button = styled.button`
  padding: 10px 18px;
  margin-top: 12px;
  border: none;
  background: #1a73e8;
  color: white;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #125fcc;
  }
`;

/* ---------- TABLE STYLES ---------- */

const TableWrapper = styled.div`
  margin-top: 15px;
  max-height: 90vh;
  overflow-y: scroll;
  overflow-x: scroll;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    font-size: 14px;
  }

  th {
    background: #f4f6f8;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  tr:hover td {
    background: #f0f7ff;
  }
`;

/* -------------------- COMPONENT -------------------- */

export default function RegistrationsModal({ conference, close }) {
  const [regList, setRegList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!conference) return;
    loadRegistrations();
  }, [conference]);

  const loadRegistrations = async () => {
    try {
      const res = await axios.get(
        `${API}fetch_registrations.php?conference_id=${conference.id}`
      );

      if (res.data.success) {
        setRegList(res.data.data);
      } else {
        setRegList([]);
      }
    } catch (err) {
      Swal.fire("Error", "Could not load registrations", "error");
    }
  };

  /* ---- FILTER ---- */
  const filtered = regList.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    (u.passcode || "").toLowerCase().includes(search.toLowerCase())
  );



const handleApprove = async (regId, userName, userEmail, confTitle) => {
  const confirm = await Swal.fire({
    title: "Approve Registration?",
    text: `Send passcode to ${userName} (${userEmail})`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, approve",
    cancelButtonText: "Cancel"
  });

  if (!confirm.isConfirmed) return;

  try {
    const fd = new FormData();
    fd.append("id", regId);

    const res = await axios.post(`${API}approve_registration.php`, fd);

    if (res.data.success) {
      Swal.fire("Approved", res.data.message, "success");
      loadRegistrations(); // reload the list
    } else {
      Swal.fire("Error", res.data.message, "error");
    }
  } catch (err) {
    Swal.fire("Error", "Could not approve registration", "error");
  }
};




  return (
    <Overlay>
      <Modal>
        <h3 style={{ color: "#000080" }}>
          Registrations — {conference.title}
        </h3>

        <Input
          placeholder="Search by name, email, or passcode..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableWrapper>
          {filtered.length === 0 ? (
            <p style={{ padding: "10px" }}>No registrations found</p>
          ) : (
            <StyledTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>School</th>
                  {/* <th>Payment</th> */}
                  <th>Status</th>
                  <th>Passcode</th>
                  <th>Abstract</th>
                  <th>Proof</th>
                  <th>Registered</th>
                  <th>Action</th> 
                </tr>
              </thead>

              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td><b>{u.name}</b></td>
                    <td>{u.email}</td>
                    <td>{u.school}</td>
                    {/* <td>{u.payment_status}</td> */}
                    <td style={{color:u.registration_status==='Approved'?"green":"red", fontWeight:"bold"}}>{u.registration_status}</td>
                    <td><b>{u.passcode || "Not approved"}</b></td>

                    <td>
                      {u.abstract_path ? (
                        <a
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `https://www.fuprecosjournals.org/api/${u.abstract_path}`
                            )
                          }
                        >
                          View
                        </a>
                      ) : (
                        "None"
                      )}
                    </td>

                    <td>
                      {u.proof_path ? (
                        <a
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `https://www.fuprecosjournals.org/api/${u.proof_path}`
                            )
                          }
                        >
                          View
                        </a>
                      ) : (
                        "None"
                      )}
                    </td>

                    <td>{u.created_at}</td>
                    <td>
  {u.passcode ? (
   <p style={{color:"green", fontWeight:"bold"}}>Approved</p> 
  ) : (
    <a
      style={{
        // background: "green",
        color: "blue",
        textDecoration:"underline",
        // padding: "6px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        border: "none",
      }}
      onClick={() => handleApprove(u.id, u.name, u.email, conference.title)}
    >
      Approve the User
    </a>
  )}
</td>

                  </tr>
                ))}
              </tbody>
            </StyledTable>
          )}
        </TableWrapper>

        <Button onClick={close}>Close</Button>
      </Modal>
    </Overlay>
  );
}
