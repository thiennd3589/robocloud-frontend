export enum ChatRole {
  MODEL = "model",
  USER = "user",
}

export type Chat = {
  content: {
    parts: Array<{
      text: string;
    }>;
  };
  role: ChatRole;
};
