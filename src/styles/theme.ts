import { createTheme } from '@mui/material/styles';

import type { ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#190c5c',
    },
    secondary: {
      main: '#ea5a5d',
    },
    text: {
      primary: 'rgba(80,56,56,1)',
      secondary: 'rgba(80,56,56,0.54)',
      disabled: 'rgba(80,56,56,0.38)',
    },
    background: {
      default: '#f9f4f4',
      paper: '#fdfafa',
    },
    divider: 'rgba(55,40,40,0.07)',
  },
};

// Create a theme instance.
const theme = createTheme(themeOptions);

export default theme;
