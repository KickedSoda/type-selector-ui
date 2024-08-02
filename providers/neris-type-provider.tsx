"use client"

import { NERISTypes } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface NERISTypeContextProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  nerisTypes: NERISTypes;
}

interface NERISProviderProps {
  children: ReactNode;
  nerisTypes: NERISTypes;
}

const NERISContext = createContext<NERISTypeContextProps | undefined>(undefined);

export const NERISProvider = ({children, nerisTypes}: NERISProviderProps) => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    setValue(searchParams.get('select') || '');
  }, [searchParams]);


  return (
    <NERISContext.Provider value={{
      value: value,
      setValue: setValue,
      nerisTypes
    }}>
      {children}
    </NERISContext.Provider>
  );
};

export const useNERISContext = () => {
  const context = useContext(NERISContext);
  if (!context) {
    throw new Error('useNERISContext must be used within a NERISProvider');
  }
  return context;
};