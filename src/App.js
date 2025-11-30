import logo from './Images/logo2.jpeg';
import './App.css';
import LandingPage from './components/LandingPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ArchivesPage from './components/ArchivesPage';
import Sidebar from './components/SideBar';
import ContactSupport from './components/Contactus';
import ScrollToTop from './components/ScrollToTop';
import PublishingPolicies from './components/PublishingPolicy';
import FallingLeaves from './components/EffectComponent';
import ShootingStars from './components/EffectComponent';
import FloatingBubbles from './components/EffectComponent';
import Raindrops from './components/RainEffects';
import AuthorDashboard from './components/AuthorDashboard';
import PrivateAuthorDashboard from './components/PrivateAuthorDashboard';
import AuthorLogin from './components/AuthorLogin';
import AuthorSignUp from './components/AuthorSignUp';
import AuthorEmailVerification from './components/AuthorEmailVerification';
import PrivateAuthorSignup from './components/PrivateAuthorSignup';
import PrivateAuthorLogin from './components/PrivateAuthorLogin';
import AuthorForgotPassword from './components/AuthorForgotPassword';
import AuthorResetPassword from './components/AuthorResetPassword';
import PrivateEditorDashboard from './components/PrivateEditorDashboard';
import EditorDashboard from './components/EditorDashboard';
import PrivateEditorSignup from './components/PrivateEditorSignup';
import EditorSignUp from './components/EditorSignUp';
import PrivateEditorLogin from './components/PrivateEditorLogin';
import EditorLogin from './components/EditorLogin';
import EditorForgotPassword from './components/EditorForgotPassword';
import EditorResetPassword from './components/EditorResetPassword';
import EditorEmailVerification from './components/EditorEmailVerification';
import PrivateReviewerDashboard from './components/PrivateReviewerDashboard';
import ReviewerDashboard from './components/ReviewerDashboard';
import PrivateReviewerSignup from './components/PrivateReviewerSignup';

import PrivateReviewerLogin from './components/PrivateReviewerLogin';
import ReviewerLogin from './components/ReviewerLogin';
import ReviewerForgotPassword from './components/ReviewerForgotPassword';
import ReviewerResetPassword from './components/ReviewerResetPassword';
import ReviewerEmailVerification from './components/ReviewerEmailVerification';
import ReviewerSignUp from './components/ReviewerSignup';
import PublicationDetail from './components/PublicationDetail';
import Fireflies from './components/RainEffects';
import ForewordPage from './components/ForewardPage';
import ConferencePage from './components/ConferencePage';
import logo3 from './Images/logo3.jpeg'



function App() {
  return (
   <BrowserRouter>
   <ScrollToTop/>
 {/* <ShootingStars/> */}
 <FloatingBubbles/>
 <Raindrops/>
 <Fireflies/>
   <Header/>
    <Routes>
      {/* public pages */}
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/issuesandpubs/:articleCategory' element={<ArchivesPage/>}/>
      <Route path="/contactus" element={<ContactSupport/>}/>
      <Route path='/publishingpolicy' element={<PublishingPolicies/>}/>
      <Route path='/publicationdetail/:id' element={<PublicationDetail/>}/>
      <Route path='/foreward' element={<ForewordPage/>}/>
      <Route path='/conferences' element={<ConferencePage/>}/>
  

{/* author pages */}
      <Route path='/authordashboard' element={<PrivateAuthorDashboard/>}>
        <Route path='' element={<AuthorDashboard/>}/>
      </Route>

      <Route path='/authorsignup' element={<PrivateAuthorSignup/>}>
        <Route path='' element={<AuthorSignUp/>}/>
      </Route>

      <Route path='/authorlogin' element={<PrivateAuthorLogin/>}>
        <Route path='' element={<AuthorLogin/>}/>
      </Route>
  
      <Route path='/authorverifyemail/:token' element={<AuthorEmailVerification/>}/>
      <Route path='/authorforgotpassword' element={<AuthorForgotPassword/>}/>
      <Route path='/author-reset-password/:token' element={<AuthorResetPassword/>}/>



      {/* editor pages */}

      <Route path='/editordashboard' element={<PrivateEditorDashboard/>}>
        <Route path='' element={<EditorDashboard/>}/>
      </Route>

      <Route path='/editorsignup' element={<PrivateEditorSignup/>}>
        <Route path='' element={<EditorSignUp/>}/>
      </Route>

      <Route path='/editorlogin' element={<PrivateEditorLogin/>}>
        <Route path='' element={<EditorLogin/>}/>
      </Route>
  
      <Route path='/editorverifyemail/:token' element={<EditorEmailVerification/>}/>
      <Route path='/editorforgotpassword' element={<EditorForgotPassword/>}/>
      <Route path='/editor-reset-password/:token' element={<EditorResetPassword/>}/>


{/* reviewer pages */}

<Route path='/reviewerdashboard' element={<PrivateReviewerDashboard/>}>
  <Route path='' element={<ReviewerDashboard/>}/>
</Route>

<Route path='/reviewersignup' element={<PrivateReviewerSignup/>}>
  <Route path='' element={<ReviewerSignUp/>}/>
</Route>

<Route path='/reviewerlogin' element={<PrivateReviewerLogin/>}>
  <Route path='' element={<ReviewerLogin/>}/>
</Route>

<Route path='/reviewerverifyemail/:token' element={<ReviewerEmailVerification/>}/>
<Route path='/reviewerforgotpassword' element={<ReviewerForgotPassword/>}/>
<Route path='/reviewer-reset-password/:token' element={<ReviewerResetPassword/>}/>





    </Routes>
    <a><img src={logo} alt="logo" className="WhatsAppIcon"/></a> 

     {/* <a><img src={logo3} alt="logo" className="WhatsAppIcon2"/></a>  */}
  
    <Footer/>
   </BrowserRouter>
  );
}

export default App;
