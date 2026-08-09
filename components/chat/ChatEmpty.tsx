import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MessageCircleDashedIcon } from "lucide-react";

export default function ChatEmpty({ userName }: { userName: string }) {
  return (
    <>
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageCircleDashedIcon />
          </EmptyMedia>
          <EmptyTitle className="text-black">
            안녕 {userName}! 오늘은 어떤 하루였나요?
          </EmptyTitle>
          <EmptyDescription>
            <br />
            위로와 격려가 필요한가요? 아니면 새로운 아이디어가 필요하신가요?
            <br />
            멘보가 함께할게요.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </>
  );
}
