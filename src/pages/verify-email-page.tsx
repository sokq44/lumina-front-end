import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "@/components/ui/container";
import GoBackArrow from "@/components/ui/go-back-arrow";
import SlidingLink from "@/components/ui/sliding-link";
import ThemeSwitch from "@/components/ui/theme-switch";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.email) {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <Container className="bg-background flex items-center justify-center h-screen">
      <GoBackArrow position="top-left" />
      <ThemeSwitch position="top-right" />
      <Container className="flex w-full h-[24rem] md:w-[34rem] lg:w-[40rem] xl:w-[46rem]">
        <Container className="flex flex-col gap-2 items-center justify-center w-full px-4 md:bg-card md:w-2/3 md:border md:border-border md:shadow-md rounded-s-2xl md:py-12">
          <span className="text-xl font-extrabold mb-4">
            E-mail Verification
          </span>
          <span className="text-base text-center text-muted-foreground tracking-wider leading-relaxed px-4">
            Thank you for applying for an account. A verification email has been
            sent to the address you provided. To access your account, please
            click the verification link in the email. If you don't see the
            message in your inbox, check your spam folder.
            <br />
            When verified, you can log into your account{" "}
            <MediaQuery>
              <More>
                <SlidingLink to="/login">here</SlidingLink>.
              </More>
              <Less>
                <Link to="/login">
                  <Badge variant="secondary" className="text-inherit">
                    here
                  </Badge>
                </Link>
              </Less>
            </MediaQuery>
          </span>
        </Container>
        <Container className="flex items-center justify-center w-0 md:w-1/3 md:border md:shadow-md bg-[var(--logo)] rounded-e-2xl">
          <Mail size={48} className="text-white" />
        </Container>
      </Container>
    </Container>
  );
};

export default VerifyEmailPage;
