import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Nav } from '../nav';

const Layout = ({ children }: { children: ReactNode }) => (
  <Container maxWidth="md" disableGutters>
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
      <Nav />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  </Container>
);
export default Layout;
