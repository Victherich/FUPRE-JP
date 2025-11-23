import React from 'react'
import { createContext , useState} from 'react'
import { 
    FaBook, FaFlask, FaHistory, FaNewspaper, FaAngleDown, FaAngleRight,
    FaHeartbeat, FaGraduationCap, FaLeaf, FaRobot, FaBrain, FaSatellite,
    FaTools, FaPalette, FaBalanceScale, FaUsers, FaGavel, FaFutbol,
    FaMusic, FaUtensils, FaGlobe, FaDragon, FaSeedling, FaSkullCrossbones, 
    FaRecycle, FaShieldAlt, FaGlobeAmericas,
    FaFolderOpen, FaIndustry, FaWater
  } from "react-icons/fa";


export const Context = createContext();

const ContextProvider = ({children}) => {

const categories = [
    { id: 0, name: "All Publications", icon: <FaFolderOpen /> }, // general folder
    { id: 1, name: "All fields of General Science", icon: <FaFlask /> }, // science/lab
    { id: 2, name: "Developments of the Petroleum industry", icon: <FaIndustry /> }, // industry/petro
    { id: 3, name: "Monitoring and Management", icon: <FaWater /> }, // environmental/monitoring
    { id: 4, name: "Green and sustainable energy", icon: <FaLeaf /> }, // sustainability/green energy
];

const status = [
  
  {id:1, name:"submitted"},
  {id:2, name:"assigned for reveiw"},
  {id:3, name:"under review"},
  {id:4, name:"reviewed"},
  {id:5, name:"accepted"},
  {id:6, name:"published"},
  {id:7, name:"rejected"}
]

const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Context.Provider value={{categories,status,mobileMenuOpen, setMobileMenuOpen}}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider



// database

// pw: SBD@2025
// User: ajgajournal_ajgajournal
// Database: ajgajournal_ajgajournal
