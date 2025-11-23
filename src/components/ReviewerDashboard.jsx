import React, { useState } from "react";
import styled from "styled-components";
import { FaUser, FaFileUpload, FaSearch, FaBars, FaTimes, FaSignOutAlt, FaFileAlt } from "react-icons/fa";
import ReviewerProfile from "./ReviewerProfile";
import ManuscriptSubmission from "./ManuscriptSubmission";
import ManuscriptTracking from "./ManuscriptTracking";
import AuthorManuscripts from "./AuthorManuscripts";
import { reviewerLogout } from "../Features/Slice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import ManuscriptsAssignedtoReviewer from "./ManuscriptsAssignedtoReviewer";
import SearchComponent from "./SearchComponent";


const DashboardContainer = styled.div`
  display: flex;
  background: #f4f4f4;
  padding-top:70px;
  justify-content:center;
`;

// const Sidebar = styled.div`
//   background: gray;
//   width: ${(props) => (props.open ? "250px" : "60px")};
//   height: 100%;
//   min-height:600px;
//   transition: width 0.3s ease-in-out;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 20px;
//   z-index: 10;
// `;

const Sidebar = styled.div`
  // background: #0077B5;
  background:rgba(0,0,0,0.3);
  width: ${(props) => (props.open ? "250px" : "60px")};
  // height: 100%;
  // min-height:600px;
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  z-index: 10;
  position:fixed;
  right:0px;
`;

const MenuButton = styled.div`
  top: 150px;
  left: ${(props) => (props.open ? "220px" : "10px")};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: white;
  transition: left 0.3s ease-in-out;


  @media(max-width:420px){
  // display:none;
  }
`;

const MenuItem = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  color: white;
  padding: 15px;
  cursor: pointer;
  margin: 5px 0;
  border-radius: 5px;
  transition: 0.3s;
  font-size: 1rem;

  &:hover {
    background: #005A93;
  }

  svg {
    margin-right: ${(props) => (props.open ? "10px" : "0")};
    transition: margin-right 0.3s;
  }

  span {
    display: ${(props) => (props.open ? "inline" : "none")};
  }

@media(max-width:420px){
  span{
   
  }
}


`;

const ContentContainer = styled.div`
  // margin-left: ${(props) => (props.open ? "250px" : "60px")};
  padding-top: 20px;

  width: 100%;
  transition: margin-left 0.3s ease-in-out;
`;

const ReviewerDashboard = () => {
  const [activePage, setActivePage] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();



  const handleLogout = () => {
    Swal.fire({
      // title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
       dispatch(reviewerLogout()); // Perform the logout action
        Swal.fire(
          'Logged Out!',
          'You have been logged out.',
          'success'
        );
      }
    });
  };

  return (
    <DashboardContainer>
      <Sidebar open={menuOpen}>
        <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        <MenuItem open={menuOpen} onClick={() => {setActivePage("profile");window.scroll(0,0)}} style={{background:activePage==='profile'?'#005A93':''}}>
          <FaUser /> <span>Reveiwer Profile</span>
        </MenuItem>

        <MenuItem open={menuOpen} onClick={() => {setActivePage("assignedmanuscript");window.scroll(0,0)}} style={{background:activePage==='assignedmanuscript'?'#005A93':''}}>
          <FaFileAlt /> <span>Assigned Manuscripts</span>
        </MenuItem>

        <MenuItem open={menuOpen} onClick={() => {setActivePage("searchmanuscripts");window.scroll(0,0)}} style={{background:activePage==='searchmanuscripts'?'#005A93':''}}>
          <FaSearch /> <span>Search Manuscripts</span>
        </MenuItem>

        <MenuItem open={menuOpen} onClick={handleLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </MenuItem>
      </Sidebar>

      <ContentContainer open={menuOpen}>
        {activePage === "profile" && <ReviewerProfile/>}
        {activePage === "assignedmanuscript" && <ManuscriptsAssignedtoReviewer />}
        {activePage === "searchmanuscripts" && <SearchComponent setActivePage={setActivePage}/>}
      </ContentContainer>
    </DashboardContainer>
  );
};

export default ReviewerDashboard;
