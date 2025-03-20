import { FC } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";
import Img from "@/components/ui/image";

interface ImageArticleSectionProps {
  src: string;
  label: string;
  sectionClassName: string;
}

const ImageArticleSection: FC<ImageArticleSectionProps> = ({
  src,
  label,
  sectionClassName,
}) => {
  return (
    <NodeViewWrapper>
      <Container className={cn(sectionClassName, "w-full")}>
        <Img src={src} />
        <span className="text-sm text-muted-foreground focus:outline-none">
          {label}
        </span>
      </Container>
    </NodeViewWrapper>
  );
};

export default ImageArticleSection;
