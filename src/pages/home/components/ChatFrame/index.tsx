import Message from "../../../../components/Message";
import { useGetPublicChatQuery } from "../../../../services/public-chat";

const ChatFrame = () => {
  const { data } = useGetPublicChatQuery(undefined);

  return (
    <>
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Chat</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {data?.map((chat, index) => (
          <Message key={index} chat={chat} />
        ))}
      </div>
    </>
  );
};

export default ChatFrame;
