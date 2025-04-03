export enum ChatRole {
  MODEL = "model",
  USER = "user",
}

export enum ChatType {
  QUESTION = "question",
  CODE = "code",
}

export type Chat = {
  canCompiled?: boolean;
  compiled?: boolean;
  id?: string;
  content: {
    parts: Array<{
      text: string;
    }>;
  };
  role: ChatRole;
  type: ChatType;
};
