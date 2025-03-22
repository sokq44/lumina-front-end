import { FC } from "react";
import Img from "@/components/ui/image";
import Container from "@/components/ui/container";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
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
    <MediaQuery>
      <More>
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
      </More>
      <Less>
        <Container className="w-full flex justify-center my-4">
          <Container>
            <Img src={src} className="w-full h-auto rounded-lg mb-1" />
            <span className="ml-2 text-sm text-muted-foreground focus:outline-none">
              {label}
            </span>
          </Container>
        </Container>
      </Less>
    </MediaQuery>
  );
};

export default YoutubeArticleSection;
