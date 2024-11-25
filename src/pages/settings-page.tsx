import { useEffect, useState } from "react";
import Separator from "@/components/separator";
import GoBackArrow from "@/components/go-back-arrow";
import ThemeSwitch from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/lib/menu-items";
import { PanelBottom, ShieldCheck, SunMoon, User, UserCog } from "lucide-react";
import { Link, Outlet, To, useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useTheme } from "@/components/theme-provider";

const settingsMenuItems: MenuItem[] = [
  {
    title: "Profile",
    url: "profile",
    icon: User,
  },
  {
    title: "Account",
    url: "account",
    icon: UserCog,
  },
  {
    title: "Security",
    url: "security",
    icon: ShieldCheck,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const matches = useMediaQuery("(min-width:1024px)");
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    navigate(settingsMenuItems[selected].url as To);
  }, [selected, navigate]);

  if (matches) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <ThemeSwitch position="top-right" />
        <GoBackArrow to="/user" />
        <div className="flex items-center gap-x-8 w-full h-auto p-8 md:w-[52rem] lg:w-[58rem] xl:w-[68rem]">
          <div className="flex flex-col gap-y-4 w-1/4">
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
                  "flex justify-start gap-x-4 h-12 w-full transition-bg duration-300" +
                  (selected === index ? " font-semibold" : "")
                }
              >
                <item.icon size={24} />
                <p className="text-md">{item.title}</p>
              </Button>
            ))}
          </div>
          <Separator orientation="vertical" className="h-48" />
          <div className="w-auto h-full">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Drawer>
      <GoBackArrow to="/user" />
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
              "flex items-center justify-center gap-x-4 h-12 w-full p-4 rounded-md transition-bg duration-300" +
              (selected === index ? " bg-muted" : "")
            }
          >
            <item.icon size={24} />
            <p className="text-base">{item.title}</p>
          </Link>
        ))}
        <Button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex items-center justify-center gap-x-4 h-12 w-full p-4 transition-bg duration-300"
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
