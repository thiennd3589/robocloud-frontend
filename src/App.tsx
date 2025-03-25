import SendInput from "./components/SendInput";
import ChatFrame from "./pages/home/components/ChatFrame";

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <ChatFrame />
      <SendInput />
    </div>
  );
}

export default App;
