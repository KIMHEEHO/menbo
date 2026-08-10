import { DiaryClient } from "@/components/diary/DiaryClient";
import { getSession } from "@/lib/session";
export default async function aiDiary() {
  const session = await getSession();
  return (
    <>
      <DiaryClient accessToken={session.accessToken} />
    </>
  );
}
