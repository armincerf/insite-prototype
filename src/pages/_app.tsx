import * as React from 'react';
import {AppProps} from 'next/app';
import '../styles/index.css';

const EmptyAppShell: React.FC = ({children}) => <>{children}</>;

export default function MyApp({Component, pageProps}: AppProps) {
  let AppShell = (Component as any).appShell || EmptyAppShell;
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  );
}