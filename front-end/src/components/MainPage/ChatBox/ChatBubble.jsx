const ChatBubble = ({ content, sender }) => {
  return sender ? (
    <div className="bg-dark-gray max-w-60 rounded-md text-black items-start">
      {content}
    </div>
  ) : (
    <div className="bg-light-cream max-w-60 rounded-md text-black items-end">
      {content}
    </div>
  );
};

export default ChatBubble;
