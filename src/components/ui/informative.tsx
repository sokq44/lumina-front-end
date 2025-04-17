import { FC, ReactNode } from "react";
import { useInformBadge } from "@/hooks/use-inform-badge";
import Container from "@/components/ui/container";

interface InformativeProps {
  label: string;
  className?: string;
  children: ReactNode;
}

const Informative: FC<InformativeProps> = ({ label, children, className }) => {
  const { showInformBadge, clearInformBadge } = useInformBadge();

  return (
    <Container
      onMouseEnter={() => showInformBadge(label)}
      onMouseLeave={clearInformBadge}
      onClick={clearInformBadge}
      className={className}
    >
      {children}
    </Container>
  );
};

export default Informative;
