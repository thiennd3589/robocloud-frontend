import SendInput from "../../components/SendInput";
import ChatFrame from "./components/ChatFrame";
import FrameHeader from "./components/frame-header";

function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#1C1C1D] text-white">
      <FrameHeader />
      <ChatFrame />
      <SendInput />
    </div>
  );
}

export default Home;
