import React from "react";
import { Toolbar, Typography} from "@mui/material";


const AdminHeader = () => {
  return (
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>

      </Toolbar>
  );
};

export default AdminHeader;
