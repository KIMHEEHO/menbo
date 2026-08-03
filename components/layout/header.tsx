import { getSession } from "@/lib/session";
import HeaderButton from "./header/HeaderButton";
import { getUserInfo } from "@/actions/getUserInfo";
export default async function Header() {
  const session = await getSession();
  const userInfo = await getUserInfo(session.userId);

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex-center text-4xl font-black tracking-[0.08em] text-white">
          MENBO
        </div>
        {session.isLoggedIn && <HeaderButton avatarUrl={userInfo.avatarUrl} />}
      </header>
    </>
  );
}
