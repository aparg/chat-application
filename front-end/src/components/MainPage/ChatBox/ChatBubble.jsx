const ChatBubble = ({ content, sender }) => {
  return sender ? (
    <div className="bg-semi-dark-gray max-w-60 rounded-3xl text-black self-end my-3 px-4 py-3">
      {content}
    </div>
  ) : (
    <div className="bg-dark-cream  max-w-60 rounded-3xl text-black self-start my-3 px-4 py-3">
      {content}
    </div>
  );
};

export default ChatBubble;
