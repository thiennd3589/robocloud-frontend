import ChatResponse from "../ChatResponse";
import UserInPut from "../UserInput";
import { Chat, ChatRole } from "../../types/chat";

const Message = ({ chat }: { chat: Chat }) => {
  if (chat.role === ChatRole.MODEL) return <ChatResponse chat={chat} />;
  else return <UserInPut chat={chat} />;
};

export default Message;
