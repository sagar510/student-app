import React, { useEffect, useState } from "react";
import { getToken } from "../auth";
import Base from "../Components/Base";
import NavBar from "../NavBar";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import '../App.css';
import { toast,ToastContainer } from "react-toastify";

function Profile() {

  const [data, setdata] = useState({});
  const [name, setname] = useState("");
  const navigate = useNavigate();

  console.log(data);     

  useEffect(() => {
    fetch(
      `http://localhost:3000/viewprofile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
       if (data.role === "admin") setname(data.admin.admin_name);
        else if (data.role === "student") setname(data.student.student_name);
        else if (data.role === "teacher") setname(data.teacher.teacher_name);
      });
  }, []);

  console.log(data);

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const postData = { name };

    const response = await fetch(`http://localhost:3000/updateprofile`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      toast.success('Updated');
      console.log("Things are good");
     
    } else {
      toast.error(response.statusText);
      console.log("Error Occurred");
    }
  };

  return (
    <Base>
      <Container component="main" maxWidth="xs">
        <div className="App">
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Email: {data.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>Role: {data.role}</Typography>
              </Grid>
              {(data.role === "student" || data.role === "teacher") && (
                <Grid item xs={12}>
                  <Typography>Created By: {
                   data.role === "teacher" && 
                  data.teacher.admin.admin_name
                  }
                  {
                  data.role === "student" && 
                  data.student.admin.admin_name
                  }</Typography>
                </Grid>
              )}
            </Grid>
            <div className='row'>
              <Link to="/change_password">
                <Button variant="contained" color="primary">
                  Change Password
                </Button>
              </Link>
              <Button variant="contained" color="primary" onClick={handleSubmit2}>
                Update
              </Button>
            </div>
          </form>
          <ToastContainer autoClose={4000} />
        </div>
      </Container>
    </Base>
  );
}

export default Profile;
