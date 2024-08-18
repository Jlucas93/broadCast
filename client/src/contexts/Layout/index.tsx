'use client';

import { createContext, ReactNode, useContext } from 'react';

import { usePathname } from 'next/navigation';

import Layout from '@/layout';

type LayoutContextType = null;

const LayoutContext = createContext<LayoutContextType | undefined>(null);

export default function LayoutProvider({ children }: { children: ReactNode }) {
  const noLayoutRoutes = ['/', '/signup'];
  const location = usePathname();

  const shouldApplyLayout = !noLayoutRoutes.includes(location);

  return (
    <LayoutContext.Provider value={null}>
      {shouldApplyLayout ? <Layout>{children}</Layout> : children}
    </LayoutContext.Provider>
  );
}

function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useLayout precisa ser usado com o LayoutContext!');
  }

  return context;
}

export { LayoutProvider, useLayout };
