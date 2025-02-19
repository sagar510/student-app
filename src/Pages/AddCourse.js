
import { useState,useEffect } from 'react';
import { getToken } from '../auth';
import Base from '../Components/Base';
import {
    Typography,
    TextField,
    Button,
    Container,
    Box,
  } from '@mui/material';
  import { toast,ToastContainer } from 'react-toastify';


function AddCourse() {

    const [course_name,setfname] = useState("");
    const [duration,setlname] = useState("");
    const baseUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async(e) => {
        e.preventDefault();

        const postData = {course_name,duration: parseInt(duration, 10)};
      
        try {
        const response = await fetch(`${baseUrl}/createcourse`,{
        
            method: "POST",
            headers:{
                "content-type": "application/json",
                //Authorization: `Bearer ${getToken}`
            },
            body: JSON.stringify(postData),
    
        });

        if(response.ok){
            console.log("Things are good");    
            console.log(response);
            alert('Data Submitted Sucessfully');
            
            setfname("");
            setlname("");
        }else{
            console.log("Error Ocurred");
        }

      } catch (error) {
        console.error("An error occurred while submitting data:", error);
    }
    
    }

    return (
        <Base>
        <Container maxWidth="sm">
            <h1>Add a new Course</h1>
            <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <TextField
              label="Course Name"
              fullWidth
              variant="outlined"
              value={course_name}
              onChange={(e) => setfname(e.target.value)}
              required
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Duration in Months"
              fullWidth
              variant="outlined"
              value={duration}
              onChange={(e) => setlname(e.target.value)}
              required
            />
          </Box>
         
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
        </Container>
        </Base>
    );
}

export default AddCourse;