import React, { Component, useEffect, useState } from "react";
import { Box, maxWidth } from "@mui/system";
import UserTable from "./Components/UserTable/UserTable";
import { Routes, Route } from "react-router-dom";
import UserDetailsTable from "./Components/UserDetailsTable/UserDetailsTable";

import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import axios from "axios";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees"
      )
      .then((res) => setUserInfo(res.data));
  }, []);

  console.log(value);
  const newUser = userInfo.filter((user) =>
    user.first_name.toLowerCase().includes(value.toLowerCase())
  );

  const handleSearch = (e) => {
    setValue(e.target.value);
  };
  return (
    <Box sx={{ maxWidth: "1540px", padding: "15px" }}>
      <Box
        sx={{
          marginTop: "12px",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          value={value}
          onChange={handleSearch}
          id="input-with-icon-textfield"
          label="Search by name"
          InputProps={{
            startAdornment: (
              <SearchIcon position="start">
                <AccountCircle />
              </SearchIcon>
            ),
          }}
          variant="standard"
        />
        <Button variant="outlined">
          {" "}
          <SearchIcon position="start" /> Search
        </Button>
      </Box>
      <Routes>
        <Route path="/" element={<UserTable newUser={newUser} />} />
        <Route path="/userDetails/:id" element={<UserDetailsTable />} />
      </Routes>
    </Box>
  );
}

export default App;
