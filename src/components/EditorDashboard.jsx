import React, { useState } from "react";
import styled from "styled-components";
import { FaUser, FaFileUpload, FaSearch, FaBars, FaTimes, FaSignOutAlt, FaFileAlt, FaRegAddressBook, FaUsers, FaUpload, FaBookOpen } from "react-icons/fa";
import EditorProfile from "./EditorProfile";
import ManuscriptSubmission from "./ManuscriptSubmission";
import ManuscriptTracking from "./ManuscriptTracking";
import AuthorManuscripts from "./AuthorManuscripts";
import { editorLogout } from "../Features/Slice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import AllSubmittedManuscripts from "./AllSubmittedManuscripts";
import EditorSignUp from "./EditorSignUp";
import AllReviewers from "./AllReviewers";
import SearchComponent from "./SearchComponent";
import PublishArticle from "./PublishArticle";
import PublishedArticles from "./PublishedArticles";
import ManageConferences from "./ManageConferences";


const DashboardContainer = styled.div`
  display: flex;
  background: #f4f4f4;
  padding-top:70px;
  justify-content:center;
`;

// const Sidebar = styled.div`
//   background: rgba(0,0,255,0.5);
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
  overflow-y:scroll;


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

const EditorDashboard = () => {
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
       dispatch(editorLogout()); // Perform the logout action
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
          <FaUser /> <span>Editor Profile</span>
        </MenuItem>

        <MenuItem open={menuOpen} onClick={() => {setActivePage("submission"); window.scroll(0,0)}} style={{background:activePage==='submission'?'#005A93':''}}>
          <FaFileAlt /> <span>Submitted Manuscripts</span>
        </MenuItem>

        <MenuItem open={menuOpen} onClick={() => {setActivePage("searchmanuscripts"); window.scroll(0,0)}} style={{background:activePage==='searchmanuscripts'?'#005A93':''}}>
                  <FaSearch /> <span>Search Manuscripts</span>
                </MenuItem>

                <MenuItem open={menuOpen} onClick={() => {setActivePage("publisharticle"); window.scroll(0,0)}} style={{background:activePage==='publisharticle'?'#005A93':''}}>
                  <FaUpload /> <span>Publish Article</span>
                </MenuItem>

                <MenuItem open={menuOpen} onClick={() => {setActivePage("publishedarticles");window.scroll(0,0)}} style={{background:activePage==='publishedarticles'?'#005A93':''}}>
                  <FaBookOpen /> <span>Published Articles</span>
                </MenuItem>

        <MenuItem open={menuOpen} onClick={() => {setActivePage("allreviewers");window.scroll(0,0)}} style={{background:activePage==='allreviewers'?'#005A93':''}}>
          <FaUsers /> <span>All Reviewers</span>
        </MenuItem>

        <MenuItem open={menuOpen} onClick={() => {setActivePage("register");window.scroll(0,0)}} style={{background:activePage==='register'?'#005A93':''}}>
          <FaRegAddressBook /> <span>Register an Editor</span>
        </MenuItem>

        <MenuItem open={menuOpen} onClick={handleLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </MenuItem>
      </Sidebar>

      <ContentContainer open={menuOpen}>
        {activePage === "profile" && <EditorProfile  setActivePage={setActivePage} />}
        {activePage === "submission" && <AllSubmittedManuscripts/>}
        {activePage === "register" && <EditorSignUp/>}
        {activePage === "allreviewers" && <AllReviewers/>}
        {activePage === "searchmanuscripts" && <SearchComponent setActivePage={setActivePage}/>}
        {activePage === "publisharticle" && <PublishArticle setActivePage={setActivePage}/>}
        {activePage === "publishedarticles" && <PublishedArticles/>}
        {activePage === "manageconference" && <ManageConferences  setActivePage={setActivePage}/>}

      </ContentContainer>
    </DashboardContainer>
  );
};

export default EditorDashboard;
