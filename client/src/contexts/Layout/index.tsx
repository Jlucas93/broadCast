'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import { usePathname } from 'next/navigation';

import Layout from '@/layout';

interface LayoutContextType {
  toogleFull(): void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export default function LayoutProvider({ children }: { children: ReactNode }) {
  const noLayoutRoutes = ['/', '/signup'];
  const location = usePathname();

  const shouldApplyLayout = !noLayoutRoutes.includes(location);

  const toogleFull = useCallback(() => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => {})
        .catch(() => {});
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  const context = useMemo(() => {
    return { toogleFull };
  }, [toogleFull]);

  return (
    <LayoutContext.Provider value={context}>
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
