import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { clearAllCache } from './utils/storage';

// Clear cache on app startup (non-blocking)
try {
  clearAllCache();
} catch (error) {
  console.error('Error clearing cache on startup:', error);
}

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Error rendering app:', error);
    // Fallback rendering without StrictMode
    createRoot(rootElement).render(<App />);
  }
} else {
  console.error('Root element not found');
}