import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { userMenuItems } from "@/lib/menu-items";
import { useLoggedIn, useLogout } from "@/hooks/user";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/theme-switch";
import UserSidebar from "@/components/user-sidebar";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { LoaderCircle, LogOut, PanelBottom, SunMoon } from "lucide-react";

const UserPage = () => {
  const logout = useLogout();
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:1024px)");
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

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

  if (logout.isLoading || loggedIn.isLoading) {
    return (
      <Container className="flex items-center justify-center h-screen w-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </Container>
    );
  }

  if (matches) {
    return (
      <SidebarProvider>
        <UserSidebar items={updatedMenuItems} />
        <Container className="flex flex-col h-screen w-screen">
          <Container className="flex items-center w-full bg-background h-14 justify-between">
            <SidebarTrigger className="ml-2 w-10 h-10 transition-all duration-300" />
            <ThemeSwitch className="relative" />
          </Container>
          <Container className="flex w-full bg-background h-full">
            <Outlet />
          </Container>
        </Container>
      </SidebarProvider>
    );
  }

  return (
    <Drawer>
      <DrawerContent className="flex flex-col gap-y-10 px-4 items-center justify-center my-8">
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
          <p className="text-base">Toggle Theme</p>
        </Button>
      </DrawerContent>
      <Container className="flex flex-col items-center p-2 gap-y-2 h-screen w-screen">
        <Container className="flex items-center justify-between w-full mb-2 gap-x-2">
          <DrawerTrigger className="w-12 h-12 flex">
            <PanelBottom
              className="self-center"
              strokeWidth="1.2px"
              size={48}
            />
          </DrawerTrigger>
        </Container>
        <Container className="h-full">{/* Place For The Articles */}</Container>
        <Separator orientation="horizontal" />
        <Container className="w-full flex items-center justify-center">
          <Pagination className="text-muted-foreground font-semibold">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Container>
      </Container>
    </Drawer>
  );
};

export default UserPage;
