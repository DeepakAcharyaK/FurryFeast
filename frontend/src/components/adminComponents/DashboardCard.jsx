import { Paper, Typography, IconButton, Box } from "@mui/material";

const DashboardCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      p: 3,
      borderLeft: `4px solid ${color}`,
    }}
  >
    <Box>
      <Typography variant="h6">{value}</Typography>
      <Typography variant="subtitle1">{title}</Typography>
    </Box>
    <IconButton sx={{ color }}>{icon}</IconButton>
  </Paper>
);

export default DashboardCard;
