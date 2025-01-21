import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
  LinearProgress,
  Button,
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { styled } from "@mui/system";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import { GiMuscleUp, GiMeat } from "react-icons/gi";
import { IoStatsChartSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 280,
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    padding: theme.spacing(2)
  }
}));

const ProfileSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 0",
  borderBottom: "1px solid rgba(255,255,255,0.1)"
});

const ProgressSection = styled(Box)({
  padding: "20px 0",
  "& .MuiLinearProgress-root": {
    marginBottom: "15px",
    backgroundColor: "rgba(255,255,255,0.1)"
  }
});

const StyledListItem = styled(ListItem)({
  borderRadius: "8px",
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)"
  }
});

const ActionButton = styled(Button)({
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  backgroundColor: "#ff4757",
  "&:hover": {
    backgroundColor: "#ff6b81"
  }
});

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigationItems = [
    { text: "Dashboard", icon: <FiHome size={24} /> },
    { text: "Workouts", icon: <GiMuscleUp size={24} /> },
    { text: "Nutrition", icon: <GiMeat size={24} /> },
    { text: "Progress", icon: <IoStatsChartSharp size={24} /> },
    { text: "Settings", icon: <FiSettings size={24} /> }
  ];

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ProfileSection>
        <Avatar
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=120&h=120"
          sx={{ width: 80, height: 80, marginBottom: 2 }}
        />
        <Typography variant="h6">John Doe</Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
          Premium Member
        </Typography>
      </ProfileSection>

      <List sx={{ flex: 1, marginTop: 2 }}>
        {navigationItems.map((item) => (
          <StyledListItem button key={item.text}>
            <ListItemIcon sx={{ color: "#ffffff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>

      <ProgressSection>
        <Typography variant="subtitle2" gutterBottom>
          Weekly Workout Goal
        </Typography>
        <LinearProgress
          variant="determinate"
          value={75}
          sx={{ "& .MuiLinearProgress-bar": { backgroundColor: "#ff4757" } }}
        />

        <Typography variant="subtitle2" gutterBottom>
          Nutrition Goal
        </Typography>
        <LinearProgress
          variant="determinate"
          value={60}
          sx={{ "& .MuiLinearProgress-bar": { backgroundColor: "#2ed573" } }}
        />
      </ProgressSection>

      <ActionButton variant="contained" startIcon={<GiMuscleUp />}>
        Start Workout
      </ActionButton>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{ position: "fixed", top: 16, left: 16, color: "#ffffff" }}
          aria-label="toggle sidebar"
        >
          <RxHamburgerMenu size={24} />
        </IconButton>
      )}

      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawerContent}
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
