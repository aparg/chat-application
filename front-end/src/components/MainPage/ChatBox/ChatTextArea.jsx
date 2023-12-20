import sendBtn from "../../../assets/images/icons/send.png";

function ChatTextArea() {
  return (
    <div className="absolute bottom-5 w-11/12 flex h-1/20">
      <textarea className="bg-white resize-none border-0 w-10/12 rounded-3xl text-black flex items-center px-5 text-align-center pt-1 overflow-hidden focus:outline-0"></textarea>
      <div className="absolute right-0 bg-white text-align-center pt-1 w-3/12 md:rounded-r-3xl rounded-r-4xl h-full flex items-center">
        <img
          src={sendBtn}
          className="inline absolute right-3 hover:cursor-pointer w-2/12"
        ></img>
      </div>
    </div>
  );
}

export default ChatTextArea;
