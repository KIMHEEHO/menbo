"use client";

export default function Home() {
  const githubLogin = () => {
    window.location.href = "/api/auth/github";
  };
  return (
    <>
      <button onClick={githubLogin}>GitHub로 시작하기</button>
    </>
  );
}
