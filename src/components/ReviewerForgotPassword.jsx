import React, { useState } from "react";
import styled from "styled-components";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bg from '../Images/1717.jpg';

const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
  background-image: url(${bg});
  background-size: cover;
  position: relative;
  
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
  background: rgba(255, 255, 255, 0.7);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
  width: 400px;
  text-align: center;
  position: relative;
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

const ReviewerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading alert
    Swal.fire({
      title: "Processing Request...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(
        "https://www.fuprecosjournals.org/api/reviewer_forgot_password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Email Sent!",
          text: "A password reset link has been sent to your email.",
        }).then(() => {
          navigate("/reviewerlogin");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Request Failed",
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
    <ForgotPasswordContainer>
      <FormWrapper>
        <h2 style={{ color: "rgba(0, 0, 255, 0.5)" }}>Reviewer Forgot Password</h2>
        <p style={{ marginBottom: "15px", color: "#555" }}>
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <InputField>
            <FaEnvelope style={{ color: "rgba(0, 0, 255, 0.5)" }} />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              required
              onChange={handleChange}
            />
          </InputField>

          <SubmitButton type="submit">
            <FaPaperPlane /> Send Reset Link
          </SubmitButton>
        </form>

        <SwitchText>
          Remember your password?{" "}
          <a onClick={() => navigate("/reviewerlogin")}>Log In</a>
        </SwitchText>
      </FormWrapper>
    </ForgotPasswordContainer>
  );
};

export default ReviewerForgotPassword;
