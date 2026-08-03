import DarkMode from "./DarkMode";
import Logout from "./Logout";
import Profile from "./Profile";

interface HeaderButtonProps {
  avatarUrl: string | null;
}

export default function HeaderButton({ avatarUrl }: HeaderButtonProps) {
  return (
    <div className="flex items-center gap-4">
      <Profile avatarUrl={avatarUrl} />
      <DarkMode />
      <Logout />
    </div>
  );
}
