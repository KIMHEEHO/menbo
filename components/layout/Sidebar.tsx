"use client";
import { useState } from "react";

import SidebarMenus from "./SidebarMenus";
import SidebarProfile from "./SidebarProfile";

interface SidebarProps {
  name: string;
  url: string | null;
}

export default function Sidebar({ name, url }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`hidden md:flex h-full flex-col border-r bg-white p-4 transition-all duration-300 ${
        collapsed ? "w-32" : "w-56"
      }`}
    >
      {/* 프로필 */}
      <SidebarProfile
        name={name}
        url={url}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      {/* 메뉴 */}
      <SidebarMenus collapsed={collapsed} />
    </aside>
  );
}
