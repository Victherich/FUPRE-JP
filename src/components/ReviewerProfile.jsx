import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { 
  FaUser, FaEnvelope, FaUniversity, FaIdBadge, 
  FaPhone, FaEdit, FaSave 
} from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ProfileCard = styled.div`
  padding: 30px;
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

  select, input {
    border: none;
    outline: none;
    width: 100%;
    padding: 5px;
    background: transparent;
  }
`;

const EditButton = styled.button`
  background: ${(props) => (props.editMode ? "#FF9800" : "#0077B5")};
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: ${(props) => (props.editMode ? "#E68900" : "#005A93")};
  }
`;

const ReviewerProfile = () => {
  const [reviewerData, setReviewerData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [countryCodes, setCountryCodes] = useState([]);

  // Get reviewer ID from Redux state
  const reviewerInfo = useSelector((state) => state.reviewerInfo);

  useEffect(() => {
    if (reviewerInfo?.id) {
      fetchReviewerData(reviewerInfo.id);
    }
    fetchCountryCodes();
  }, [reviewerInfo?.id]);

  const fetchReviewerData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.fuprecosjournals.org/api/get_reviewer_by_id.php?id=${id}`);

      if (response.data.success) {
        setReviewerData(response.data.reviewer);
        setUpdatedData(response.data.reviewer);
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError("Failed to fetch reviewer details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCountryCodes = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const codes = response.data.map(country => ({
        name: country.name.common,
        code: country.idd?.root ? `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}` : ""
      })).filter(country => country.code !== "").sort((a, b) => a.name.localeCompare(b.name)); // Remove empty codes

      setCountryCodes(codes);
    } catch (err) {
      console.error("Failed to fetch country codes:", err);
    }
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    const loadingAlert = Swal.fire({ text: "Please wait..." });
    Swal.showLoading();
    try {
      const response = await axios.post(`https://www.fuprecosjournals.org/api/update_reviewer.php`, updatedData);
      
      if (response.data.success) {
        setMessage("Profile updated successfully!");
        setReviewerData(updatedData);
        setEditMode(false);
        Swal.fire({ text: "Profile updated" });
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      loadingAlert.close();
    }
  };

  if (loading) return <p>Loading reviewer details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <ProfileContainer>
      <ProfileCard>
        <h2 style={{ color: "#0077B5" }}>Reviewer Profile</h2>

        <InputField>
          <FaUser />
          <input type="text" name="full_name" value={updatedData?.full_name || ""} disabled={!editMode} onChange={handleChange} placeholder="Full name" />
        </InputField>

        <InputField>
          <FaEnvelope />
          <input type="email" name="email" value={updatedData?.email || ""} disabled placeholder="Email" />
        </InputField>

        <InputField>
          <FaUniversity />
          <input type="text" name="affiliation" value={updatedData?.affiliation || ""} disabled={!editMode} onChange={handleChange} placeholder="Affiliation / Institution" />
        </InputField>

        <InputField>
          <FaIdBadge />
          <input type="text" name="orcid" value={updatedData?.orcid || ""} disabled={!editMode} onChange={handleChange} placeholder="ORCID" />
        </InputField>

        <InputField>
          <FaPhone />
          <select name="phone_code" value={updatedData?.phone_code || ""} disabled={!editMode} onChange={handleChange}>
            {countryCodes.map((country, index) => (
              <option key={index} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </InputField>

        <InputField>
          <FaPhone />
          <input type="text" name="phone_number" value={updatedData?.phone_number || ""} disabled={!editMode} onChange={handleChange} placeholder="Phone number" />
        </InputField>

        <EditButton editMode={editMode} onClick={editMode ? saveProfile : () => setEditMode(true)}>
          {editMode ? <FaSave /> : <FaEdit />} {editMode ? "Save Changes" : "Edit Profile"}
        </EditButton>
        
        {editMode && (
          <EditButton editMode={editMode} onClick={() => setEditMode(false)} style={{ backgroundColor: "gray" }}>
            Cancel
          </EditButton>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ReviewerProfile;
