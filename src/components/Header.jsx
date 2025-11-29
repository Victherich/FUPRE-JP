


// import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { FaUserCircle } from "react-icons/fa";
// import logo from "../Images/logo.png";

// const HeaderContainer = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 15px 30px;
//   background: rgba(0, 0, 0, 0.7);
//   position: fixed;
//   width: 100%;
//   top: 0;
//   z-index: 1000;
// `;

// const LogoWrap = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   cursor: pointer;

//   img {
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//   }
// `;

// const Logo = styled.h1`
//   font-size: 24px;
//   font-weight: bold;
//   font-style: italic;
//   font-family: "Brush Script MT", "Brush Script Std", cursive;
//   color: white;
//   cursor: pointer;
// `;

// const Nav = styled.nav`
//   display: flex;
//   gap: 20px;

//   @media (max-width: 768px) {
//     gap: 15px;
//   }
// `;

// const NavLink = styled.a`
//   color: white;
//   text-decoration: none;
//   font-size: 0.8rem;
//   cursor: pointer;
//   padding: 5px 10px;
//   border-radius: 5px;
//   transition: 0.3s;
  
//   ${(props) =>
//     props.active
//       ? "background-color: white; color: black;"
//       : "&:hover { background-color: rgba(255, 255, 255, 0.2); }"}
// `;

// // Role Selector Dropdown
// const RoleSelector = styled.div`
//   position: relative;
// `;

// const RoleButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   background: none;
//   border: none;
//   color: white;
//   font-size: 0.9rem;
//   cursor: pointer;
//   padding: 5px;
// `;

// const DropdownMenu = styled.ul`
//   position: absolute;
//   top: 35px;
//   right: 0;
//   background: white;
//   color: black;
//   list-style: none;
//   padding: 10px;
//   border-radius: 5px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//   display: ${(props) => (props.show ? "block" : "none")};
// `;

// const DropdownItem = styled.li`
//   padding: 8px 12px;
//   cursor: pointer;
//   transition: 0.3s;
//   font-size:0.8rem;

//   &:hover {
//     background: rgba(0,0,255,0.5);
//     color: white;
//   }
// `;

// const Header = () => {
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const menuRef = useRef();

//   const handleRoleSwitch = (role) => {
//     setShowDropdown(false);
//     if (role === "Author") {
//       navigate("/authordashboard");
//     } else if(role==="Reviewer"){
//       navigate('/reviewerdashboard');
//     }
//     else {
//       navigate("/editordashboard");
//     }
//   };




//   // Add event listener to detect clicks outside of SideCategoryMenu2
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//         if (menuRef.current && !menuRef.current.contains(event.target)) {
//             setShowDropdown(false); // Close the menu when clicking outside
//         }
//     };

//     if (showDropdown) {
//         document.addEventListener('mousedown', handleClickOutside);
//     } else {
//         document.removeEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//         document.removeEventListener('mousedown', handleClickOutside); // Clean up listener on component unmount
//     };
// }, [showDropdown, setShowDropdown]);


// //   // Add event listener to detect clicks outside of SideCategoryMenu2
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //         if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
// //             setMobileMenuSwitch(false); // Close the menu when clicking outside
// //         }
// //     };

// //     if (mobileMenuSwitch) {
// //         document.addEventListener('mousedown', handleClickOutside);
// //     } else {
// //         document.removeEventListener('mousedown', handleClickOutside);
// //     }

// //     return () => {
// //         document.removeEventListener('mousedown', handleClickOutside); // Clean up listener on component unmount
// //     };
// // }, [mobileMenuSwitch, setMobileMenuSwitch]);

//   return (
//     <HeaderContainer>
//       {/* Logo */}
//       <LogoWrap onClick={() => navigate("/")}>
//         <img src={logo} alt="logo" />
//         <Logo>AJGA</Logo>
//       </LogoWrap>

//       {/* Navigation Links */}
//       <Nav>
//         <NavLink onClick={() => navigate("/")} active={window.location.pathname === "/"}>
//           Home
//         </NavLink>
//         <NavLink onClick={() => navigate("/aboutus")} active={window.location.pathname === "/aboutus"}>
//           About Us
//         </NavLink>
//         <NavLink onClick={() => navigate("/issuesandpubs/0")} active={window.location.pathname === "/issuesandpubs"}>
//           Issues & Publications
//         </NavLink>
//         <NavLink onClick={() => navigate("/contactus")} active={window.location.pathname === "/contactus"}>
//           Contact Us
//         </NavLink>

//         {/* Role Switcher */}
//         <RoleSelector>
//           <RoleButton onMouseEnter={() => setShowDropdown(!showDropdown)} onClick={() => setShowDropdown(!showDropdown)}>
//             <FaUserCircle size={20} /> Dashboard
//           </RoleButton>
//           <DropdownMenu show={showDropdown} ref={menuRef}>
//             <DropdownItem onClick={() => handleRoleSwitch("Author")}>Author Dashboard</DropdownItem>
//             <DropdownItem onClick={() => handleRoleSwitch("Reviewer")}>Reviewer Dashboard</DropdownItem>
//             <DropdownItem onClick={() => handleRoleSwitch("Editor")}>Editor Dashboard</DropdownItem>
//           </DropdownMenu>
//         </RoleSelector>
//       </Nav>
//     </HeaderContainer>
//   );
// };

// export default Header;




import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from "../Images/logo.png";
import Sidebar from "./SideBar";
import { Context } from "./Context";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  // background: rgba(0, 0, 0, 0.7);
  background:rgba(114, 114, 141, 0.5);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 400;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  font-style: italic;
  // font-family: "Brush Script MT", "Brush Script Std", cursive;
  color: white;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${(props) => (props.open ? "flex" : "none")};
    position: absolute;
    top: 60px;
    right: 0;
    background: rgba(0, 0, 0, 0.9);
    width: 70%;
    height: calc(100vh - 60px);
    flex-direction: column;
    padding: 20px;
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
    overflow-y:scroll;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.3s;
  
  ${(props) =>
    props.active
      ? "background-color: white; color: black;"
      : "&:hover { background-color: rgba(255, 255, 255, 0.2); }"}
`;

const Hamburger = styled.div`
  display: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  z-index: 1100;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Role Selector Dropdown
const RoleSelector = styled.div`
  position: relative;
`;

const RoleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 5px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 35px;
  right: 0;
  background: white;
  color: black;
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.show ? "block" : "none")};
`;

const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.8rem;

  &:hover {
    background: rgba(0,0,255,0.5);
    color: white;
  }
`;


const Category = styled.div`
    display:none;

    @media(max-width:768px){
      display :block;
    }
`

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const {mobileMenuOpen, setMobileMenuOpen} = useContext(Context)
  const menuRef = useRef();
  const menuRef2 = useRef();

  const handleRoleSwitch = (role) => {
    setShowDropdown(false);
    setMobileMenuOpen(false);
    if (role === "Author") {
      navigate("/authordashboard");
    } else if (role === "Reviewer") {
      navigate("/reviewerdashboard");
    } else {
      navigate("/editordashboard");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDropdown(false); 
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, setShowDropdown]);




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef2.current && !menuRef2.current.contains(event.target)) {
        setMobileMenuOpen(false); 
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen, setMobileMenuOpen]);

  return (
    <HeaderContainer>
      {/* Logo */}
      <LogoWrap onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
        <Logo>FUPRE JP</Logo>
      </LogoWrap>

      {/* Hamburger Menu for Mobile */}
      <Hamburger onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>

      {/* Navigation Links */}
      <Nav open={mobileMenuOpen} ref={menuRef2}>
        <NavLink onClick={() => { navigate("/"); setMobileMenuOpen(false); }} active={window.location.pathname === "/"}>
          Home
        </NavLink>
        <NavLink onClick={() => { navigate("/aboutus"); setMobileMenuOpen(false); }} active={window.location.pathname === "/aboutus"}>
          About Us
        </NavLink>
         <NavLink onClick={() => { navigate("/foreward"); setMobileMenuOpen(false); }} active={window.location.pathname === "/foreward"}>
          Foreword
        </NavLink>
        <NavLink onClick={() => { navigate("/issuesandpubs/0"); setMobileMenuOpen(false); }} active={window.location.pathname.includes("issuesandpubs")}>
          Issues & Publications
        </NavLink>
        <NavLink onClick={() => { navigate("/publishingpolicy"); setMobileMenuOpen(false); }} active={window.location.pathname === "/publishingpolicy"}>
          Publishing Policy
        </NavLink>
 <NavLink onClick={() => { navigate("/conferences"); setMobileMenuOpen(false); }} active={window.location.pathname === "/conferences"}>
          Conferences
        </NavLink>

        <NavLink onClick={() => { navigate("/contactus"); setMobileMenuOpen(false); }} active={window.location.pathname === "/contactus"}>
          Contact Us
        </NavLink>

        {/* Role Switcher */}
        <RoleSelector>
          <RoleButton onClick={() => setShowDropdown(!showDropdown)} onMouseEnter={()=>setShowDropdown(true)}>
            <FaUserCircle size={20} /> Dashboard
          </RoleButton>
          <DropdownMenu show={showDropdown} ref={menuRef}>
            <DropdownItem onClick={() => handleRoleSwitch("Author")}>Author Dashboard</DropdownItem>
            <DropdownItem onClick={() => handleRoleSwitch("Reviewer")}>Reviewer Dashboard</DropdownItem>
            <DropdownItem onClick={() => handleRoleSwitch("Editor")}>Editor Dashboard</DropdownItem>
          </DropdownMenu>
        </RoleSelector>

        <Category>
        <Sidebar setMobileMenuOpen={setMobileMenuOpen}/>
        </Category>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
