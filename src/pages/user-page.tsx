import SearchBar from "@/components/search-bar";
import Separator from "@/components/separator";
import { useTheme } from "@/components/theme-provider";
import ThemeSwitch from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserSidebar from "@/components/user-sidebar";
import { useToast } from "@/hooks/use-toast";
import { useLoggedIn, useLogout } from "@/hooks/user";
import { userMenuItems } from "@/lib/menu-items";
import { LoaderCircle, LogOut, PanelBottom, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

const UserPage = () => {
  const logout = useLogout();
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState<string>("");
  const matches = useMediaQuery("(min-width:1024px)");

  const updatedMenuItems = userMenuItems.concat([
    {
      title: "Logout",
      icon: LogOut,
      action: () => {
        logout.logout();
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
      <div className="flex items-center justify-center h-screen w-screen">
        <LoaderCircle size={24} className="animate-spin" />
      </div>
    );
  }

  if (matches) {
    return (
      <SidebarProvider>
        <UserSidebar items={updatedMenuItems} />
        <div className="flex flex-col h-screen w-screen">
          <div className="flex items-center w-full bg-background h-20">
            <SidebarTrigger className="ml-2 w-10 h-10 transition-all duration-300" />
            <div className="flex justify-center w-full">
              <SearchBar
                onSearch={() => console.log(search)}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <ThemeSwitch className="mr-2" />
          </div>
          <Separator orientation="horizontal" />
          <div className="flex w-full bg-background h-full">
            {/* Place For The Articles */}
          </div>
          <Separator orientation="horizontal" />
          <div className="w-full h-20 flex items-center justify-center">
            <Pagination className="text-muted-foreground w-auto font-semibold">
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
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <Drawer>
      <DrawerContent className="flex flex-col gap-y-10 px-4 items-center justify-center my-8">
        {updatedMenuItems.map((item) => (
          <Link
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
      <div className="flex flex-col items-center p-2 gap-y-2 h-screen w-screen">
        <div className="flex items-center justify-between w-full mb-2 gap-x-2">
          <div className="flex justify-center w-full">
            <SearchBar
              onSearch={() => console.log(search)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DrawerTrigger className="w-12 h-12 flex">
            <PanelBottom
              className="self-center"
              strokeWidth="1.2px"
              size={48}
            />
          </DrawerTrigger>
        </div>
        <div className="h-full">{/* Place For The Articles */}</div>
        <Separator orientation="horizontal" />
        <div className="w-full flex items-center justify-center">
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
        </div>
      </div>
    </Drawer>
  );
};

export default UserPage;
