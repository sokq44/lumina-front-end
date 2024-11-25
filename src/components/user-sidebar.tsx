import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Separator from "./separator";
import { Link } from "react-router-dom";
import { MenuItem } from "@/lib/menu-items";
import { FC } from "react";

interface UserSidebarProps {
  items: MenuItem[];
}

const UserSidebar: FC<UserSidebarProps> = ({ items }) => {
  return (
    <Sidebar className="border-none">
      <div className="flex w-full h-full">
        <div className="flex flex-col w-full">
          <SidebarContent>
            <SidebarGroup className="my-auto">
              <SidebarGroupContent>
                <SidebarMenu className="flex flex-col gap-y-4 items-center">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="w-32 p-4 text-base transition-all duration-300"
                      >
                        <Link
                          to={item.url ? item.url : ""}
                          onClick={item.action ? item.action : undefined}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
        <Separator orientation="vertical" />
      </div>
    </Sidebar>
  );
};

export default UserSidebar;
