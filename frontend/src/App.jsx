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
  const [isloggedin, setIsloggedin] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isloggedin') === 'true';
    const userRole = localStorage.getItem('role');
    setIsloggedin(loggedIn);
    setRole(userRole);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!isloggedin ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <Route element={<ProtectedRoutes isloggedin={isloggedin} />}>
              <Route path="/:userid" element={<Landing />} />
              <Route path="/login" element={<Navigate to="/:userid" />} />
              <Route path="/signup" element={<Navigate to="/:userid" />} />
              {role !== 'admin' && (
                <>
                  <Route path="/adddonations" element={<AddDonations />} />
                  <Route path="/viewgallery" element={<ViewGallery />} />
                  <Route path="/addresues" element={<AddResues />} />
                  <Route path="/viewadoptpets" element={<ViewAdoptPets />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/petdetails/:id" element={<PetDetails />} />
                  <Route path="/viewveterinary" element={<ViewVeterinary />} />
                </>
              )}
            </Route>
          )}
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



