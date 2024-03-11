import { useRef, useState, useEffect } from "react";
import sendBtn from "../../../assets/images/icons/send.png";
import { socket } from "../../../socket/socket";
import useConversationId from "../../../hooks/useConversationId";
import useAuth from "../../../hooks/useAuth";
function ChatTextArea() {
  const { conversationId } = useConversationId();
  const { auth } = useAuth();
  const [textData, setTextData] = useState("");
  const [spam, setSpam] = useState(false);
  useEffect(() => {
    setSpam(false);
  }, [conversationId]);
  const sendText = () => {
    setSpam(false);
    const data = {
      conversationId,
      content: textData,
      sender: auth.name,
    };
    socket.emit("chat message", data);
    socket.on("spam detected", showSpamLabel);
    setTextData("");
  };

  const showSpamLabel = () => {
    console.log("spam");
    setSpam(true);
  };

  const spamLabel = (
    <div className="bg-red-200 h-4 text-xs text-center w-11/12 text-black">
      Spam Detected! Message moved to spam section
    </div>
  );

  // loadingLabel = <div className="w-full bg-dark-gray">Sending...</div>;
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendText();
  };

  return (
    <>
      {spam && spamLabel}
      <div className="relative flex h-1/20 w-11/12">
        <input
          className="bg-white resize-none border-0 w-10/12 rounded-3xl text-black flex items-center px-5 text-align-center pt-1 overflow-hidden focus:outline-0 text-md"
          onChange={(e) => setTextData(e.target.value)}
          value={textData}
          onKeyDown={handleKeyDown}
        ></input>
        <div className="absolute right-0 bg-white text-align-center pt-1 w-3/12 md:rounded-r-3xl rounded-r-4xl h-full flex items-center">
          <img
            src={sendBtn}
            className="inline absolute right-3 hover:cursor-pointer w-2/12"
            onClick={sendText}
          ></img>
        </div>
      </div>
    </>
  );
}

export default ChatTextArea;
