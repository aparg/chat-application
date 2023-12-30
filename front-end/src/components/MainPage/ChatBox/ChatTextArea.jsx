import { useRef, useState } from "react";
import sendBtn from "../../../assets/images/icons/send.png";
import { socket } from "../../../socket/socket";
import useConversationId from "../../../hooks/useConversationId";
import useAuth from "../../../hooks/useAuth";
function ChatTextArea() {
  const { conversationId } = useConversationId();
  const { auth } = useAuth();
  const [textData, setTextData] = useState("");
  const sendText = () => {
    const data = {
      conversationId,
      content: textData,
      sender: auth.name,
    };
    socket.emit("chat message", data);
    setTextData("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendText();
  };

  return (
    <div className="relative flex h-1/20 w-11/12">
      <textarea
        className="bg-white resize-none border-0 w-10/12 rounded-3xl text-black flex items-center px-5 text-align-center pt-1 overflow-hidden focus:outline-0"
        onChange={(e) => setTextData(e.target.value)}
        value={textData}
        onKeyDown={handleKeyDown}
      ></textarea>
      <div className="absolute right-0 bg-white text-align-center pt-1 w-3/12 md:rounded-r-3xl rounded-r-4xl h-full flex items-center">
        <img
          src={sendBtn}
          className="inline absolute right-3 hover:cursor-pointer w-2/12"
          onClick={sendText}
        ></img>
      </div>
    </div>
  );
}

export default ChatTextArea;
