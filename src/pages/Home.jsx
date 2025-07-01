import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const calculators = [
    { title: 'RADIAL GATE', route: '/calc1' }
    // ,
    // { title: 'Calculator 2', route: '/calc2' },
    // { title: 'Calculator 3', route: '/calc3' },
  ];

  return (
    <>
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          height: 'calc(100vh - 64px)', // adjust height minus navbar
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {calculators.map((calc, index) => (
          <Paper
            key={index}
            elevation={8}
            onClick={() => navigate(calc.route)}
            sx={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
              cursor: 'pointer',
              animation: `floatUpDown 3s ease-in-out ${index * 0.4}s infinite`,
            }}
          >
            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                color: '#004d40',
                fontWeight: 'bold',
                px: 2,
                textTransform: 'uppercase',
                fontSize: { xs: '1.5rem', sm: '1.5rem' },
              }}
            >
              {calc.title}
            </Typography>
          </Paper>
        ))}
      </Box>

      <style>
        {`
          @keyframes floatUpDown {
            0%   { transform: translateY(0px) scale(1); }
            50%  { transform: translateY(-8px) scale(1.05); }
            100% { transform: translateY(0px) scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default Home;
