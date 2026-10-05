"use client";

import { createContext, useContext } from "react";

// The site is locked to design C (level 3). The level hook stays so
// components can still read it; the html ds-* classes are set in layout.jsx.
const DESIGN = { version: "c", level: 3 };

const DesignVersionContext = createContext(DESIGN);

export function DesignVersionProvider({ children }) {
  return (
    <DesignVersionContext.Provider value={DESIGN}>
      {children}
    </DesignVersionContext.Provider>
  );
}

export const useDesignVersion = () => useContext(DesignVersionContext);
