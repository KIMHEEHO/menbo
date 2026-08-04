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
        <CardContent>{props.count}</CardContent>
      </Card>
    </div>
  );
}
