import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
// import { extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store/store';

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7caca",
      900: "#1a202c",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>

        <App />
     
    </Provider>
  </React.StrictMode>
);
