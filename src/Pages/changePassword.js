import React, { useState } from 'react';
import { getToken } from '../auth';
import Base from '../Components/Base';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { toast,ToastContainer } from 'react-toastify';

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if(newPassword==confirmNewPassword){

    const putData = {
      password: currentPassword,
      new_password: newPassword,
    };

    const response = await fetch(`http://localhost:3000/updatepassword`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(putData),
    });

    if (response.ok) {
      console.log('Things are good');
      console.log(response);
      toast.success('Updated');
     //alert('Password Changed Successfully');

      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      console.log('Error Occurred');
    }
    }
    else{
      toast.info('New and Confirm didnot match');
    }
  };

  return (
    <Base>
      <Container maxWidth="sm">
        <Typography variant="h4">Change Password</Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Current Password"
                variant="outlined"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="New Password"
                variant="outlined"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Confirm New Password"
                variant="outlined"
                fullWidth
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePasswordChange}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer autoClose={4000} />
      </Container>
    </Base>
  );
};

export default PasswordChange;
