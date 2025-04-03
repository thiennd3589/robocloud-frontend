import { Chat } from "../../types/chat";
// import ImportCodeBtn from "../import-code-btn";
import TypingMarkdown from "../MardownTyping";

const ChatResponse = ({ chat }: { chat: Chat }) => {
  return (
    <>
      {/* <ImportCodeBtn
        messageId={chat.id!}
        className="mx-7"
        disabled={!chat.compiled}
      /> */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className={"mb-4 text-left"}>
          {chat?.content?.parts?.map(({ text }, index) => (
            <div
              key={index}
              className={`inline-block p-3 rounded-lg text-white`}
            >
              <TypingMarkdown markdownText={text} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatResponse;
