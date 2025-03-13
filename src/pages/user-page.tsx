import { useEffect } from "react";
import { useLogout } from "@/hooks/user";
import { useToast } from "@/hooks/use-toast";
import { userMenuItems } from "@/lib/menu-items";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Authorized from "@/components/wraps/authorized";
import ThemeSwitch from "@/components/theme/theme-switch";
import UserSidebar from "@/components/ui/user-sidebar";
import { useTheme } from "@/components/theme/theme-provider";
import LoadingScreen from "@/components/wraps/loading-screen";
import { LogOut, PanelBottom, SunMoon } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Less, MediaQuery, More } from "@/components/wraps/media-query";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function UserPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { logout, isLoading, error } = useLogout();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Logout Error",
        description: error,
      });
    }
  }, [error]);

  const updatedMenuItems = userMenuItems.concat([
    {
      title: "Logout",
      icon: LogOut,
      action: () => logout().then(() => navigate("/login")),
    },
  ]);

  if (isLoading) {
    <Container className="w-screen h-screen">
      <LoadingScreen>Loggin you out...</LoadingScreen>
    </Container>;
  }

  return (
    <Authorized onFail={() => navigate("/login")}>
      <MediaQuery>
        <More>
          <SidebarProvider>
            <UserSidebar items={updatedMenuItems} />
            <Container className="flex flex-col h-screen w-screen">
              <Container className="flex items-center w-full bg-background h-14 justify-between">
                <SidebarTrigger className="ml-2 w-10 h-10 rounded-md text-primary bg-secondary/50 dark:bg-secondary/70 cursor-pointer hover:bg-secondary dark:hover:bg-primary/15 transition-all duration-300" />
                <ThemeSwitch className="relative" />
              </Container>
              <Container className="flex w-full bg-background h-full">
                <Outlet />
              </Container>
            </Container>
          </SidebarProvider>
        </More>
        <Less>
          <Drawer>
            <DrawerContent className="flex flex-col gap-y-10 px-4 items-center justify-center my-8 font-funnel">
              {updatedMenuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url ? item.url : ""}
                  className="flex"
                  onClick={item.action ? item.action : undefined}
                >
                  <item.icon className="mr-2" />
                  <span>{item.title}</span>
                </Link>
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
