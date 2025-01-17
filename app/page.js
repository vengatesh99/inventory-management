"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import { firestore } from "./firebase";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import theme from "../components/CustomTheme"

import {
  query,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://resume.vengateshdd.com/">
        Vengatesh Deen Dayal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignInSide() {

  const [incorrectPwd,setIncorrectPwd] = useState(false)
  const router = useRouter();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const checkUser = {
      username: data.get('username'),
      password: data.get('password'),
    }

    const docRef = doc(collection(firestore, "inventory"), checkUser.username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
      const docData = docSnap.data()
      if(docData.password === checkUser.password){
        //redirect user to the /user page
        setIncorrectPwd(false)
        router.push(`user/${docSnap.id}`)
      }
      else{
        setIncorrectPwd(true)
      }
    }
    else{
      setIncorrectPwd(true)
    }

  };
  // const handleLogIn = async (event) => {
  //   //Logic for verifying user
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  // }

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: '#4fc3f7',
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        >
        <Container></Container>
          <Typography variant="h2"mx={30} my={50}
          sx={{color:'rgb(0,0,0,.6)',
          }}>Welcome to 
          Pantry Tracker
          </Typography>
        
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {incorrectPwd&&<Typography sx ={{color:'red'}} variant='body2'>Incorrect Username/Password, Try Again!</Typography>}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}