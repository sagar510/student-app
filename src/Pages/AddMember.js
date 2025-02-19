import React, { useState } from 'react';
import { getToken } from '../auth';
import Base from '../Components/Base';
import {
  Typography,
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMember() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { name, email, password, role };
    const baseUrl = process.env.REACT_APP_API_URL;

    const response = await fetch(`${baseUrl}/createuserandmember`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {

      toast.success('Action successful!');
        
      console.log('Things are good');
      console.log(response);
      
      setname('');
      setemail('');
      setpassword('');
      setrole('');
    } else {
      toast.error(response.statusText);
      console.log('Error Occurred');
    }
  };

  return (
    <Base>
      <Container maxWidth="md">
        <h2>Add a new Member</h2>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </Box>
          <Box mt={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                onChange={(e) => setrole(e.target.value)}
                label="Role"
              >
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
        <ToastContainer autoClose={4000} />
      </Container>
    </Base>
  );
}

export default AddMember;
