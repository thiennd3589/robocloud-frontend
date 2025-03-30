import { useGetConversationQuery } from "../../../services/conversation";
import ConversationItem from "./conversation-item";

const AuthenSider = () => {
  const { data } = useGetConversationQuery(undefined);

  return (
    <div className="flex flex-col px-[5px]">
      <h2 className="font-medium text-[18px] mt-5 mb-2">Lịch sử trò chuyện</h2>
      {data?.map((conv, index) => (
        <ConversationItem key={conv.id} {...{ ...conv, index }} />
      ))}
    </div>
  );
};

export default AuthenSider;
