import { MenuItem, userMenuItems } from "@/lib/menu-items";
import { useDialogue } from "@/hooks/use-dialogue";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import UserSidebar from "@/components/ui/user-sidebar";
import Authorized from "@/components/wraps/authorized";
import ThemeSwitch from "@/components/ui/theme-switch";
import { LogOut, PanelBottom, SunMoon } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function UserPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { logoutDialogue } = useDialogue();

  const updatedMenuItems = userMenuItems.concat([
    {
      title: "Logout",
      icon: LogOut,
      url: "",
      action: logoutDialogue,
    },
  ]);

  const onItemClick = (item: MenuItem) => {
    if (item.action) item.action();
    if (item.url) navigate(item.url);
  };

  return (
    <Authorized onFail={() => navigate("/login")}>
      <MediaQuery>
        <More>
          <SidebarProvider>
            <UserSidebar items={updatedMenuItems} onItemClick={onItemClick} />
            <SidebarTrigger className="fixed top-0 z-50 m-2 w-10 h-10 rounded-md text-primary bg-gray-200 transition-all duration-300 cursor-pointer hover:bg-secondary dark:bg-gray-800 dark:hover:bg-primary/15" />
            <Container className="h-screen w-screen">
              <ThemeSwitch position="top-right" />
              <Container className="flex w-full h-full bg-background">
                <Outlet />
              </Container>
            </Container>
          </SidebarProvider>
        </More>
        <Less>
          <Drawer>
            <DrawerContent className="flex flex-col gap-y-10 px-4 items-center justify-center my-8 font-funnel">
              {updatedMenuItems.map((item) => (
                <Button
                  key={item.title}
                  className="flex"
                  onClick={() => onItemClick(item)}
                >
                  <item.icon className="mr-2" />
                  <span>{item.title}</span>
                </Button>
              ))}
              <Button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="flex items-center justify-center gap-x-4 h-12 w-full p-4 transition-bg duration-300"
              >
                <SunMoon size={24} />
                <span className="text-base">Toggle Theme</span>
              </Button>
            </DrawerContent>
            <DrawerTrigger asChild>
              <Button className="fixed right-0 z-50 m-2 p-2 rounded-md text-primary bg-gray-200 transition-all duration-300 cursor-pointer hover:bg-secondary dark:bg-gray-800 dark:hover:bg-primary/15">
                <PanelBottom />
              </Button>
            </DrawerTrigger>
          </Drawer>
          <Container className="pt-20 pb-14">
            <Outlet />
          </Container>
        </Less>
      </MediaQuery>
    </Authorized>
  );
}
