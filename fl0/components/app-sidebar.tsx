import { Calendar, Home, Inbox, Search, Settings, Sun } from "lucide-react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "GRAY",
    url: "#",
    icon: Inbox,
  },
  {
    title: "SUNNY",
    url: "#",
    icon: Sun,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
// style={{ background: "#23495c" }}
// style={{ background: "#007CC2" }} FBD914
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <div className="justify-items-center mx-2 mt-6 mb-2">
          <Image
            className="dark:invert"
            src="/ADG1.png"
            alt="Next.js logo"
            width={180}
            height={50}
            priority
          />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel
            className="tracking-widest font-bold text-md bg-gray-400 text-white rounded-none"
           
          >
            Advance DataGrid
          </SidebarGroupLabel>
          <div className="h-[min-12px] bg-amber-300"></div>
          <SidebarGroupContent>
            <SidebarMenu className="pl-6 mt-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="tracking-widest">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
