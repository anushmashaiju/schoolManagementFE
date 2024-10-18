
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './redux-toolkit/store'; // Import the Redux store
import './index.css';

// Create the root
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}> {/* Wrap App with Provider to connect Redux */}
      <App />
    </Provider>
  </StrictMode>
);
