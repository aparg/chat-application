const ChatBubble = ({ content, sender }) => {
  return sender ? (
    <div className="bg-dark-gray  max-w-60 rounded-md text-black self-end my-3 p-2">
      {content}
    </div>
  ) : (
    <div className="bg-dark-cream  max-w-60 rounded-md text-black items-start my-3 p-2">
      {content}
    </div>
  );
};

export default ChatBubble;
