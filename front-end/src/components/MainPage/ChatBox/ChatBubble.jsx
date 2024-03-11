const ChatBubble = ({ content, sender, group = false, writerName = null }) => {
  return sender ? (
    <div className="bg-semi-dark-gray max-w-60 rounded-3xl text-black self-end my-3 px-4 py-3">
      {content}
    </div>
  ) : (
    <div className="self-start max-w-60">
      <span className="text-dark-gray font-thin text-xs pl-5">
        {writerName}
      </span>
      <div
        className={`bg-dark-cream  rounded-3xl text-black  px-4 py-3 ${
          !group && `my-3`
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatBubble;
