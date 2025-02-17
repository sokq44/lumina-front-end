import { useEffect, useState } from "react";
import { Link, Outlet, To, useNavigate } from "react-router-dom";
import { settingsMenuItems } from "@/lib/menu-items";
import { useLoggedIn } from "@/hooks/user";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/theme-switch";
import GoBackArrow from "@/components/go-back-arrow";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { LoaderCircle, PanelBottom, SunMoon } from "lucide-react";
import { Less, MediaQuery, More } from "@/components/media-query";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    navigate(settingsMenuItems[selected].url as To);
  }, [selected, navigate]);

  useEffect(() => {
    if (loggedIn.isLoggedIn === false) navigate("/login");
  }, [loggedIn.isLoggedIn, navigate]);

  if (loggedIn.isLoading) {
    return (
      <Container className="bg-background flex items-center justify-center h-screen text-muted-foreground">
        <LoaderCircle size={24} className="animate-spin" />
        <span className="ml-2 text-lg">Checking your login status...</span>
      </Container>
    );
  }

  return (
    <MediaQuery>
      <More>
        <Container className="w-screen h-screen flex items-center justify-center">
          <ThemeSwitch position="top-right" />
          <GoBackArrow to="/user/articles" position="top-left" />
          <Container className="flex items-center gap-x-8 w-full h-auto p-8 md:w-[52rem] lg:w-[58rem] xl:w-[68rem]">
            <Container className="flex flex-col gap-y-4 w-1/5">
              {settingsMenuItems.map((item, index) => (
                <Button
                  key={index}
                  variant={"ghost"}
                  onClick={
                    item.url
                      ? () => {
                          setSelected(index);
                          navigate(item.url as To);
                        }
                      : undefined
                  }
                  className={
                    "flex justify-start gap-x-2 h-12 w-full transition-bg duration-300" +
                    (selected === index ? " font-semibold" : "")
                  }
                >
                  <item.icon size={24} />
                  <p className="text-md">{item.title}</p>
                </Button>
              ))}
            </Container>
            <Separator orientation="vertical" className="h-52" />
            <Container className="w-full h-full">
              <Outlet />
            </Container>
          </Container>
        </Container>
      </More>
      <Less>
        <Drawer>
          <GoBackArrow to="/user/articles" position="top-left" />
          <DrawerContent className="flex flex-col gap-y-4 px-4 items-center justify-center my-8 py-3 font-funnel">
            {settingsMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.url ? item.url : ""}
                onClick={
                  item.url
                    ? () => {
                        setSelected(index);
                        navigate(item.url as To);
                      }
                    : undefined
                }
                className={
                  "flex items-center justify-center gap-x-2 h-12 w-full p-4 rounded-md transition-bg duration-300" +
                  (selected === index ? " bg-muted" : "")
                }
              >
                <item.icon size={24} />
                <p className="text-base">{item.title}</p>
              </Link>
            ))}
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex items-center justify-center gap-x-2 h-12 w-full p-4 transition-bg duration-300"
            >
              <SunMoon size={24} />
              <p className="text-base">Toggle Theme</p>
            </Button>
          </DrawerContent>
          <DrawerTrigger asChild>
            <Button className="fixed right-0 z-50 m-2 p-2 rounded-md text-primary bg-gray-200 transition-all duration-300 hover:cursor-pointer hover:bg-secondary dark:bg-gray-800 dark:hover:bg-primary/15">
              <PanelBottom />
            </Button>
          </DrawerTrigger>
          <Container className="flex items-center justify-center h-screen pt-16">
            <Outlet />
          </Container>
        </Drawer>
      </Less>
    </MediaQuery>
  );
};

export default SettingsPage;
