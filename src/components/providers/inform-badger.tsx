import { FC, ReactNode, useState } from "react";
import { InformBadgeContext } from "@/hooks/use-inform-badge";
import { useMousePosition } from "@/hooks/use-mouse-position";
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
          className="fixed z-50 inform-badge fade-in w-fit whitespace-nowrap max-w-[200px]"
          style={{
            left: `${x < screen.width / 1.4 ? x + 10 : x - 5}px`,
            top: `${y + 10}px`,
            transform: `${
              x < screen.width / 1.1 ? "translateX(0)" : "translateX(-100%)"
            }`,
          }}
        >
          {label}
        </Badge>
      )}
      {children}
    </InformBadgeContext.Provider>
  );
};

export default InformBadger;
