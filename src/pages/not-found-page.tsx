import { useNavigate } from "react-router-dom";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Less, MediaQuery, More } from "@/components/media-query";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <MediaQuery>
      <More>
        <Container className="h-screen w-screen flex items-center justify-center gap-x-4">
          <span className="text-6xl font-semibold">404</span>
          <Separator orientation="vertical" className="h-[6.5rem] w-1" />
          <Container className="flex flex-col items-center gap-y-1">
            <span className="text-lg flex items-center gap-x-2 font-medium text-gray-700">
              Oops! We couldn't find the page you were looking for.
            </span>
            <span className="text-sm text-gray-500 text-center">
              The link may be broken or the page may have been moved.
            </span>
            <Button
              onClick={() => navigate(-1)}
              className="w-full mt-2 transition-all duration-300"
            >
              Go Back
            </Button>
          </Container>
        </Container>
      </More>
      <Less>
        <Container className="h-screen w-screen flex flex-col items-center justify-center gap-y-4 px-4">
          <Container className="flex items-center justify-center gap-x-4">
            <span className="text-5xl font-semibold">404</span>
            <Separator orientation="vertical" className="h-20 w-1" />
            <Container className="flex flex-col items-center gap-y-1">
              <span className="font-medium text-gray-700 text-sm md:text-base">
                Sorry, we can’t seem to find the page you’re looking for.{" "}
                <span className="text-sm text-gray-500 md:text-base">
                  It might have been moved or deleted. Please check the URL or
                  go back.
                </span>
              </span>
            </Container>
          </Container>
          <Button
            onClick={() => navigate(-1)}
            className="w-full transition-all duration-300"
          >
            Go back
          </Button>
        </Container>
      </Less>
    </MediaQuery>
  );
};

export default NotFoundPage;
