import { motion } from "motion/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import GoBackArrow from "@/components/go-back-arrow";
import SlidingLink from "@/components/sliding-link";
import ThemeSwitch from "@/components/theme-switch";

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5 },
      }}
      className="bg-background flex items-center justify-center h-screen"
    >
      <GoBackArrow position="top-left" />
      <ThemeSwitch position="top-right" />
      <div className="flex w-full h-[24rem] md:w-[34rem] lg:w-[40rem] xl:w-[46rem]">
        <div className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl md:py-12">
          <span className="text-xl font-extrabold mb-4">
            E-mail Verification
          </span>
          <span className="text-base text-center text-muted-foreground tracking-wider leading-relaxed px-4">
            Thank you for applying for an account. A verification email has been
            sent to the address you provided. To access your account, please
            click the verification link in the email. If you don’t see the
            message in your inbox, check your spam folder or contact us at{" "}
            <SlidingLink to={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL}`}>
              {import.meta.env.VITE_SUPPORT_EMAIL}
            </SlidingLink>
            . When verified, you can log into your account{" "}
            <SlidingLink to="/login">here</SlidingLink>.
          </span>
        </div>
        <div className="flex items-center justify-center w-0 md:w-1/3 md:border md:border-card-foreground md:shadow-md bg-card-foreground rounded-e-2xl">
          <Mail size={48} className="text-card" />
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyEmailPage;
