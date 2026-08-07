import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GitHubActivityCardProps {
  title: string;
  count: number;
}

export default function GitHubActivityCard({
  title,
  count,
}: GitHubActivityCardProps) {
  return (
    <Card className="rounded-xl border shadow-sm p-4">
      <div className="flex items-center justify-between">
        <p className="text-mdfont-medium text-gray-500">{title}</p>
        <span className="text-4xl font-bold text-black">{count}</span>
      </div>
    </Card>
  );
}
