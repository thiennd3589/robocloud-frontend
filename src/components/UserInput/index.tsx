import { Chat } from "../../types/chat";

const UserInPut = ({ chat }: { chat: Chat }) => {
  return (
    <div className={`mb-4 text-right`}>
      {chat.content?.parts?.map((part, index) => (
        <div
          key={index}
          className={`inline-block p-3 rounded-lg bg-blue-600 text-white`}
        >
          {<p>{part.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default UserInPut;
