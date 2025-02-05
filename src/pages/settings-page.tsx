import { useEffect, useState } from "react";
import { settingsMenuItems } from "@/lib/menu-items";
import { useMediaQuery } from "usehooks-ts";
import { useTheme } from "@/components/theme-provider";
import Separator from "@/components/separator";
import ThemeSwitch from "@/components/theme-switch";
import GoBackArrow from "@/components/go-back-arrow";
import { Button } from "@/components/ui/button";
import { PanelBottom, SunMoon } from "lucide-react";
import { Link, Outlet, To, useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:1024px)");
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    navigate(settingsMenuItems[selected].url as To);
  }, [selected, navigate]);

  if (matches) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <ThemeSwitch position="top-right" />
        <GoBackArrow to="/user/articles" position="top-left" />
        <div className="flex items-center gap-x-8 w-full h-auto p-8 md:w-[52rem] lg:w-[58rem] xl:w-[68rem]">
          <div className="flex flex-col gap-y-4 w-1/5">
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
          </div>
          <Separator orientation="vertical" className="h-52" />
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Drawer>
      <GoBackArrow to="/user/articles" position="top-left" />
      <DrawerContent className="flex flex-col gap-y-4 px-4 items-center justify-center my-8">
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
      <DrawerTrigger className=" absolute top-0 right-0 mr-2 mt-2 w-12 h-12 flex">
        <PanelBottom className="self-center" strokeWidth="1.2px" size={48} />
      </DrawerTrigger>
      <div className="flex items-center justify-center h-screen pt-16">
        <Outlet />
      </div>
    </Drawer>
  );
};

export default SettingsPage;
