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

export default function SignInSide() {
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
        style={{ minHeight: '100vh' }} // Centering vertically
      >
        <Paper
          elevation={12}
          style={{ padding: '20px', maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'row' }} // Width control and row layout
        >
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
              flex: 1,
            }}
          >
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Phone number / Username / Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
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
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
                SIGN IN
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid container justifyContent="center" sx={{ mt: 8 }}>
                  <Typography variant="body2">
                    New to Shipping Sea? 
                    <Link to="/signup">
                      {" Sign Up"}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}