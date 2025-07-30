import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './resources/fonts/acorn/stylesheet.css';
import './resources/fonts/gt-planar/stylesheet.css';
import './resources/fonts/get-schwifty/stylesheet.css';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from '@clerk/themes';
import { esMX } from '@clerk/localizations';
import { Toaster } from 'sonner';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
			publishableKey={PUBLISHABLE_KEY}
			localization={esMX}
			signUpFallbackRedirectUrl="/characters"
			signInFallbackRedirectUrl="/characters"
		>
			<Toaster position="top-right" richColors />
			<App />
		</ClerkProvider>
	</StrictMode>,
)
