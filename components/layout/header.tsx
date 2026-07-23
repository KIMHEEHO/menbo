import { getSession } from "@/lib/session";
import HeaderButton from "./HeaderButton";

export default async function Header() {
  const session = await getSession();
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex-center text-4xl font-black tracking-[0.08em] text-white">
          MENBO
        </div>
        {session.isLoggedIn && <HeaderButton />}
      </header>
    </>
  );
}
