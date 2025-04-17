import { createContext, useContext } from "react";

interface InformBadgeContextProps {
  showInformBadge: (label: string) => void;
  clearInformBadge: () => void;
}

export const InformBadgeContext = createContext<
  InformBadgeContextProps | undefined
>(undefined);

export const useInformBadge = () => {
  const context = useContext(InformBadgeContext);
  if (!context) {
    throw new Error("useInformBadge must be used within an InformBadger");
  }
  return context;
};
