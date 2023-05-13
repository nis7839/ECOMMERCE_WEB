import React from 'react'
import "./aboutSection.css";
// import "./images";
const About = () => {
  return (
<div class="responsive-container-block outer-container">
  <div class="responsive-container-block inner-container">
    <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-4 wk-ipadp-5 content-container">
      <div class="content-box">
        <p class="text-blk section-head">
          Our Team
        </p>
        <p class="text-blk section-body">
          {/* Meet our team. */}
        </p>
      </div>
    </div>
    <div class="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-8 team-cards-outer-container">
      <div class="responsive-container-block team-cards-inner-container">
        <div class="responsive-cell-block wk-mobile-12 wk-ipadp-10 wk-tab-8 wk-desk-6 card-container">
          <div class="card">
            <div class="img-box">
              <img class="person-img" alt="" src={require("./images/Nishant.png")}/>
            </div>
            <div class="card-content-box">
              <p class="text-blk person-name">
                Nishant Mishra
              </p>
              <p class="text-blk person-info">
                Full Stack Developer
              </p>
            </div>
          </div>
        </div>
        <div class="responsive-cell-block wk-mobile-12 wk-ipadp-10 wk-tab-8 wk-desk-6 card-container">
          <div class="card">
            <div class="img-box">
              <img class="person-img" alt="" src={require("./images/satish.jpg")}/>
            </div>
            <div class="card-content-box">
              <p class="text-blk person-name">
                Satish Patel
              </p>
              <p class="text-blk person-info">
                Front-End Developer
              </p>
            </div>
          </div>
        </div>
        <div class="responsive-cell-block wk-mobile-12 wk-ipadp-10 wk-tab-8 wk-desk-6 card-container">
          <div class="card">
            <div class="img-box">
              <img class="person-img" alt="" src={require("./images/raghvendra.png")}/>
            </div>
            <div class="card-content-box">
              <p class="text-blk person-name">
                Raghvendra Pratap Verma
              </p>
              <p class="text-blk person-info">
                QA Engineer
              </p>
            </div>
          </div>
        </div>

        <div class="responsive-cell-block wk-mobile-12 wk-ipadp-10 wk-tab-8 wk-desk-6 card-container">
          <div class="card">
            <div class="img-box">
              <img class="person-img" alt="" src={require("./images/Vanshika.png")}/>
            </div>
            <div class="card-content-box">
              <p class="text-blk person-name">
                Vanshika Singh
              </p>
              <p class="text-blk person-info">
                Front-End Developer
              </p>
            </div>
          </div>
        </div>
        
        <div class="responsive-cell-block wk-mobile-12 wk-ipadp-10 wk-tab-8 wk-desk-6 card-container">
          <div class="card">
            <div class="img-box">
              <img class="person-img" alt="" src={require("./images/Rishab.png")}/>
            </div>
            <div class="card-content-box">
              <p class="text-blk person-name">
                Rishabh Mishra
              </p>
              <p class="text-blk person-info">
                QA Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default About