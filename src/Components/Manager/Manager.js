import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import MuiAccordion from "@mui/material/Accordion";

import { TreeView } from "@mui/lab";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import axios from "axios";
import Items from "../Items/Items";

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

  const useEmployes = (employes) => {
    const data = formateTheData(employes);
    if (data.length === 0) {
      return employes;
    }
    return useEmployes(data);
  };

  const formateTheData = (employes) => {
    const formatedData = [];

    userInfo.forEach((employe) => {
      const id = employe.id;
      const herEmployes = employes.filter(
        (employe) => employe.manager_id === id
      );
      if (herEmployes.length) {
        const empWmanager = { ...employe, herEmployes };
        formatedData.push(empWmanager);
      }
    });
    return formatedData;
  };

  const managersData = useEmployes(userInfo);
  if (managersData.length < 1) {
    return;
  }

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

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      sx={{ width: 500, flexGrow: 1, mx: "auto", mt: 3 }}
    >
      {managersData.map((manager) => (
        <Items key={manager.id} {...manager} />
      ))}
    </TreeView>
  );
};

export default Manager;
