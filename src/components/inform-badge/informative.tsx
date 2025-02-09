import { FC, ReactNode } from "react";
import { useInformBadge } from "@/hooks/inform-badge";

interface InformativeProps {
  label: string;
  className?: string;
  children: ReactNode;
}

const Informative: FC<InformativeProps> = ({ label, children, className }) => {
  const { showInformBadge, clearInformBadge } = useInformBadge();

  return (
    <div
      onMouseEnter={() => showInformBadge(label)}
      onMouseLeave={clearInformBadge}
      className={className}
    >
      {children}
    </div>
  );
};

export default Informative;
