import ChatTitle from "./ChatTitle";
import ChatTextArea from "./ChatTextArea";
const Chat = () => {
  return (
    <section className="flex items-center flex-col relative h-full rounded-4xl border-light-cream w-6/12 bg-light-cream shadow-lg md:rounded-3xl md:w-5/12">
      <ChatTitle />
      <ChatTextArea />
    </section>
  );
};

export default Chat;
