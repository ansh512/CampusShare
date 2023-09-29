import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PriceProvider } from './context/PriceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <PriceProvider>   
                <BrowserRouter>
                        <App />
                </BrowserRouter>
        </PriceProvider>
);
