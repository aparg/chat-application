import { useRef, useState } from "react";
import sendBtn from "../../../assets/images/icons/send.png";
import { socket } from "../../../socket/socket";
import useReceiverName from "../../../hooks/useReceiverName";
import useConversationId from "../../../hooks/useConversationId";
function ChatTextArea() {
  const { conversationId } = useConversationId();
  const [textData, setTextData] = useState("");
  const sendText = () => {
    const data = {
      conversationId,
      content: textData,
    };
    console.log(data);
    socket.emit("chat message", data);
  };
  return (
    <div className="absolute bottom-5 w-11/12 flex h-1/20">
      <textarea
        className="bg-white resize-none border-0 w-10/12 rounded-3xl text-black flex items-center px-5 text-align-center pt-1 overflow-hidden focus:outline-0"
        onChange={(e) => setTextData(e.target.value)}
        value={textData}
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
