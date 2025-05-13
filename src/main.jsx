import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ChakraProvider } from '@chakra-ui/react';
import App from './App'; // Adjust the path if needed

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme'; // if using a custom theme

<ChakraProvider theme={theme}>
  <ColorModeScript initialColorMode={theme.config.initialColorMode} />
  <App />
</ChakraProvider>


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
