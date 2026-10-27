import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import InitClient from "@/components/loading/InitClient";

export default async function InitPage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  return <InitClient githubLogin={session.githubLogin} />;
}
