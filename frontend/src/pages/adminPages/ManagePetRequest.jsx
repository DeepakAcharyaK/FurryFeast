import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom TableCell styling for grid-like borders
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  textAlign: "center",
  padding: "10px",
  fontWeight: "bold",
}));

// Custom TableRow styling for grid-like layout
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ManagePetRequest = () => {
  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Manage Pet Dog
      </Typography>

      {/* Volunteer Data Table */}
      <TableContainer component={Paper} sx={{ mt: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
        <Table>
          {/* Table Header */}
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Request ID</StyledTableCell>
              <StyledTableCell>Request Name</StyledTableCell>
              <StyledTableCell>Contact</StyledTableCell>
              <StyledTableCell>Specific Requirements</StyledTableCell>
              <StyledTableCell>Request Status</StyledTableCell>
              <StyledTableCell>Request Date</StyledTableCell>
            </StyledTableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {/* Placeholder row for no data */}
            <StyledTableRow>
              <StyledTableCell colSpan={6} align="center">
                No data available.
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManagePetRequest;

