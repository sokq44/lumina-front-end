import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { userMenuItems } from "@/lib/menu-items";
import { useLoggedIn, useLogout } from "@/hooks/user";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/theme-switch";
import UserSidebar from "@/components/user-sidebar";
import { useTheme } from "@/components/theme-provider";
import { Less, MediaQuery, More } from "@/components/media-query";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { LoaderCircle, LogOut, PanelBottom, SunMoon } from "lucide-react";

const UserPage = () => {
  const logout = useLogout();
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (loggedIn.error) navigate("/login");

    if (logout.error) {
      toast({
        variant: "destructive",
        title: "Logout Error",
        description: logout.error,
      });
    }
  }, [loggedIn.error, logout.error, toast, navigate]);

  const updatedMenuItems = userMenuItems.concat([
    {
      title: "Logout",
      icon: LogOut,
      action: async () => {
        await logout.logout();
        navigate("/login");
      },
    },
  ]);

  if (logout.isLoading || loggedIn.isLoading) {
    return (
      <Container className="flex items-center justify-center h-screen w-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </Container>
    );
  }

  return (
    <MediaQuery>
      <More>
        <SidebarProvider>
          <UserSidebar items={updatedMenuItems} />
          <Container className="flex flex-col h-screen w-screen">
            <Container className="flex items-center w-full bg-background h-14 justify-between">
              <SidebarTrigger className="ml-2 w-10 h-10 rounded-md text-primary bg-secondary/50 dark:bg-secondary/70 hover:cursor-pointer hover:bg-secondary dark:hover:bg-primary/15 transition-all duration-300" />
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
            <Button className="fixed right-0 z-50 m-2 p-2 rounded-md text-primary bg-gray-200 transition-all duration-300 hover:cursor-pointer hover:bg-secondary dark:bg-gray-800 dark:hover:bg-primary/15">
              <PanelBottom />
            </Button>
          </DrawerTrigger>
        </Drawer>
        <Container className="pt-20 pb-14">
          <Outlet />
        </Container>
      </Less>
    </MediaQuery>
  );
};

export default UserPage;
