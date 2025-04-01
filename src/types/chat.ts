export enum ChatRole {
  MODEL = "model",
  USER = "user",
}

export type Chat = {
  compiled?: boolean;
  id?: string;
  content: {
    parts: Array<{
      text: string;
    }>;
  };
  role: ChatRole;
};
