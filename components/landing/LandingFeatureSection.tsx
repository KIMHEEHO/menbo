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
          section
          flex        
          items-center
        ml-4
        mr-4
          ${direction === "reverse" ? "flex-row-reverse" : "flex-row"}
      `}
    >
      {children}
    </section>
  );
}
