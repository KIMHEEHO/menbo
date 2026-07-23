export default function GitHubLoginButton() {
  const githubLogin = () => {
    window.location.href = "/api/auth/github";
  };
  return (
    <>
      <button
        className="flex align-items bg-#2563EB hover text-white  py-4 px-4 rounded text-1xl"
        onClick={githubLogin}
      >
        GitHub로 시작하기
      </button>
    </>
  );
}
