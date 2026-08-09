import { Home, BarChart3, CalendarDays, Sprout, Bot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

export default function SidebarMenus({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-2">
      {menus.map((menu) => {
        const Icon = menu.icon;
        const active = pathname === menu.href;

        return (
          <Link
            key={menu.href}
            href={menu.href}
            title={collapsed ? menu.label : undefined}
            className={`flex items-center rounded-lg py-3 text-sm transition ${
              collapsed ? "justify-center px-0" : "gap-3 px-4"
            } ${
              active
                ? "bg-indigo-50 font-medium text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon size={18} />
            {!collapsed && <span>{menu.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
