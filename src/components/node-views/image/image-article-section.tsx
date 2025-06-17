import { FC } from "react";
import Img from "@/components/ui/image";
import Container from "@/components/ui/container";

interface ImageArticleSectionProps {
  src: string;
  label: string;
  width: number;
}

const ImageArticleSection: FC<ImageArticleSectionProps> = ({
  src,
  label,
  width,
}) => {
  return (
    <Container className="">
      <Container className="w-full h-min flex justify-center my-4">
        <Container>
          <Img src={src} width={width} className="h-auto rounded-lg mb-1" />
          <span className="ml-2 text-sm text-muted-foreground focus:outline-none">
            {label}
          </span>
        </Container>
      </Container>
    </Container>
  );
};

export default ImageArticleSection;
