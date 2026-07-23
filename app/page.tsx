"use client";

import LandingContent from "@/components/landing/LandingContent";

export default function Home() {
  const content = (
    <>
      <p>개발자는 자신의 성장을 가장 늦게 알아차립니다.</p>
      <br />
      <p>
        오늘도
        <span className="italic"> &quot;나 아무것도 안했어&quot; </span>
        라고 생각했나요?
      </p>
      <br />
      <p>
        GitHub 활동을 기반으로, 당신의 성장을 객관적인 데이터로 함께 돌아보는
      </p>
      <br />
      <p>
        AI 기반 개발자 성장 분석 서비스,
        <span className="font-bold"> MENBO</span>{" "}
      </p>
    </>
  );
  return (
    <>
      <LandingContent content={content} />
    </>
  );
}
