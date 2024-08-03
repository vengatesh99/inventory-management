import React from 'react';
import { Typography, TextField } from '@mui/material';
import { Container } from '@mui/system';
const NoCart = () => {
    return (
        <Container
        sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
            <Typography sx={{ color: 'text.disabled' }} variant = "h2">
      No Items in the Cart
        </Typography>
        </Container>
    );
}

export default NoCart;
