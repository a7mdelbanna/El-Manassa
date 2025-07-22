import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export const TestComponent: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#0EA5E9',
        color: 'white',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold', mb: 2 }}>
        El-Manassa
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Online Learning Platform
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: 'white',
          color: '#0EA5E9',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
        onClick={() => window.location.href = '/app/dashboard'}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};