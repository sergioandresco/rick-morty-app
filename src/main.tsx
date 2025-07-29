import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './resources/fonts/acorn/stylesheet.css';
import './resources/fonts/gt-planar/stylesheet.css';
import './resources/fonts/get-schwifty/stylesheet.css';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from "@clerk/clerk-react";
import { shadesOfPurple } from '@clerk/themes';
import { esMX } from '@clerk/localizations';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
			appearance={{
				baseTheme: shadesOfPurple,
			}}
			publishableKey={PUBLISHABLE_KEY}
			localization={esMX}
			signUpFallbackRedirectUrl="/characters"
      		signInFallbackRedirectUrl="/characters"
		>
      <App />
		</ClerkProvider>
  </StrictMode>,
)
