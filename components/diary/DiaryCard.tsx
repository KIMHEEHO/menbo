import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type DiaryCardProps = {
  title: string;
  content: string;
  date: Date;
};

export function DiaryCard({ title, content, date }: DiaryCardProps) {
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="text-black">{title}</CardTitle>
        <CardDescription className="text-black text-right">
          {date.toLocaleDateString()}의 기록
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <p className="text-black">{content}</p>
      </CardContent>
    </Card>
  );
}
