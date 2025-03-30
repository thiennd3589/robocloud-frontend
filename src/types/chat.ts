export enum ChatRole {
  MODEL = "model",
  USER = "user",
}

export type Chat = {
  id?: string;
  content: {
    parts: Array<{
      text: string;
    }>;
  };
  role: ChatRole;
};
