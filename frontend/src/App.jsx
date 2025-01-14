import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddDonations from './pages/AddDonations';
import AddResues from './pages/AddResues';   
import Landing from './pages/Landing';
// import ManagePetRequest from './pages/ManagePetRequest';
import Settings from './pages/settings';
import ViewAdoptPets from './pages/ViewAdoptPets';
import ViewGallery from './pages/ViewGallery';
// import ViewVaccination from './pages/ViewVaccination';
// import ViewVeterinary from './pages/ViewVeterinary';
import ViewWorks from './pages/ViewWorks';


function App() {  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/adddonations' element={<AddDonations/>}/>
          <Route path='/viewgallery' element={<ViewGallery/>}/>
          <Route path='/addresues' element={<AddResues/>}/>
          {/* <Route path='/managepetrequest' element={<ManagePetRequest/>}/> */}
          <Route path='/viewadoptpets' element={<ViewAdoptPets/>}/>
          {/* <Route path='/viewvaccination' element={<ViewVaccination/>}/> */}
          {/* <Route path='/viewveterinary' element={<ViewVeterinary/>}/> */}
          <Route path='/viewworks' element={<ViewWorks/>}/>
          {/* <Route path='/settings' element={<Settings/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App



