export default function GitHubLoginButton() {
  const githubLogin = () => {
    window.location.href = "/api/auth/github";
  };
  return (
    <>
      <button
        className="
 flex
 items-center
 bg-blue-600
 hover:bg-blue-700
 text-white
 py-2
 px-3
 rounded-lg
 text-lg
 "
        onClick={githubLogin}
      >
        GitHub로 시작하기
      </button>
    </>
  );
}
