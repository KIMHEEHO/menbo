"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, CalendarDays, Sprout, Bot } from "lucide-react";

const menus = [
  {
    label: "홈",
    href: "/home",
    icon: Home,
  },
  {
    label: "주간 성장",
    href: "/growth/weekly",
    icon: CalendarDays,
  },
  {
    label: "월간 성장",
    href: "/growth/monthly",
    icon: BarChart3,
  },
  {
    label: "AI 일기",
    href: "/diary",
    icon: Sprout,
  },
  {
    label: "AI 채팅",
    href: "/chat",
    icon: Bot,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-full w-64 flex-col border-r bg-white p-6">
      {/* 메뉴 */}
      <nav className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          const active = pathname === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`
                flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition
                ${
                  active
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              <Icon size={18} />
              {menu.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
