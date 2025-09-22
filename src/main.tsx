import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { clearAllCache } from './utils/storage';

// Clear cache immediately when the app loads (but don't block rendering)
try {
  clearAllCache();
  console.log('Initial cache clear completed');
} catch (error) {
  console.error('Error during initial cache clear:', error);
}

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering app:', error);
    // Fallback rendering without StrictMode
    const root = createRoot(rootElement);
    root.render(<App />);
  }
} else {
  console.error('Root element not found');
  // Create a fallback message
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: Arial, sans-serif;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #dc2626;">Application Error</h1>
        <p style="color: #6b7280;">Unable to find root element. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="background: #3b82f6; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    </div>
  `;
}
