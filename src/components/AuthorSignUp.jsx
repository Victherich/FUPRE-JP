

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaUserGraduate, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import bg from '../Images/514.jpg'

const SignUpContainer = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
   background-color: #f4f4f9;
    background-image:url(${bg});
    background-size: cover;
    position:relative;
   
     &::before {
       content: "";
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background-color: rgba(255, 255, 255, 0.7);
     }
`;

const FormWrapper = styled.div`
  background: rgba(255,255,255,0.7);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
  width: 400px;
  text-align: center;
    position:relative;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  select {
    cursor: pointer;
  }

  .toggle-visibility {
    cursor: pointer;
    color: rgba(0, 0, 255, 0.5);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  font-size: 0.9rem;
  
  input {
    margin-right: 10px;
  }

  a{
    color:rgba(0,0,255,0.5);
    text-decoration:underline;
    cursor:pointer;
    font-weight:bold;
  }
`;

const SubmitButton = styled.button`
  background: rgba(0, 0, 255, 0.5);
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: rgba(0, 0, 255, 0.7);
  }

  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

const SwitchText = styled.p`
  margin-top: 15px;
  font-size: 0.9rem;

  a {
    color: rgba(0, 0, 255, 0.7);
    cursor: pointer;
    text-decoration: underline;
  }
`;

const AuthorSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneCode: "",
    phone: "",
    affiliation: "",
    orcid: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=idd,name")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data
          .map((country) => ({
            code: country.idd?.root
              ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : "")
              : "",
            name: country.name.common,
          }))
          .filter((country) => country.code)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountryCodes(formattedData);
      })
      .catch((error) => console.error("Error fetching country codes:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };







  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.agreeToTerms) {
      Swal.fire({
        icon: "warning",
        title: "Terms & Conditions",
        text: "You must agree to the Terms and Conditions to sign up.",
      });
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!",
      });
      return;
    }
  
    const userData = {
      name: formData.name,
      email: formData.email,
      phoneCode: formData.phoneCode,
      phone: formData.phone,
      affiliation: formData.affiliation,
      orcid: formData.orcid,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
  
    // Show loading state
    Swal.fire({
      title: "Registering...",
      text: "Please wait while we create your account.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await fetch("https://www.fuprecosjournals.org/api/author_signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: result.message,
        }).then(() => {
          navigate("/authorlogin"); // Redirect after success
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: result.error,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text: "Please try again later.",
      });
    }
  };
  





  return (
    <SignUpContainer>
      <FormWrapper>
        <h2 style={{ color: "rgba(0, 0, 255, 0.5)" }}>Author Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <InputField>
            <FaUser style={{ color: "rgba(0,0,255,0.5" }} />
            <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
          </InputField>

          <InputField>
            <FaEnvelope style={{ color: "rgba(0,0,255,0.5" }} />
            <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
          </InputField>

          <InputField>
            <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
              <option>--Select country code--</option>
              {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </InputField>

          <InputField>
            <FaPhone style={{ color: "rgba(0,0,255,0.5" }} />
            <input type="text" name="phone" placeholder="Phone number" required onChange={handleChange} />
          </InputField>

          <InputField>
            <FaBuilding style={{ color: "rgba(0,0,255,0.5" }} />
            <input type="text" name="affiliation" placeholder="Institution / Affiliation" required onChange={handleChange} />
          </InputField>

          <InputField>
            <FaUserGraduate style={{ color: "rgba(0,0,255,0.5" }} />
            <input type="text" name="orcid" placeholder="ORCID (Optional)" onChange={handleChange} />
          </InputField>

          {/* Password with Visibility Toggle */}
          <InputField>
            <FaLock style={{ color: "rgba(0,0,255,0.5" }} />
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Create Password" required onChange={handleChange} />
            <span className="toggle-visibility" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </InputField>

          {/* Confirm Password with Visibility Toggle */}
          <InputField>
            <FaLock style={{ color: "rgba(0,0,255,0.5" }} />
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
            <span className="toggle-visibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </InputField>

          <CheckboxContainer>
            <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
            <label>
              I agree to the <a 
              onClick={()=>navigate('/publishingpolicy')}>Publishing Policies</a>
            </label>
          </CheckboxContainer>

          <SubmitButton type="submit" disabled={!formData.agreeToTerms}>
            Sign Up
          </SubmitButton>
        </form>

        <SwitchText>
          Already have an Author account? <a onClick={() => navigate('/authorlogin')}>Log In</a>
        </SwitchText>
      </FormWrapper>
    </SignUpContainer>
  );
};

export default AuthorSignUp;


