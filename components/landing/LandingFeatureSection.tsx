import { ReactNode } from "react";

interface LandingFeatureSectionProps {
  children: ReactNode;
  direction?: "row" | "reverse";
}

export default function LandingFeatureSection({
  children,
  direction = "row",
}: LandingFeatureSectionProps) {
  return (
    <section
      className={`
        min-h-screen
        flex
        items-center
          ${direction === "reverse" ? "flex-row-reverse" : "flex-row"}
      `}
    >
      {children}
    </section>
  );
}
