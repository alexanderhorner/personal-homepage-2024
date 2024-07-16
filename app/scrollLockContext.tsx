import { createContext, useContext, useState } from "react";

interface ScrollLockProps {
  setScrollLock: (scrollLock: boolean) => void;
  scrollLock: boolean;
}

export const ScrollLockContext = createContext<ScrollLockProps | undefined>(undefined);

export const useScrollLock = () => {
  const scrollLock = useContext(ScrollLockContext);
   
  if (!scrollLock) {
    throw new Error("useScrollLock must be used within a ScrollLock.Provider");
  }

  return scrollLock;
}
