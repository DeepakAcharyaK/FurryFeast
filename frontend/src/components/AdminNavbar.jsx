import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
//import LogoutIcon from '@mui/icons-material/Logout';

const AdminNavbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'black', // Set AppBar background to black
        color: 'red', // Set text color to red
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, color: 'red' }} // Red color for the title
        >
          Admin Dashboard
        </Typography>
        {/*<InputBase
          placeholder="Search..."
          sx={{
            backgroundColor: '#fff', // White background for input box
            borderRadius: '4px', // Rounded corners
            padding: '2px 10px',
            marginRight: 2,
            color: 'black', // Black text inside the search box
          }}
        />*/}
        {/*<IconButton 
          color="inherit" 
          sx={{ color: 'red' }} // Red color for icons
        >
          <SearchIcon />
        </IconButton>
        {/*<IconButton color="inherit">
          <LogoutIcon />
        </IconButton>*/}
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
