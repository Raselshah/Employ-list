import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetailsTable = () => {
  const [userInfoDetails, setUserInfoDetails] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/${id}`
      )
      .then((res) => setUserInfoDetails(res.data[0]));
  }, []);
  return (
    <div>
      <h4>First Name: {userInfoDetails.first_name}</h4>
      <h4>Last Name: {userInfoDetails.last_name}</h4>
      <h4>Data Of Birth: {userInfoDetails.date_of_birth}</h4>
      <h4>Address: {userInfoDetails.address}</h4>
      <h4>Date of Joining: {userInfoDetails.date_of_joining}</h4>
      <h4>Salary: {userInfoDetails.salary}</h4>
      <h4>Designation: {userInfoDetails.designation}</h4>
    </div>
  );
};

export default UserDetailsTable;
