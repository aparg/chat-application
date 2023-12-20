import audioCall from "../../../assets/images/icons/audio-call.png";
import videoCall from "../../../assets/images/icons/video-call.png";
import info from "../../../assets/images/icons/info.png";
import useReceiverName from "../../../hooks/useReceiverName";
const ChatTitle = () => {
  const { receiverName } = useReceiverName();
  return (
    <section className="h-1/10 bg-dark-gray flex items-center pl-10 md:rounded-t-3xl rounded-t-4xl w-full relative">
      <span className="text-black md:text-2xl font-bold text-xl">
        {receiverName}
      </span>
      <div className="absolute justify-end right-5">
        <img className="inline mx-2 hover:cursor-pointer" src={videoCall}></img>
        <img className="inline mx-2 hover:cursor-pointer" src={audioCall}></img>
        <img className="inline mx-2 hover:cursor-pointer" src={info}></img>
      </div>
    </section>
  );
};

export default ChatTitle;
