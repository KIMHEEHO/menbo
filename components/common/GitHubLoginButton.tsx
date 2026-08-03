export default function GitHubLoginButton() {
  const githubLogin = () => {
    window.location.href = "/api/auth/github";
  };
  return (
    <div className="text-center">
      <button onClick={githubLogin} className="cursor-pointer">
        GitHub로 시작하기
      </button>
    </div>
  );
}
