import React, { useState } from "react";
import styled from "styled-components";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPlus, FaMinus, FaTwitter, FaLinkedin, FaFacebook, FaGlobe } from "react-icons/fa";
import contactimg from "../Images/contactimg.jpg";
import Swal from "sweetalert2";
import axios from "axios";

// Styled Components
const ContactPage = styled.div`
  font-family: "Arial", sans-serif;
  background-image: url(${contactimg});
  background-size: cover;
  background-position: center;
  padding: 100px 20px 60px;
  position: relative;
  color: #003366;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.75);
    z-index: 0;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  z-index: 1;
  color: #003366;
`;

const ContactContainer = styled.div`
  max-width: 900px;
  margin: 0 auto 40px;
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.2rem;
  margin: 15px 0;
`;

const FAQSection = styled.div`
  max-width: 800px;
  margin: 40px auto;
  text-align: left;
  position: relative;
  z-index: 1;
`;

const FAQTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #003366;
`;

const FAQItem = styled.div`
  background: #e6f0ff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #003366;
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
`;

const Answer = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: #003366;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #003366;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 1rem;
  border: 1px solid #003366;
  border-radius: 5px;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 1rem;
  border: 1px solid #003366;
  border-radius: 5px;
  outline: none;
  height: 120px;
`;

const SubmitButton = styled.button`
  background: #003366;
  color: white;
  padding: 12px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0055aa;
  }
`;

const ContactSupport = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({ title: "Sending...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    try {
      const response = await axios.post('https://www.fuprecosjournals.org/api/contact_form_endpoint.php', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.success) {
        setFormData({ name: "", email: "", phone: "", message: "" });
        Swal.fire({ icon: "success", title: "Success!", text: response.data.message });
      } else {
        Swal.fire({ icon: "error", title: "Error!", text: response.data.error });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Error!", text: "There was an error sending the message." });
    }
  };

  const faqs = [
    { question: "How do I submit a manuscript?", answer: "Manuscripts must be submitted via the online submission portal." },
    { question: "What is the review timeline?", answer: "The journal typically completes peer review in 6-8 weeks." },
    { question: "Are there publication fees?", answer: "Article processing charges (APCs) apply after acceptance." },
  ];

  return (
    <ContactPage>
      <PageTitle>Contact & Support</PageTitle>

      <ContactContainer>
        <h2>Editorial Office Contact</h2>
        <p><strong>FUPRE Journal of Petroscience</strong></p>
        <p>College of Science, Federal University of Petroleum Resources, Effurun, Delta State, Nigeria</p>
        <ContactItem><FaEnvelope /> Email: cosjournals@fupre.edu.ng</ContactItem>
        <ContactItem><FaPhone /> Phone: +234 (0) 907 042 2286</ContactItem>
   
        <ContactItem><FaMapMarkerAlt /> Response Time: 2-3 business days</ContactItem>
      </ContactContainer>

      <FAQSection>
        <FAQTitle>Frequently Asked Questions (FAQs)</FAQTitle>
        {faqs.map((faq, index) => (
          <FAQItem key={index} onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
            <Question>{faq.question} {openFAQ === index ? <FaMinus /> : <FaPlus />}</Question>
            <Answer show={openFAQ === index}>{faq.answer}</Answer>
          </FAQItem>
        ))}
      </FAQSection>

      <FormContainer>
        <FormTitle>Send Us a Message</FormTitle>
        <form onSubmit={handleSubmit}>
          <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required />
          <Input name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required />
          <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Your Phone Number" required />
          <TextArea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your Message" required />
          <SubmitButton type="submit">Send Message</SubmitButton>
        </form>
      </FormContainer>

      <FAQSection>
        <FAQTitle>Follow Us</FAQTitle>
        <SocialIcons>
          <a href="#"><FaFacebook size={30} color="#1877F2" /></a>
          <a href="#"><FaTwitter size={30} color="#1DA1F2" /></a>
          <a href="#"><FaLinkedin size={30} color="#0077B5" /></a>
        </SocialIcons>
      </FAQSection>
    </ContactPage>
  );
};

export default ContactSupport;
