import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* ✅ Left Side - Logo + Text */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <img
                src="/cwc-logo.png"
                alt="CWC Logo"
                width={40}
                style={{ marginRight: 8 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* ✅ Org Name - Responsive */}
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    color: 'white',
                  }}
                >
                  <span style={{ display: 'none' }} className="mobile-only">
                    CWC, Tenughat
                  </span>
                  <span style={{ display: 'block' }} className="desktop-only">
                    Central Water Commission, Tenughat
                  </span>
                </span>
                {/* ✅ Hindi Line (Always Visible) */}
                <span style={{ fontSize: '0.85rem', color: 'white' }}>
                  केन्द्रीय जल आयोग, तेनुघाट
                </span>
              </Box>
            </Box>
          </Box>

          {/* ✅ Right Side - Text + Drawer */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                textAlign: 'right',
                color: 'white',
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                All Calculators
              </div>
              <div style={{ fontSize: '0.75rem' }}>- Designed By Chandan</div>
            </Box>

            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Right Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Typography variant="h6">All Calculators</Typography>
            <Typography variant="caption" display="block">
              - Designed By Chandan
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* ✅ Custom CSS for conditional display */}
      <style>
        {`
          @media (max-width: 900px) {
            .mobile-only { display: block !important; }
            .desktop-only { display: none !important; }
          }

          @media (min-width: 901px) {
            .mobile-only { display: none !important; }
            .desktop-only { display: block !important; }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
