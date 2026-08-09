import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { GitHubAvatar } from "../common/GitHubAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout } from "@/actions/logout";

interface SidebarProfileProps {
  name: string;
  url: string | null;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
export default function SidebarProfile({
  name,
  url,
  collapsed,
  setCollapsed,
}: SidebarProfileProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex h-10 items-center rounded-lg hover:bg-gray-100 ${
            collapsed ? "w-20 justify-center" : "gap-3 px-2"
          }`}
        >
          <GitHubAvatar avatarUrl={url ?? ""} name={name} />
          {!collapsed && (
            <span className="text-sm font-medium text-gray-700">{name}</span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" className="w-32">
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" onClick={() => logout()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/** 토글 버튼 */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        aria-label={collapsed ? "사이드바 확장" : "사이드바 축소"}
      >
        {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
      </button>
    </div>
  );
}
