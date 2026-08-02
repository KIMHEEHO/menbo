import { ReactNode } from "react";

interface LandingSectionProps {
  children: ReactNode;
  align?: "center" | "left" | "right";
}

export default function LandingSection({
  children,
  align = "center",
}: LandingSectionProps) {
  const alignStyle = {
    center: "justify-center text-center",
    left: "justify-start text-left",
    right: "justify-end text-right",
  };

  return (
    <section
      className={`
        min-h-screen
        flex
        items-center
        ${alignStyle[align]}
      `}
    >
      {children}
    </section>
  );
}
