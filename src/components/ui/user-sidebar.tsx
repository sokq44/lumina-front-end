import { FC } from "react";
import { MenuItem } from "@/lib/menu-items";
import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Button } from "./button";

interface UserSidebarProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

const UserSidebar: FC<UserSidebarProps> = ({ items, onItemClick }) => {
  return (
    <Sidebar className="border-none">
      <Container className="flex w-full h-full">
        <Container className="flex flex-col w-full">
          <SidebarContent>
            <SidebarGroup className="my-auto">
              <SidebarGroupContent>
                <SidebarMenu className="flex flex-col gap-y-4 items-center">
                  {items.map((item) => (
                    <SidebarMenuItem className="list-none" key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className="w-32 p-2 text-base transition-all duration-300"
                      >
                        <Button
                          variant={"ghost"}
                          onClick={() => onItemClick(item)}
                          className="justify-start font-normal"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Container>
        <Separator orientation="vertical" />
      </Container>
    </Sidebar>
  );
};

export default UserSidebar;
