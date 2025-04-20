import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import { Provider } from 'react-redux';


import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { system } from './components/Theme/Theme';
import { BrowserRouter } from 'react-router-dom';


const theme = {
  fonts: {
      heading: '"Avenir Next", sans-serif',
      body: '"Open Sans", sans-serif',
  },
  colors: {
      brand: {
          bg: '#9747FF',
          text: '#fff',
          card: '#0A99FF',
      },
  },
  sizes: {
      xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
          bg: '#9747FF'
      },
  }
}

//export default extendTheme(theme);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider value={system}>
    <BrowserRouter> 
      <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
