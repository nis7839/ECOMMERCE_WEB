// import React from "react";
// import "./Contact.css";
// import { Button } from "@mui/material";

// const Contact = () => {
//   return (
//     <div className="contactContainer">
//       <a className="mailBtn" href="mailto:mishranishant@gmail.com">
//         <Button>Contact: mishranishant422@gmail.com</Button>
//       </a>
//     </div>
//   );
// };

// export default Contact;


import React from 'react'
import "./Contact.css";
const Contact = () => {

  
  return (
    
    <div id='browser'>
  <div id='browser-bar'>
    <div className='circles'></div>
    <div className='circles'></div>
    <div className='circles'></div>
    <p>Contact Us</p>
    <span className='arrow entypo-resize-full'></span>
  </div>
  <div id='content'>
    {/* <div id='left'>
      <div id='map'>
        <p>Where To Find Us</p>
        <div className='map-locator'>
          <div className='tooltip'>
            <ul>
              <li>
                <span className='entypo-location'></span>
                <a href="https://www.mapsofindia.com/"><span className='selectedLocation'>India</span></a>
              </li>
              <li>
                <span className='entypo-mail'></span>
                <a href="mailto:mishranishant@gmail.com">mishranishant422@gmail.com</a>
              </li>
              <li>
                <span className='entypo-phone'></span>
                (+917895548501)
              </li>
            </ul>
          </div>
        </div>
        <div className='zoom'></div>
      </div>
      <ul id='location-bar'>
        <li>
          <a className='location' data-location='India' href='https://www.mapsofindia.com/'>India</a>
        </li>
        <li>
          <a className='location' data-location='USA' href='https://mangomap.com/robertyoung/maps/87263/usa#'>USA</a>
        </li>
        <li>
          <a className='location' data-location='The Netherlands' href='https://f.cl.ly/items/0g0l283X3h1T3H270V0A/netherlands.png'>The Netherlands</a>
        </li>
        <li>
          <a className='location' data-location='Singapore' href='https://f.cl.ly/items/1i2Y262H020X141R3h0k/singapore.png'>Singapore</a>
        </li>
      </ul>
    </div> */}
    <div id='right'>
      <p>Connect</p>
      <div id='social'>
        {/* <a class='social'>
          <span class='entypo-facebook'></span>
        </a>
        <a class='social'>
          <span class='entypo-twitter'></span>
        </a> */}
        <a className='social' href='https://www.linkedin.com/in/7839'>
        <span className='entypo-linkedin'></span>
        </a>
        {/* <a class='social'>
          <span class='entypo-gplus'></span>
        </a> */}
        <a className='social' href='https://instagram.com/nisssh78?igshid=ZDdkNTZiNTM='>
         <span className='entypo-instagrem'></span>
        </a>
      </div>
      <form>
        <p>Get in Contact</p>
        <input placeholder='Email' type='email'/>
        <input placeholder='Subject' type='text'/>
        <textarea placeholder='Message' rows='4'></textarea>
       <a className='subm' href="mailto:mishranishant@gmail.com">Submit 
        </a>
        {/* <input placeholder='Send' type='submit'/ >   */}
        </form>

        
      <p>other way</p>
      <p className='other entypo-mail'>
        <a href="mailto:mishranishant@gmail.com">mishranishant422@gmail.com</a>
      </p>
      <p className='other entypo-phone'>(+917895548501</p>
    </div>
  </div>
</div>
// </Helmet>
  )
}

export default Contact