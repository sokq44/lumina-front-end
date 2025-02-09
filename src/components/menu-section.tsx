import { FC } from "react";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";

type SectionElement = {
  name: string;
  to: string;
};

interface MenuSectionProps {
  title: string;
  elements: SectionElement[];
}

const MenuSection: FC<MenuSectionProps> = ({ title, elements }) => {
  return (
    <Container className="w-full flex flex-col gap-y-2 items-center">
      <span className="text-md text-muted-foreground font-semibold mb-2">
        {title}
      </span>
      <Container className="flex flex-col w-full gap-y-2">
        {elements.map((element) => (
          <Button key={element.name} variant="outline" className="shadow-sm">
            {element.name}
          </Button>
        ))}
      </Container>
    </Container>
  );
};

export default MenuSection;
