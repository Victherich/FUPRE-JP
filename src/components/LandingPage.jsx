

import React from 'react'
import Header from './Header'
import Hero from './Hero'
import AboutFeature from './AboutFeature'
import Issues from './Issues'
import EditorialBoard from './EditorialBoard'
import Submit from './Submit'
import Testimonials from './Testimonial'
import CTA from './CTA'
import Footer from './Footer'
import styled from 'styled-components'
import Sidebar from './SideBar'
import JournalIntro from './Intro'
import PublishingPolicyIntro from './PublishingPolicyIntroComponent'
import Gallery from './Gallery'
import p12 from '../Images/p12.jpg'
import Scope from './Scope'





const LandingPage = () => {

const Div1 = styled.div`
display:flex;
justify-content:center;
width:100%;

`

const Div2 = styled.div`
width:25%;

@media(max-width:768px){
  display:none;
}

`

const Div3 = styled.div`
  width:75%;
@media(max-width:768px){
  width:100%;
}
`


  return (
    <div>
      <Hero/>
 <Div1>

<Div2>
<Sidebar/>
</Div2>

<Div3>
<JournalIntro/>
<AboutFeature/>
{/* <EditorialBoard/> */}
<Submit/>

</Div3>



</Div1>
<img src={p12} alt='p12' style={{width:"100%"}}/>
<Testimonials/>
<Scope/>
<Gallery/>

<PublishingPolicyIntro/>
    </div>
   
  )
}

export default LandingPage

