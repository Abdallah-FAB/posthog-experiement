import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { initClarity } from './lib/clarity.ts';
import App from './App.tsx'; // This will be our main layout or a redirect to the list page

// Placeholder components for now
import CustomerListPage from './pages/CustomerListPage.tsx';
import CustomerDetailsPage from './pages/CustomerDetailsPage.tsx';
import { PostHogProvider } from 'posthog-js/react';

initClarity();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: '2025-05-24',
        capture_exceptions: true,
        debug: import.meta.env.MODE === 'development',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/customers' element={<CustomerListPage />} />
          <Route
            path='/customers/:customerId'
            element={<CustomerDetailsPage />}
          />
        </Routes>
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>
);