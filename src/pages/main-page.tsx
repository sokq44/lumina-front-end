import { FC } from "react";
import Container from "@/components/ui/container";
import ThemeSwitch from "@/components/ui/theme-switch";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { Link } from "react-router-dom";
import Img from "@/components/ui/image";
import { Construction } from "lucide-react";
import SlidingLink from "@/components/ui/sliding-link";

const MainPage: FC = () => {
  return (
    <MediaQuery>
      <More>
        <ThemeSwitch position="top-right" />
        <Container className="flex flex-col gap-4 items-center justify-center h-screen">
          <Container className="flex gap-x-4">
            <Container className="w-100 flex items-center justify-center gap-x-4 border-2 px-6 py-4 rounded-md">
              <Img src="logo.png" className="w-12" />
              <span className="text-7xl text-[var(--logo)] font-semibold">
                Lumina
              </span>
            </Container>
            <Container className="flex items-center content-center px-6 py-4 border-2 rounded-md">
              <Construction size={48} className="text-[var(--logo)]" />
            </Container>
          </Container>
          <Container className="text-lg w-[32rem] border-2 px-6 py-4 rounded-md">
            Hello there, I'm building a place where ideas flow, words matter,
            and every writer feels at home.
            <br />
            Sorry, the app is still under construction, but you're welcome to
            explore, create, and help me grow. Your feedback is incredibly
            valuable. Try it out, see what works (and what doesn't), and let me
            know. Every bug you find helps me make things better. <br />
            For now, if you run into any errors or issues, please send them via
            email at
            <span>
              {" "}
              <SlidingLink
                to="mailto:sokq44@gmail.com"
                className="text-blue-500"
              >
                sokq44@gmail.com
              </SlidingLink>
            </span>
            . Thanks for being here with me from the start!
          </Container>
          <Container className="flex gap-x-8 w-[32rem]">
            <Link
              to={"/register"}
              className="w-full flex items-center justify-center bg-transparent border-2  rounded-md py-2 transition-all duration-300 hover:bg-foreground/10"
            >
              Sign Up
            </Link>
            <Link
              to={"/login"}
              className="w-full flex items-center justify-center bg-transparent border-2  rounded-md py-2 transition-all duration-300 hover:bg-foreground/10"
            >
              Sign In
            </Link>
          </Container>
        </Container>
      </More>
      <Less>
        <ThemeSwitch position="top-right" />
        <Container className="flex flex-col gap-4 justify-center px-4 py-16">
          <Container className="w-full flex items-center justify-center gap-x-4 border-2 py-2 rounded-md">
            <Img src="logo.png" className="w-8" />
            <span className="text-5xl text-[var(--logo)] font-semibold">
              Lumina
            </span>
          </Container>
          <Container className="text-md w-full border-2 px-6 py-4 rounded-md">
            Hello there, we're building a place where ideas flow, words matter,
            and every writer feels at home.
            <br />
            Sorry, the app is still under construction, but you're welcome to
            explore, create, and help us grow. Your feedback is incredibly
            valuable. Try it out, see what works (and what doesn't), and let us
            know. Every bug you find helps us make things better. <br />
            For now, if you run into any errors or issues, please send them via
            email at
            <span>
              {" "}
              <SlidingLink
                to="mailto:sokq44@gmail.com"
                className="text-blue-500"
              >
                sokq44@gmail.com
              </SlidingLink>
            </span>
            . Thanks for being here with us from the start!
          </Container>
          <Container className="flex flex-col gap-y-4 w-full">
            <Link
              to={"/register"}
              className="w-full flex items-center justify-center bg-transparent border-2 rounded-md py-2 transition-all duration-300 hover:bg-foreground/10"
            >
              Sign Up
            </Link>
            <Link
              to={"/login"}
              className="w-full flex items-center justify-center bg-transparent border-2 rounded-md py-2 transition-all duration-300 hover:bg-foreground/10"
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
