import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {'Copyright © '}
    <MuiLink color="inherit" href="https://mui.com/">
      Your Website
    </MuiLink>{' '}
    {new Date().getFullYear()}.
  </Typography>
);

export default Copyright;
