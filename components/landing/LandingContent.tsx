import GitHubLoginButton from "../common/GitHubLoginButton";
import { ReactNode } from "react";

interface LandingContentProps {
  content: ReactNode;
}

export default function LandingContent(props: LandingContentProps) {
  const { content } = props;
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-white">
      <div className="text-2xl space-y-0.5">{content}</div>
      <GitHubLoginButton />
    </div>
  );
}
