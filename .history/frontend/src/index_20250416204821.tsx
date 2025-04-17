import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store } from './store/store';

// Create a theme (using defaults)
const theme = extendTheme({});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
