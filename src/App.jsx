import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './routes/signUp';
import SignIn from './routes/signIn';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Admin from './routes/admin';

// import Header from './components/header';

const defaultTheme = createTheme();

function App() {
  const [shortUrl, setShortUrl] = useState('');
  const [value, setValue] = useState('');

  function getShortUrl(e) {
    e.preventDefault();
    fetch(
      'https://s33fc2rixb.execute-api.ap-southeast-2.amazonaws.com/longurl',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: { url: value },
        }),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.body);
        setShortUrl(data.body.shortUrl);
      })
      .catch((error) => console.error('Error:', error));
  }

  // useEffect(() => {
  //   fetch('http://localhost:3000/url')
  //     .then((response) => response.json())
  //     .then((data) => setShortUrl(data));
  // }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='signup' element={<SignUp />}></Route>
          <Route path='signin' element={<SignIn />}></Route>
          <Route path='admin' element={<Admin />}></Route>
          <Route
            path='/'
            element={
              <Box
                sx={{
                  minHeight: '100vh',
                  backgroundImage: 'url(/background.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component='h1'
                  variant='h4'
                  sx={{ marginTop: '35vh', fontWeight: 'bold' }}
                >
                  Get your short URL
                </Typography>
                <Stack
                  component='form'
                  direction={{ xs: 'column', sm: 'row' }}
                  alignSelf='center'
                  spacing={1}
                  useFlexGap
                  sx={{
                    pt: 2,
                    width: { xs: '95%', sm: '55%' },
                    marginTop: '15px',
                  }}
                  onSubmit={getShortUrl}
                >
                  <TextField
                    id='outlined-basic'
                    hiddenLabel
                    size='medium'
                    variant='outlined'
                    label='Enter your link'
                    sx={{ width: '100%' }}
                    onChange={(e) => setValue(e.target.value)}
                    // placeholder='Enter your link'
                  />
                  <Button variant='contained' color='primary' type='submit'>
                    Go!
                  </Button>
                </Stack>
                {shortUrl && (
                  <Box mt={4}>
                    <Typography variant='body1'>
                      Here is your short URL:
                      <a href={shortUrl} style={{ marginLeft: '7px' }}>
                        {shortUrl}
                      </a>
                    </Typography>
                  </Box>
                )}
              </Box>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
