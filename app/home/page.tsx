import { getSession } from "@/lib/session";

export default async function home() {
  const session = await getSession();

  return (
    <>
      <span>좋은 하루에요 {session.isLoggedIn && session.githubLogin}님</span>
      <span>오늘은 어떤 하루였나요? </span>
      <div>
        오늘 하루를 되돌아보며, 나의 활동을 분석하고, 더 나은 내일을 위해 계획을
        세워보세요.
      </div>
    </>
  );
}
