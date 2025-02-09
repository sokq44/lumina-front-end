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
        <Container className="w-[35rem] text-muted-foreground text-sm">
          Welcome to <b>Lumina</b>. My goal is to provide a platform for
          creating, sharing, and exploring well-written articles and blogs on a
          variety of topics. Whether you're an aspiring writer or a seasoned
          blogger, this app is designed to help you express your ideas, connect
          with like-minded individuals, and engage in meaningful discussions.
        </Container>
        <Container className="w-[35rem] text-muted-foreground text-sm">
          At its core, the application allows users to write, edit, and publish
          articles or blog posts easily. Users can also manage their content,
          track views, and receive feedback from the community. The goal is to
          foster a creative space where people can share valuable insights,
          opinions, and stories, regardless of their background or expertise.
        </Container>
        <Container className="w-[35rem] text-muted-foreground text-sm">
          In the process, we require email verification to ensure users'
          authenticity and protect the integrity of the platform. As such, we
          send verification emails to ensure users can confirm their
          registration and interact with the community in a secure and reliable
          way.
        </Container>
        <Container className="w-[35rem] text-muted-foreground text-sm">
          I am committed to following all email best practices, including
          providing clear opt-in processes and ensuring that users only receive
          relevant communications from the platform. Moving out of sandbox mode
          will help me achieve a smoother user experience and ensure that the
          email verification process is as efficient and effective as possible.
        </Container>
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
