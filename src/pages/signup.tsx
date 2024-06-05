import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/navbar';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from "../components/mockuppics/logo.png";

const defaultTheme = createTheme();

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Paper elevation={12}
          style={{ padding: '20px', maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'row' }}>
          <Box className="login-logo" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/" >
            <img src={Logo} alt="Logo"/>
            </Link>
          </Box>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 420,
            }}
          >
            <Typography component="h1" variant="h5" sx={{ ml: -42 }}>
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Confirm Password"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                id="Confirm Password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="agree" color="primary" />}
                label="I agree to the terms and conditions."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  fontSize:18,
                  fontWeight: 'bold',
                  bgcolor: '#5AB2FF',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#4798CC',
                  }
                }}
              >
                SIGN UP
                </Button>
                <Grid container justifyContent="center" sx={{ mt: 4 }}>
                    <Typography variant="body2" align="center">
                        By signing up, you agree to Shipping Sea's{' '}
                        <Link href="#" variant="body2" sx={{ color: '#5AB2FF', '&:hover': { color: '#4798CC' }, textDecoration: 'none' }}>
                        Terms of <br/>Service
                        </Link>
                        {' '}&{' '}
                        <Link href="#" variant="body2" sx={{ color: '#5AB2FF', '&:hover': { color: '#4798CC' }, textDecoration: 'none' }}>
                        Privacy Policy
                        </Link>
                    </Typography>
                </Grid>
              <Grid container justifyContent="center" sx={{ mt: 4 }}>
                  <Typography variant="body2">
                    Have an account?
                    <Link to="/signin" variant="body2" sx={{color: '#5AB2FF', '&:hover': {color: '#4798CC'}, textDecoration: 'none'}}>
                    {" Log In"}
                    </Link>
                  </Typography>
                </Grid>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
