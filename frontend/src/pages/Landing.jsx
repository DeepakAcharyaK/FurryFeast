import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import '../stylesheets/Landing.css'
import '../App.css'
import Footer from '../components/Footer'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function Landing({mode}) {
  return (
    <div className='landing-container'>
      <Navbar mode={mode}/>
      <Maincontainer/>
      <Works/>
      <Gallery/>
      <Veterinery/>
      <Footer/>
    </div>
  )
}



function Maincontainer() {
  const img=useRef()

  const handleMouseOver = (event) => {
      gsap.to(img.current,{
        left:`${event.clientX}`,
        top:`${event.clientY}`,
        duration:1,
        delay:0.5
      })
  };

  return (
    <div onMouseOver={handleMouseOver} className="page main-content image-props">
      <img ref={img} src="/images/dog.jpeg" alt="dog"/>
      <h1>
        <span className="orange">FurryFeast</span> <br />
        <span style={{ color: "white" }}>YOUR BRAND</span>
      </h1>
      <p>
        Celebrating the Joy of <span className="bold"> Pets</span>
      </p>
      <button className="plan-button">Pick Your Plan</button>
    </div>
  );
}


function Works(){

  useGSAP(()=>{

    const tl=gsap.timeline()

    tl.from('.logo',{
      opacity:0,
      delay:.5,
      duration:2
    })

    tl.from('.work-title',{
      opacity:0,
      delay:.5,
      duration:2
    })
  })

  return (
    <div id='works' className="main-container">
      <header className="header">
        <div className="logo">Companionship </div>
        <div className="icon">Care </div>
        <div className="menu">Joy</div>
      </header>

      <div className="work-section">
        <h1 className="work-title">(WORKS)</h1>
        <div className="work-details">
          <span>(2000-2024)</span>
          <span>(15)</span>
          <a href="#view-all" className="view-all">View all</a>
        </div>

        <div className="work-grid">
          <div className="work-card">
            <img src="https://www.mlive.com/resizer/v2/https%3A%2F%2Fadvancelocal-adapter-image-uploads.s3.amazonaws.com%2Fexpo.advance.net%2Fimg%2F7452af10cc%2Fwidth2048%2Fb82_bbis15.jpeg?auth=10f5bef0b617cb5516093e88cdde8d2c745312aeca948dc7726685e2e5251821&width=1280&quality=90" alt="Austrian Valley" />
            <h3>Austrian Valley: The Warcraft Quest</h3>
            <p>VR Experience</p>
          </div>

          <div className="work-card">
            <img src="https://www.mlive.com/resizer/v2/https%3A%2F%2Fadvancelocal-adapter-image-uploads.s3.amazonaws.com%2Fexpo.advance.net%2Fimg%2Fbcab783a96%2Fwidth2048%2F657_bbis20.jpeg?auth=1b0d843b39ae99073c7d962f01cc4c77800a080ff111a01a0c88bd7aa8cc161c&width=1280&quality=90" alt="The Last Frontier" />
            <h3>The Last Frontier: Wings of Adventure</h3>
            <p>VR Experience</p>
          </div>

          <div className="work-card">
            <img src="https://www.mlive.com/resizer/v2/https%3A%2F%2Fadvancelocal-adapter-image-uploads.s3.amazonaws.com%2Fexpo.advance.net%2Fimg%2F66fa298913%2Fwidth2048%2F1a5_bbis22.jpeg?auth=bf6b160bfa194ef71bec68e10075ab9bd672a14a3a73d55377e083e2ed487404&width=1280&quality=90" alt="Zen Quest" />
            <h3>Zen Quest: Peaks of Tranquility</h3>
            <p>Action-Adventure Game</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Gallery(){

  function throttle(mainFunction, delay) {
    let timerFlag = null; // Variable to keep track of the timer
  
    // Returning a throttled version 
    return (...args) => {
      if (timerFlag === null) { // If there is no timer currently running
        mainFunction(...args); // Execute the main function 
        timerFlag = setTimeout(() => { // Set a timer to clear the timerFlag after the specified delay
          timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
        }, delay);
      }
    };
  }
  

 return (
    <div className="page" id="gallery">
      <div
        className="land-gallery"
        onMouseMove={throttle((event) => {
          // Create a new element
          const newElement = document.createElement("img");
          newElement.setAttribute('src','/images/dog.jpeg')
          newElement.style.position = "absolute";
          newElement.style.width = "100px";
          newElement.style.top = `${event.clientY}px`;
          newElement.style.left = `${event.clientX}px`;

          // Append the new element to the target
          event.target.appendChild(newElement);

          setTimeout(() => {
            newElement.remove()
          }, 5000);
        }, 300)}
        style={{ position: "relative", overflow: "hidden" }}
      >

        
      </div>
    </div>
  );
}

function Veterinery(){
  return(
    <div className="page " id='veterinery'>
        <h1>veterinery</h1>
    </div>
  )
}

export default Landing
