import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import '../stylesheets/Landing.css';
import '../App.css';
import Footer from '../components/Footer';
import gsap from 'gsap';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Tooltip,
  Grid
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';

function Landing({ mode }) {
  const navigate=useNavigate();
  const {userid}=useParams()
  return (
    <div className="landing-container">
      <Navbar mode={mode} />
      <Maincontainer />
      {/* <Works /> */}
      <Gallery navigate={navigate} userid={userid}/>
      <Veterinery navigate={navigate} userid={userid}/>
      <Footer />
    </div>
  );
}

function Maincontainer() {
  const img = useRef();

  const handleMouseOver = (event) => {
    gsap.to(img.current, {
      left: `${event.clientX}`,
      top: `${event.clientY}`,
      duration: 1,
      delay: 0.5,
    });
  };

  return (
    <div onMouseOver={handleMouseOver} className="page flex main-content image-props">
      <img ref={img} src="/images/dog.jpeg" alt="dog" />
      <h1>
        <span className="orange">FurryFeast</span> <br />
        <span style={{ color: 'white' }}>YOUR BRAND</span>
      </h1>
      <p>
        Celebrating the Joy of <span className="bold"> Pets</span>
      </p>
      <button className="plan-button">Pick Your Plan</button>
    </div>
  );
}

// function Works() {
//   const [works, setWorks] = useState([]);

//   useEffect(() => {
//     const fetchWorks = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000//works?limit=3'); // Fetch 3 items from works collection
//         setWorks(response.data);
//       } catch (error) {
//         console.error('Error fetching works:', error);
//       }
//     };
//     fetchWorks();
//   }, []);

//   return (
//     <div id="works" className="main-container">
//       <header className="header flex">
//         <div className="logo">Companionship </div>
//         <div className="icon">Care </div>
//         <div className="menu">Joy</div>
//       </header>

//       <div className="work-section">
//         <h1 className="work-title">(WORKS)</h1>
//         <div className="work-details">
//           <span>(2000-2024)</span>
//           <span>({works.length})</span>
//           <a href="#view-all" className="view-all">
//             View all
//           </a>
//         </div>

//         <div className="work-grid">
//           {works.map((work, index) => (
//             <div className="work-card" key={index}>
//               <img src={work.image} alt={work.title} />
//               <h3>{work.title}</h3>
//               <p>{work.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

function Gallery({navigate,userid}) {

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/gallery'); // Fetch gallery collection
        setGallery(response.data.gallery);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };
    fetchGallery();
  }, []);

  function throttle(mainFunction, delay) {
    let timerFlag = null;

    return (...args) => {
      if (timerFlag === null) {
        mainFunction(...args);
        timerFlag = setTimeout(() => {
          timerFlag = null;
        }, delay);
      }
    };
  }

  return (
    <div className="page flex" id="gallery">
      <h1 className="work-title head">(Gallery)</h1>
      <div className="work-details">

       <Typography sx={{cursor:'pointer'}} onClick={()=>navigate(`/user/${userid}/view-gallery`)}>view all</Typography>

      </div>
      <div
        className="land-gallery flex"
        onMouseMove={throttle((event) => {
          if (gallery.length > 0) {
            const randomIndex = Math.floor(Math.random() * gallery.length);
            const randomImage = gallery[randomIndex].image;

            const newElement = document.createElement('img');
            newElement.setAttribute('src', randomImage);
            newElement.style.position = 'absolute';
            newElement.style.height = '300px';
            newElement.style.width = '200px';
            newElement.style.objectFit = 'cover';
            newElement.style.objectPosition = 'center';

            newElement.style.top = `${event.clientY}px`;
            newElement.style.left = `${event.clientX}px`;

            event.target.appendChild(newElement);

            setTimeout(() => {
              newElement.remove();
            }, 5000);
          }
        }, 600)}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <h1 className='stroke'> <span style={{fontSize:'3em'}}>Are you want to see the gallery?</span>  <br />then <br />move the mouse here...</h1>
      </div>
    </div>
  );
}

function Veterinery({navigate,userid}) {
  const [veterinery, setVeterinery] = useState([]);

  useEffect(() => {
    const fetchVeterinery = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/user/viewveterinary?limit=3'
        ); // Fetch 3 items from veterinary collection
        setVeterinery(response.data.data);
      } catch (error) {
        console.error('Error fetching veterinary data:', error);
      }
    };
    fetchVeterinery();
  }, []);

  return (
    <div className="page flex" style={{backgroundColor:''}} id="gallery">
      <h1 className="work-title head">(Veterinery)</h1>
      <div className="work-details">
        <Typography sx={{cursor:'pointer'}} onClick={()=>navigate(`/user/${userid}/view-veterinary`)}>view all</Typography>
      </div>
      
      <Grid container direction="column" spacing={3} sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        padding:'16px'
      }}>
        {veterinery.map((vet, index) => (
          <Grid item key={index}>
            <Card
              sx={{
                boxShadow: 4,
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={3}>
                  <Avatar
                    sx={{
                      bgcolor: '#1976d2',
                      mr: 2,
                      width: 64,
                      height: 64,
                      fontSize: 24,
                    }}
                  >
                    {vet.name.charAt(0)}
                  </Avatar>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {vet.name}
                  </Typography>
                </Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Clinic:</strong> {vet.clinicName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Contact:</strong> {vet.contact}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Address:</strong> {vet.clinicAddress}
                </Typography>
                <Box my={2}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Specializations:</strong>
                  </Typography>
                  {vet.specialization.map((specialization, index) => (
                    <Chip
                      key={index}
                      label={specialization}
                      color="primary"
                      variant="outlined"
                      sx={{
                        mr: 1,
                        mb: 1,
                        fontWeight: 'bold',
                        backgroundColor: '#e3f2fd',
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Availability:</strong> {vet.availability}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Landing;

