"use client";
import { logout } from "@/actions/logout";
import { LogOut } from "lucide-react";
export default function Logout() {
  return <LogOut size={35} onClick={logout} className="cursor-pointer" />;
}
