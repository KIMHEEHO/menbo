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
export default function GitHubActivityCard(props: GitHubActivityCardProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-4xl font-bold text-right">{props.count}</h1>
        </CardContent>
      </Card>
    </div>
  );
}
