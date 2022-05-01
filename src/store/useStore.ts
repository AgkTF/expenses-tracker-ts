import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppConfig {
  currency: string;
}

export const useStore = create<AppConfig>()(
  devtools(set => ({
    currency: 'EGP',
  }))
);
