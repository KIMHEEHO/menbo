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
      <header className="h-16 flex items-center justify-between px-6 bg-white border-b">
        <div className="flex-center text-center text-4xl font-black tracking-[0.08em] text-black ">
          <h1 className="text-4xl font-black tracking-[0.08em] text-black">
            MENBO
          </h1>
        </div>
        {session.isLoggedIn && <HeaderButton />}
      </header>
    </>
  );
}
