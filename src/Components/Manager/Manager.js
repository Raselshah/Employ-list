import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import axios from "axios";

const Manager = () => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees"
      )
      .then((res) => setUserInfo(res.data));
  }, []);

  const id = [];
  userInfo.filter((user) =>
    user.manager_id.length > 1 ? id.push(user.manager_id) : ""
  );

  let managers = [];
  userInfo.filter((user) =>
    user.manager_id.length > 0 ? managers.push(user) : ""
  );

  const formatedData = [];

  managers.forEach((employe) => {
    let id = employe.id;
    console.log(id);
    const herEmployes = userInfo.filter((employe) => employe.manager_id === id);
    if (herEmployes.length) {
      const empWmanager = { ...employe, herEmployes };
      formatedData.push(empWmanager);
    }
  });

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box sx={{ maxWidth: "1540px", padding: "15px" }}>
      {formatedData.map((user) => (
        <>
          <Accordion
            expanded={expanded === user.id}
            onChange={handleChange(user.id)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{user.first_name}</Typography>
            </AccordionSummary>
            {user.herEmployes.map((e) => (
              <AccordionDetails>
                <Typography>{e.first_name}</Typography>
              </AccordionDetails>
            ))}
          </Accordion>
        </>
      ))}
    </Box>
  );
};

export default Manager;
