import { FC } from "react";
import { Button } from "./ui/button";

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
    <div className="w-full flex flex-col gap-y-2 items-center">
      <span className="text-md text-muted-foreground font-semibold mb-2">
        {title}
      </span>
      <div className="flex flex-col w-full gap-y-2">
        {elements.map((element) => (
          <Button key={element.name} variant="outline" className="shadow-sm">
            {element.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
