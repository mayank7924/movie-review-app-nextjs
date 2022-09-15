import React from 'react'
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Paper sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
      component="footer"
      variant="outlined">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
            <Typography variant="caption">Mayank Srivastava, Copyright ©2022.</Typography>
        </Box>
      </Paper>
  )
}
