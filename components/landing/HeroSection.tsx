import GitHubLoginButton from "../common/GitHubLoginButton";

export default function HeroSection() {
  return (
    <section>
      <h4>
        개발자는 자신의 성장을 가장 늦게 알아차립니다.
        <br />
        오늘도
        <span className="italic "> &quot;나 아무것도 안했어&quot; </span>
        라고 생각했나요?
        <br />
        GitHub 활동을 기반으로, 당신의 성장을 객관적인 데이터로 함께 돌아보는
        <br />
        AI 기반 개발자 성장 분석 서비스,
        <span className="font-bold"> MENBO</span>
      </h4>
      <GitHubLoginButton />
    </section>
  );
}
