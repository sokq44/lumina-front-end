import { useEffect, useState } from "react";
import { settingsMenuItems } from "@/lib/menu-items";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Authorized from "@/components/wraps/authorized";
import ThemeSwitch from "@/components/theme/theme-switch";
import { PanelBottom, SunMoon } from "lucide-react";
import GoBackArrow from "@/components/ui/go-back-arrow";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme/theme-provider";
import { Outlet, To, useNavigate } from "react-router-dom";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    navigate(settingsMenuItems[selected].url as To);
  }, [selected, navigate]);

  const changeSection = (index: number, url?: string) => {
    if (!url) return;
    setSelected(index);
    navigate(url as To);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Authorized onFail={() => navigate("/login")}>
      <MediaQuery>
        <More>
          <Container className="w-screen h-screen flex items-center justify-center">
            <ThemeSwitch position="top-right" />
            <GoBackArrow to="/user/articles" position="top-left" />
            <Container className="flex items-center gap-x-8 w-full h-auto p-8 md:w-[52rem] lg:w-[58rem] xl:w-[68rem]">
              <Container className="flex flex-col gap-y-4 w-1/5">
                {settingsMenuItems.map((item, index) => (
                  <Button
                    variant="ghost"
                    key={index}
                    onClick={() => changeSection(index, item.url)}
                    className={cn(
                      "flex justify-start gap-x-2 h-12 w-full transition-bg duration-300",
                      selected === index ? "font-semibold" : ""
                    )}
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
                <Container
                  key={index}
                  onClick={() => changeSection(index, item.url)}
                  className={cn(
                    "flex items-center justify-center gap-x-2 h-12 w-full p-4 rounded-md transition-bg duration-300",
                    selected === index ? "bg-muted" : ""
                  )}
                >
                  <item.icon size={24} />
                  <p className="text-base">{item.title}</p>
                </Container>
              ))}
              <Button
                onClick={toggleTheme}
                className="flex items-center justify-center gap-x-2 h-12 w-full p-4 transition-bg duration-300"
              >
                <SunMoon size={24} />
                <p className="text-base">Toggle Theme</p>
              </Button>
            </DrawerContent>
            <DrawerTrigger asChild>
              <Button className="fixed right-0 z-50 m-2 p-2 rounded-md text-primary bg-gray-200 transition-all duration-300 cursor-pointer hover:bg-secondary dark:bg-gray-800 dark:hover:bg-primary/15">
                <PanelBottom />
              </Button>
            </DrawerTrigger>
            <Container className="flex items-center justify-center h-screen pt-16">
              <Outlet />
            </Container>
          </Drawer>
        </Less>
      </MediaQuery>
    </Authorized>
  );
};

export default SettingsPage;
