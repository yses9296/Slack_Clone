import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@layouts/App/App'; //tsconfig로 설정했기 때문에 인식 가능
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.querySelector('#app');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
// React 18 ver
