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
        <p className="text-4xl font-bold">Main Page</p>
        <Container className="flex gap-x-8">
          <SlidingLink to={"/register"}>Sign Up</SlidingLink>
          <SlidingLink to={"/login"}>Sign In</SlidingLink>
        </Container>
      </motion.div>
    </>
  );
};

export default MainPage;
