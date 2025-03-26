import SendInput from "../../components/SendInput";
import ChatFrame from "./components/ChatFrame";

function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#1C1C1D] text-white">
      <ChatFrame />
      <SendInput />
    </div>
  );
}

export default Home;
