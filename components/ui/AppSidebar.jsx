import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
const items = [
  {
    title: "Node.js",
    url: "#",
    //icon: Home,
  },
  {
    title: "Python",
    url: "#",
    //icon: Inbox,
  },
  //   {
  //     title: "Calendar",
  //     url: "#",
  //     //icon: Calendar,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     //icon: Search,
  //   },
  //   {
  //     title: "Settings",
  //     url: "#",
  //     //icon: Settings,
  //   },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarTrigger className="ml-65 mt-3.5" />
      <SidebarContent>
        <SidebarHeader className="text-3xl font-bold">ClassMate</SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>courses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {/* <item.//icon /> */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-6 mb-18">
        <div className="flex space-x-4 text-xl">
          <a href="https://x.com/Girish_Sinha06" target="blank">
            <FaXTwitter />
          </a>
          <a href="https://github.com/girishsinha" target="blank">
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/girish-sinha-20ab3a258/"
            target="blank"
          >
            <FaLinkedin />
          </a>
        </div>
        <a href="https://girishsinha.dev" target="blank">
          Girishsinha.dev
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
