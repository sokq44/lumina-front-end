import { FC } from "react";
import { motion } from "motion/react";
import Container from "@/components/container";
import ThemeSwitch from "@/components/theme-switch";
import SlidingLink from "@/components/sliding-link";

const MainPage: FC = () => {
  return (
    <>
      <ThemeSwitch position="top-right" />
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5 },
        }}
        className="flex flex-col gap-4 items-center justify-center h-screen"
      >
        <span className="text-4xl font-bold mb-4">No Main Page Yet</span>
        <SlidingLink
          to="/article"
          state={{ article: { id: "4a48eff2-e8ec-4841-943f-e6ee0352ecfe" } }}
          className="mt-4 w-[35rem] flex items-center justify-center bg-muted rounded-md py-2 transition-all duration-300 hover:bg-muted-foreground/50"
        >
          Showcase
        </SlidingLink>
        <Container className="flex gap-x-8 w-[35rem]">
          <SlidingLink
            to={"/register"}
            className="w-full flex items-center justify-center bg-foreground text-secondary rounded-md py-2 transition-all duration-300 hover:bg-foreground/90"
          >
            Sign Up
          </SlidingLink>
          <SlidingLink
            to={"/login"}
            className="w-full flex items-center justify-center bg-foreground text-secondary rounded-md py-2 transition-all duration-300 hover:bg-foreground/90"
          >
            Sign In
          </SlidingLink>
        </Container>
      </motion.div>
    </>
  );
};

export default MainPage;
