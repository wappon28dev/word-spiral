export type Answer = {
  response: string;
};

export type Message = {
  content: string;
  role: "user" | "system" | "assistant";
};
