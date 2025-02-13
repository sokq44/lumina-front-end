import { FC } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import Informative from "@/components/inform-badge/informative";

const SaveArticleButton: FC<ButtonProps> = (props) => {
  return (
    <Informative label="Save Article">
      <Button className="p-2 w-9 h-9 transition-all duration-300" {...props} />
    </Informative>
  );
};

export default SaveArticleButton;
