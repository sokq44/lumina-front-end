import { FC } from "react";
import Container from "@/components/ui/container";
import { getEmbedUrl } from "@/lib/utils";

interface YoutubeArticleSectionProps {
  src: string;
  label: string;
  width: number;
}

const YoutubeArticleSection: FC<YoutubeArticleSectionProps> = ({
  src,
  label,
  width,
}) => {
  return (
    <Container className="w-full flex justify-center my-4">
      <Container>
        <iframe
          width={width}
          height={(width * 2) / 3}
          allowFullScreen
          src={getEmbedUrl(src)}
          className="rounded-lg mb-1"
        />
        <span className="ml-2 text-sm text-muted-foreground focus:outline-none">
          {label}
        </span>
      </Container>
    </Container>
  );
};

export default YoutubeArticleSection;
