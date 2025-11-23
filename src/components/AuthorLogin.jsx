

import React, { useState } from "react";
import styled from "styled-components";
import { FaEnvelope, FaLock, FaSignInAlt,FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authorLogin } from "../Features/Slice";
import { useDispatch } from "react-redux";
import bg from '../Images/514.jpg'

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background: #f9f9f9;

  input {
    border: none;
    outline: none;
    width: 100%;
    padding: 5px;
    background: transparent;
  }

    .toggle-visibility {
    cursor: pointer;
    color: rgba(0, 0, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  background: rgba(0,0,255,0.5);
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: rgba(0,0,255,0.7);
  }
`;

const SwitchText = styled.p`
  margin-top: 15px;
  font-size: 0.9rem;

  a {
    color: rgba(0,0,255,0.7);
    cursor: pointer;
    text-decoration: underline;
  }
`;

const AuthorLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const [showPassword, setShowPassword] = useState(false);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading alert
    Swal.fire({
      title: "Logging in...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("https://www.fuprecosjournals.org/api/author_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back, " + result.user.full_name,
          allowOutsideClick:false,
        }).then((result)=>{
          if(result.isConfirmed){
            navigate("/authordashboard");
          }
        })

       
        dispatch(
          authorLogin({
            authorInfo: result.user,
            authorToken: result.token,
          })
        );
        

      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: result.error,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <LoginContainer>
      <FormWrapper>
        <h2 style={{ color: "rgba(0,0,255,0.5)" }}>Author Login</h2>
        <form onSubmit={handleSubmit}>
          <InputField>
            <FaEnvelope style={{ color: "rgba(0,0,255,0.5)" }} />
            <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
          </InputField>

          <InputField>
            <FaLock style={{ color: "rgba(0,0,255,0.5)" }} />
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" required onChange={handleChange} />
            <span className="toggle-visibility" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
          </InputField>

          <SubmitButton type="submit">
            <FaSignInAlt /> Log In
          </SubmitButton>
        </form>

        <SwitchText>
          Don't have an Author account? <a onClick={() => navigate('/authorsignup')}>Sign Up</a>
        </SwitchText>

        <SwitchText>
          <a onClick={() => navigate('/authorforgotpassword')}>Forgot Password </a>
        </SwitchText>
      </FormWrapper>
    </LoginContainer>
  );
};

export default AuthorLogin;

