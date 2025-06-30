import React from 'react';
import { Box, Typography } from '@mui/material';

const Calculator1 = () => {
  return (
    <Box
      sx={{
        pt: '80px',  // push below fixed navbar
        px: 3,       // 24px horizontal padding
        minHeight: 'calc(100vh - 64px)',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h1" gutterBottom>
        Calculator 1 Page
      </Typography>
      

      <h5>HELLO</h5>
    </Box>
  );
};

export default Calculator1;
