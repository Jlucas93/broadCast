import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import type { AppProps } from 'next/app';

import { AuthProvider } from '@/contexts/Auth';
import { LayoutProvider } from '@/contexts/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LayoutProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </LayoutProvider>
    </AuthProvider>
  );
}

export default MyApp;
