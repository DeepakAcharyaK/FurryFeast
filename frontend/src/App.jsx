import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AddDonations from './pages/AddDonations';
import AddResues from './pages/AddResues';
import Landing from './pages/Landing';
import Settings from './pages/settings';
import ViewAdoptPets from './pages/ViewAdoptPets';
import ViewGallery from './pages/ViewGallery';
import ViewVeterinary from './pages/ViewVeterinary';
import PetDetails from './pages/PetDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoutes from './components/ProtectedRoutes';
import Profile from './pages/Profile';

function App() {
  const [isloggedin, setIsloggedin] = useState(localStorage.getItem('isloggedin') === 'true');
  const [userid, setuserid] = useState(localStorage.getItem('userid') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    setIsloggedin(localStorage.getItem('isloggedin') === 'true');
    setuserid(localStorage.getItem('userid') || '');
    setRole(localStorage.getItem('role') || '');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!isloggedin ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={<Login setIsloggedin={setIsloggedin} setRole={setRole} />}
            />
            <Route path="/signup" element={<Signup setuserid={setuserid} />} />
          </>
        ) : (
          <Route element={<ProtectedRoutes />}>
            <Route path="/:userid" element={<Landing />} />
            <Route path="/login" element={<Navigate to={`/${userid}`} />} />
            <Route path="/signup" element={<Navigate to={`/${userid}`} />} />

            {role !== 'admin' && (
              <>
                <Route path="/user/:userid/make-a-donation" element={<AddDonations />} />
                <Route path="/user/:userid/view-gallery" element={<ViewGallery />} />
                <Route path="/user/:userid/pets/rescue" element={<AddResues />} />
                <Route path="/user/:userid/adopt/pets" element={<ViewAdoptPets />} />
                <Route path="/user/:userid/view-veterinary" element={<ViewVeterinary />} />
                <Route path="/user/:userid/adopt/pets/petdetails/:id" element={<PetDetails />} />
                <Route path="/user/:userid/profile/settings" element={<Settings />} />
              </>
            )}
          </Route>
        )}
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


