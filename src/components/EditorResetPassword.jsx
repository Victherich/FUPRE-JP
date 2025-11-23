import React, { useState } from "react";
import styled from "styled-components";
import { FaLock, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import bg from "../Images/6420.jpg";

const ResetPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  background: rgba(255, 255, 255, 0.8);
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

  .toggle-visibility {
    cursor: pointer;
    color: rgba(0, 0, 255, 0.5);
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

const EditorResetPassword = () => {
     const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams(); // Get reset token from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    // Show loading alert
    Swal.fire({
      title: "Resetting Password...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(
        "https://www.fuprecosjournals.org/api/editor_reset_password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password: formData.password }),
        }
      );

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Password reset successfully.",
        }).then(() => {
          navigate("/editorlogin");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.error,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <ResetPasswordContainer>
      <FormWrapper>
        <h2 style={{ color: "rgba(0,0,255,0.5)" }}>Editor Reset Password</h2>
        <p style={{ marginBottom: "15px", color: "#555" }}>
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit}>
          <InputField>
            <FaLock style={{ color: "rgba(0,0,255,0.5)" }} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter New Password"
              required
              onChange={handleChange}
            />
            <span className="toggle-visibility" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
          </InputField>

          <InputField>
            <FaKey style={{ color: "rgba(0,0,255,0.5)" }} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              required
              onChange={handleChange}
            />
             <span className="toggle-visibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
          </InputField>

          <SubmitButton type="submit">Reset Password</SubmitButton>
        </form>

        <SwitchText>
          Remember your password?{" "}
          <a onClick={() => navigate("/editorlogin")}>Log In</a>
        </SwitchText>
      </FormWrapper>
    </ResetPasswordContainer>
  );
};

export default EditorResetPassword;
