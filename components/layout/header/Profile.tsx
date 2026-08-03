import Image from "next/image";
import { User } from "lucide-react";

interface ProfileProps {
  avatarUrl: string | null;
}

export default function Profile({ avatarUrl }: ProfileProps) {
  return (
    <>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="profile"
          width={45}
          height={45}
          className="
            rounded-full
            object-cover
            w-10
            h-10
            cursor-pointer
          "
          priority
        />
      ) : (
        <User
          size={40}
          aria-label="default profile"
          className="rounded-full bg-gray-200 p-2"
        />
      )}
    </>
  );
}
