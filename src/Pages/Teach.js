import React from 'react';
import {Container, List, ListItem, ListItemText, Button, Divider, Typography } from '@mui/material';
import Base from '../Components/Base';
import { useState,useEffect } from 'react';
import { getRoleID } from '../auth';
import { toast,ToastContainer } from 'react-toastify';


const CourseListTeacher = () => {

  const [data, setdata] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;
 
  useEffect(() => {
    fetch(
      `http://localhost:8080/viewcoursesteacher`, {
      method: "GET",
      /*headers: {
        "Authorization": `Bearer ${getToken()}`,
      },*/
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
      });
  }, []);

  
  console.log(data);


  const handleEnroll = async (e, courseId) => {
    e.preventDefault();
  
    const postData = {
      courseID: parseInt(courseId,10),
      teacherID: parseInt(getRoleID(),10),
    };
    const baseUrl = process.env.REACT_APP_API_URL;
  
    try {
      const response = await fetch("http://localhost:8080/teachcourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if needed
          // "Authorization": `Bearer ${getToken()}`,
        },
        body: JSON.stringify(postData),
      });
  
      if (response.ok) {
        toast.success("Enrollment successful");
        console.log("Enrollment successful");
      } else {
        // Use response.json() to get more details from the server
        const errorText = await response.text();
        toast.error(`Enrollment failed: ${errorText}`);
        console.log("Enrollment failed:", errorText);
      }
    } catch (error) {
      console.error("An error occurred while submitting data:", error);
    }
  };
  

  return (
    <Base>
        <Container maxWidth="md">
      <h2>
        Teach a new Course
      </h2>
      
      <List>
        {data.map((item) => (
          <div key={item.ID}>
            <ListItem>
              <ListItemText
                primary={item.Course_name}
                secondary={`Duration: ${item.Duration} months`}
              />
              <Button onClick={(e) => handleEnroll(e,item.ID)} variant="contained" color="primary">
                Enroll
              </Button>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      {<ToastContainer autoClose={4000} />}
      </Container>
    </Base>
  );
};

export default CourseListTeacher;
