import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import styled from "styled-components";
import bg from '../Images/6420.jpg'
// Styled Components for UI
const Container = styled.div`
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

const Card = styled.div`
  background: rgba(255,255,255,0.7);
  padding: 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  position:relative;


  h1{
    color:rgba(0,0,255,0.5);
    font-size:1.5rem;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const Button = styled.button`
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

const EditorEmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const {token}=useParams();


    

  



  const verifyEmail = async () => {
    setIsLoading(true);

    // Show loading alert
    Swal.fire({
      title: "Verifying Email...",
      text: "Please wait while we confirm your email.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("https://www.fuprecosjournals.org/api/editor_verify_email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Email Verified",
          text: result.message,
          confirmButtonText:"Login"
        }).then(() => {
          // Redirect to login after success
        });
        navigate("/editorlogin"); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: result.error,
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      console.error("Verification Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <h1>Editor Email Verification</h1>
        <Button onClick={verifyEmail}>Click to Verify</Button>
   
      </Card>
    </Container>
  );
};

export default EditorEmailVerification;
