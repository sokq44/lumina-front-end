import { FC, ReactNode, useState } from "react";
import { InformBadgeContext } from "@/hooks/inform-badge";
import { useMousePosition } from "@/hooks/mouse-position";
import { Badge } from "@/components/ui/badge";

interface InformBadgerProps {
  children: ReactNode;
}

const InformBadger: FC<InformBadgerProps> = ({ children }) => {
  const [label, setLabel] = useState<string | null>(null);
  const { x, y } = useMousePosition();

  return (
    <InformBadgeContext.Provider
      value={{
        showInformBadge: (newLabel: string) => setLabel(newLabel),
        clearInformBadge: () => setLabel(null),
      }}
    >
      {label !== null && (
        <Badge
          className="fixed z-50 inform-badge fade-in"
          style={{ left: `${x + 10}px`, top: `${y + 10}px` }}
        >
          {label}
        </Badge>
      )}
      {children}
    </InformBadgeContext.Provider>
  );
};

export default InformBadger;
