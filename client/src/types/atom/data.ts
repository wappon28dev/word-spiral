export type ActionStatus = {
  message: string;
  from: string;
  status: "success" | "error" | "warning" | "loading";
};
