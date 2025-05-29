import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import {
  Pets as PetsIcon,
  PhotoLibrary as PhotoLibraryIcon,
  AttachMoney as AttachMoneyIcon,
  Vaccines as VaccinesIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { FaDog } from "react-icons/fa6";

const menuItems = [
  { text: "Home", icon:<FaHome style={{fontSize:25}}/>, path: "/adminDashboard" },
  { text: "Manage Rescue", icon: <PetsIcon />, path: "/manageRescue" },
  { text: "Manage Gallery", icon: <PhotoLibraryIcon />, path: "/adminGallery" },
  { text: "Manage Donation", icon: <AttachMoneyIcon />, path: "/Donations" },
  { text: "Manage Pet", icon:<FaDog style={{fontSize:25}} />, path: "/managePetDog" },
  { text: "Manage Pet Request", icon: <FaCodePullRequest />, path: "/managePetRequest" },
  { text: "Manage Vaccination", icon: <VaccinesIcon />, path: "/manageVaccination" },
  { text: "Manage Veterinary", icon: <FaBriefcaseMedical />, path: "/manageVeterinary" },
];

const drawerWidth = 240;

const Sidebar = ({ isOpen, variant = "persistent", onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant={variant}
      open={isOpen}
      onClose={onClose}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List style={{marginTop:"80px"}}>
        {menuItems.map((item, i) => (
          <ListItem button key={i} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
