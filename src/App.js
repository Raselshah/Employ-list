import React, { Component } from "react";
import { Box, maxWidth } from "@mui/system";
import UserTable from "./Components/UserTable/UserTable";
import AllUserTable from "./Components/AllUserTable/AllUserTable";
import { Routes, Route } from "react-router-dom";
import UserDetailsTable from "./Components/UserDetailsTable/UserDetailsTable";

function App() {
  return (
    <Box sx={{ maxWidth: "1540px", padding: "15px" }}>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/userDetails/:id" element={<UserDetailsTable />} />
      </Routes>
    </Box>
  );
}

export default App;
