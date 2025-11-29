
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { 
//   FaUser, FaEnvelope, FaUniversity, FaIdBadge, 
//   FaPhone, FaEdit, FaSave 
// } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import Swal from "sweetalert2";

// const ProfileContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
// `;

// const ProfileCard = styled.div`
//   padding: 30px;
//   width: 100%;
//   text-align: center;
// `;

// const InputField = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 10px 0;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   padding: 10px;
//   background: #f9f9f9;

//   select, input {
//     border: none;
//     outline: none;
//     width: 100%;
//     padding: 5px;
//     background: transparent;
//   }
// `;

// const EditButton = styled.button`
//   background: ${(props) => (props.editMode ? "#FF9800" : "#0077B5")};
//   color: white;
//   border: none;
//   padding: 10px;
//   width: 100%;
//   margin-top: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 1rem;

//   &:hover {
//     background: ${(props) => (props.editMode ? "#E68900" : "#005A93")};
//   }
// `;

// const EditorProfile = () => {
//   const [authorData, setAuthorData] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [updatedData, setUpdatedData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [countryCodes, setCountryCodes] = useState([]);

//   // Get author ID from Redux state
//   const editorInfo = useSelector((state) => state.editorInfo);

//   useEffect(() => {
//     if (editorInfo?.id) {
//       fetchAuthorData(editorInfo.id);
//     }
//     // fetchCountryCodes();
//   }, [editorInfo?.id]);

//   const fetchAuthorData = async (id) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`https://www.fuprecosjournals.org/api/get_editor_by_id.php?id=${id}`);

//       if (response.data.success) {
//         setAuthorData(response.data.author);
//         setUpdatedData(response.data.author);
//       } else {
//         setError(response.data.error);
//       }
//     } catch (err) {
//       setError("Failed to fetch author details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const fetchCountryCodes = async () => {
//   //   try {
//   //     const response = await axios.get("https://restcountries.com/v3.1/all");
//   //     const codes = response.data.map(country => ({
//   //       name: country.name.common,
//   //       code: country.idd?.root ? `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}` : ""
//   //     })).filter(country => country.code !== "").sort((a, b) => a.name.localeCompare(b.name));// Remove empty codes

//   //     setCountryCodes(codes);
//   //   } catch (err) {
//   //     console.error("Failed to fetch country codes:", err);
//   //   }
//   // };



//   useEffect(() => {
//     fetch("https://restcountries.com/v3.1/all?fields=idd,name")
//       .then((response) => response.json())
//       .then((data) => {
//         const formattedData = data
//           .map((country) => ({
//             code: country.idd?.root
//               ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : "")
//               : "",
//             name: country.name.common,
//           }))
//           .filter((country) => country.code)
//           .sort((a, b) => a.name.localeCompare(b.name));

//         setCountryCodes(formattedData);
//       })
//       .catch((error) => console.error("Error fetching country codes:", error));
//   }, []);


//   const handleChange = (e) => {
//     setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
//   };

//   const saveProfile = async () => {
//     const loadingAlert = Swal.fire({text:"Please wait..."})
//     Swal.showLoading();
//     try {
//       const response = await axios.post(`https://www.fuprecosjournals.org/api/update_editor.php`, updatedData);
      
//       if (response.data.success) {
//         setMessage("Profile updated successfully!");
//         setAuthorData(updatedData);
//         setEditMode(false);
//         Swal.fire({text:"Profile updated"})
//       } else {
//         setError(response.data.error);
//       }
//     } catch (err) {
//       setError("Failed to update profile.");
//     }finally{
//       loadingAlert.close();
//     }
//   };

//   if (loading) return <p>Loading editor details...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   // if (message) return <p style={{ color: "green" }}>{message}</p>;

//   return (
//     <ProfileContainer>
//       <ProfileCard>
//         <h2 style={{color:"#0077B5"}}>Editor Profile</h2>

//         <InputField>
//           <FaUser />
//           <input type="text" name="full_name" value={updatedData?.full_name || ""} disabled={!editMode} onChange={handleChange} placeholder="Full name"/>
//         </InputField>

//         <InputField>
//           <FaEnvelope />
//           <input type="email" name="email" value={updatedData?.email || ""} disabled placeholder="Email"/>
//         </InputField>

//         <InputField>
//           <FaUniversity />
//           <input type="text" name="affiliation" value={updatedData?.affiliation || ""} disabled={!editMode} onChange={handleChange} placeholder="Affiliation / Institution"/>
//         </InputField>

//         <InputField>
//           <FaIdBadge />
//           <input type="text" name="orcid" value={updatedData?.orcid || ""} disabled={!editMode} onChange={handleChange} placeholder="ORCID"/>
//         </InputField>

//         <InputField>
//           <FaPhone />
//           <select name="phone_code" value={updatedData?.phone_code || ""} disabled={!editMode} onChange={handleChange}>
//             {countryCodes.map((country, index) => (
//               <option key={index} value={country.code}>
//                 {country.name} ({country.code})
//               </option>
//             ))}
//           </select>
//         </InputField>

//         <InputField>
//           <FaPhone />
//           <input type="text" name="phone_number" value={updatedData?.phone_number || ""} disabled={!editMode} onChange={handleChange} placeholder="Phone number"/>
//         </InputField>

//         <EditButton editMode={editMode} onClick={editMode ? saveProfile : () => setEditMode(true)}>
//           {editMode ? <FaSave /> : <FaEdit />} {editMode ? "Save Changes" : "Edit Profile"}
//         </EditButton>
//         {editMode&&<EditButton editMode={editMode} onClick={() => setEditMode(false)} style={{backgroundColor:"gray"}}>
//           Cancel
//         </EditButton>}
//       </ProfileCard>
//     </ProfileContainer>
//   );
// };

// export default EditorProfile;




import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaUser,
  FaEnvelope,
  FaUniversity,
  FaIdBadge,
  FaPhone,
  FaEdit,
  FaSave,
  FaLayerGroup,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

// ---------- BANKING DASHBOARD STYLING ----------
const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  padding: 40px 20px;
  gap:50px;
`;

const Card = styled.div`
  background: white;
  width: 90%;
  max-width: 900px;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 4px 15px rgba(0,0,0,0.08);
`;

const Header = styled.h2`
  color: #005A93;
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: 700;
`;

const FieldRow = styled.div`
  background: #f4f6f8;
  display: flex;
  align-items: center;
  padding: 14px;
  border-radius: 12px;
  margin: 10px 0;

  svg {
    margin-right: 12px;
    color: #005A93;
    font-size: 1.1rem;
  }

  input, select {
    border: none;
    outline: none;
    flex: 1;
    background: transparent;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background: ${(p) => (p.save ? "#28a745" : "#0077B5")};
  color: white;
  padding: 14px;
  border: none;
  width: 100%;
  border-radius: 10px;
  font-size: 1.1rem;
  margin-top: 18px;
  cursor: pointer;

  &:hover {
    background: ${(p) => (p.save ? "#208a38" : "#005a93")};
  }
`;

const CancelButton = styled.button`
  background: gray;
  color: white;
  padding: 12px;
  border: none;
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    background: #565656;
  }
`;

const ManageConferenceBtn = styled.button`
  background: #ff9800;
  color: white;
  padding: 18px;
  width: 100%;
  font-size: 1.2rem;
  margin-top: 25px;
  border: none;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 10px;
    font-size: 1.3rem;
  }

  &:hover {
    background: #e68900;
  }
`;



const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.8rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 100, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 100, 0, 0.05);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0, 100, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  color: #00994d;
  margin-bottom: 0.8rem;
`;

const StatLabel = styled.h4`
  color: #333;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const StatValue = styled.p`
  color: #777;
`;


// ----------------------------------------------------

const EditorProfile = ({ setActivePage }) => {
  const [authorData, setAuthorData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countryCodes, setCountryCodes] = useState([]);

  const editorInfo = useSelector((state) => state.editorInfo);

  useEffect(() => {
    if (editorInfo?.id) {
      fetchAuthorData(editorInfo.id);
    }
  }, [editorInfo?.id]);

  const fetchAuthorData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.fuprecosjournals.org/api/get_editor_by_id.php?id=${id}`
      );

      if (response.data.success) {
        setAuthorData(response.data.author);
        setUpdatedData(response.data.author);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=idd,name")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .map((c) => ({
            code: c.idd?.root
              ? c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "")
              : "",
            name: c.name.common,
          }))
          .filter((i) => i.code)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountryCodes(formatted);
      });
  }, []);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    const loadingAlert = Swal.fire({ text: "Please wait..." });
    Swal.showLoading();

    try {
      const response = await axios.post(
        `https://www.fuprecosjournals.org/api/update_editor.php`,
        updatedData
      );

      loadingAlert.close();

      if (response.data.success) {
        Swal.fire("Updated", "Profile updated successfully", "success");
        setEditMode(false);
      }
    } catch {
      Swal.fire("Error", "Unable to update profile", "error");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <PageWrapper>
      <Card>
        <Header>Editor Dashboard</Header>

        <FieldRow>
          <FaUser />
          <input
            type="text"
            name="full_name"
            value={updatedData?.full_name || ""}
            disabled={!editMode}
            onChange={handleChange}
          />
        </FieldRow>

        <FieldRow>
          <FaEnvelope />
          <input type="email" value={updatedData?.email} disabled />
        </FieldRow>

        <FieldRow>
          <FaUniversity />
          <input
            type="text"
            name="affiliation"
            value={updatedData?.affiliation || ""}
            onChange={handleChange}
            disabled={!editMode}
          />
        </FieldRow>

        <FieldRow>
          <FaIdBadge />
          <input
            type="text"
            name="orcid"
            value={updatedData?.orcid || ""}
            onChange={handleChange}
            disabled={!editMode}
          />
        </FieldRow>

        <FieldRow>
          <FaPhone />
          <select
            name="phone_code"
            value={updatedData?.phone_code || ""}
            disabled={!editMode}
            onChange={handleChange}
          >
            {countryCodes.map((c, i) => (
              <option key={i} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </FieldRow>

        <FieldRow>
          <FaPhone />
          <input
            type="text"
            name="phone_number"
            value={updatedData?.phone_number || ""}
            onChange={handleChange}
            disabled={!editMode}
          />
        </FieldRow>

        {!editMode ? (
          <Button onClick={() => setEditMode(true)}>
            <FaEdit /> Edit Profile
          </Button>
        ) : (
          <>
            <Button save onClick={saveProfile}>
              <FaSave /> Save Changes
            </Button>
            <CancelButton onClick={() => setEditMode(false)}>
              Cancel
            </CancelButton>
          </>
        )}


      </Card>

   

           <StatsGrid>
          <StatCard onClick={() => setActivePage("manageconference")}>
            <StatIcon><FaLayerGroup /></StatIcon>
            <StatLabel>Manage Conferences</StatLabel>
            <StatValue>Create and delete conferences, control registration accesses</StatValue>
          </StatCard>

    
          </StatsGrid>
    </PageWrapper>
  );
};

export default EditorProfile;
