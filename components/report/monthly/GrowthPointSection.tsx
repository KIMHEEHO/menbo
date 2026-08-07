import { Card } from "@/components/ui/card";
import { MonthlyReviewResult } from "@/types/monthlySummaryVO";

type GrowthPointSectionProps = {
  review: MonthlyReviewResult | null;
};

export default function GrowthPointSection({
  review,
}: GrowthPointSectionProps) {
  if (!review) {
    return null;
  }

  const { summary, achievement, growthAreas, nextSteps } = review;

  return (
    <Card className="bg-white p-6  text-black">
      <p>{summary}</p>

      <section>
        <h3 className="text-green-600">🟢 잘한점</h3>

        {achievement.map((item) => (
          <div key={item.title} className="mb-2">
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-yellow-600">🌱 다음단계</h3>
        {growthAreas.map((item) => (
          <div key={item.title} className="mb-2">
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-blue-600">🚀 실천</h3>
        {nextSteps.map((step, index) => (
          <p key={index} className="text-gray-600">
            {step}
          </p>
        ))}
      </section>
    </Card>
  );
}
