"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GitHubAvatarProps {
  avatarUrl?: string | null;
  name: string;
}
export function GitHubAvatar({ avatarUrl, name }: GitHubAvatarProps) {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
      <Avatar>
        <AvatarImage
          src={avatarUrl || "https://github.com/shadcn.png"}
          alt="shadcn"
        />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  );
}
