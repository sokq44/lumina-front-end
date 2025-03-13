import { FC } from "react";
import Container from "@/components/ui/container";
import ThemeSwitch from "@/components/theme/theme-switch";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { Link } from "react-router-dom";

const MainPage: FC = () => {
  return (
    <MediaQuery>
      <More>
        <ThemeSwitch position="top-right" />
        <Container className="flex flex-col gap-4 items-center justify-center h-screen">
          <span className="text-4xl font-bold">No Main Page Yet</span>
          <Link
            to="/article"
            state={{ article: { id: "4a48eff2-e8ec-4841-943f-e6ee0352ecfe" } }}
            className="w-[35rem] flex items-center justify-center bg-muted rounded-md py-2 transition-all duration-300 hover:bg-muted-foreground/50"
          >
            Showcase
          </Link>
          <Container className="flex gap-x-8 w-[35rem]">
            <Link
              to={"/register"}
              className="w-full flex items-center justify-center bg-foreground text-secondary rounded-md py-2 transition-all duration-300 hover:bg-foreground/90"
            >
              Sign Up
            </Link>
            <Link
              to={"/login"}
              className="w-full flex items-center justify-center bg-foreground text-secondary rounded-md py-2 transition-all duration-300 hover:bg-foreground/90"
            >
              Sign In
            </Link>
          </Container>
        </Container>
      </More>
      <Less>
        <ThemeSwitch position="top-right" />
        <Container className="flex flex-col gap-4 items-center justify-center h-screen">
          <span className="text-4xl font-bold">No Main Page Yet</span>
          <Container className="w-full p-2 grid grid-cols-2 grid-rows-2 gap-2">
            <Link
              to="/article"
              state={{
                article: { id: "4a48eff2-e8ec-4841-943f-e6ee0352ecfe" },
              }}
              className="mt-4 w-full flex items-center justify-center col-span-2 bg-muted rounded-md py-2 transition-all duration-300 hover:bg-muted-foreground/50"
            >
              Showcase
            </Link>
            <Link
              to={"/register"}
              className="w-full h-min py-2 flex items-center justify-center bg-foreground text-secondary rounded-md transition-all duration-300 hover:bg-foreground/90"
            >
              Sign Up
            </Link>
            <Link
              to={"/login"}
              className="w-full h-min py-2 flex items-center justify-center bg-foreground text-secondary rounded-md transition-all duration-300 hover:bg-foreground/90"
            >
              Sign In
            </Link>
          </Container>
        </Container>
      </Less>
    </MediaQuery>
  );
};

export default MainPage;
