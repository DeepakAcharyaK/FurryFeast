import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddDonations from './pages/AddDonations';
import AddResues from './pages/AddResues';   
import Landing from './pages/Landing';
import Settings from './pages/settings';
import ViewAdoptPets from './pages/ViewAdoptPets';
import ViewGallery from './pages/ViewGallery';
import ViewVeterinary from './pages/ViewVeterinary';
import PetDetails from './pages/PetDetails';
// import ViewWorks from './pages/ViewWorks';


function App() {  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/adddonations' element={<AddDonations/>}/>
          <Route path='/viewgallery' element={<ViewGallery/>}/>
          <Route path='/addresues' element={<AddResues/>}/>
          <Route path='/viewadoptpets' element={<ViewAdoptPets/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/petdetails/:id' element={<PetDetails/>}/>
          <Route path='/viewveterinary' element={<ViewVeterinary/>}/>
          {/* <Route path='/viewworks' element={<ViewWorks/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App



