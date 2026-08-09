import { getUserInfo } from "@/actions/getUserInfo";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/Sidebar";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const userInfo = await getUserInfo(session.userId);
  if (!userInfo) {
    return null;
  }
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar name={userInfo.userName} url={userInfo.avatarUrl} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
