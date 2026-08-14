export type Message = {
  id: string;
  userId: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: Date;
};
