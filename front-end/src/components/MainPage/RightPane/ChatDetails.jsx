import profileImg from "../../../assets/images/profile.jpg";
import mediaImg from "../../../assets/images/media.jpg";
import useReceiverName from "../../../hooks/useReceiverName";
const ChatDetails = () => {
  const { receiverName } = useReceiverName();
  return (
    <section className="flex flex-col w-3/12 h-full text-black">
      <section className="flex flex-col h-full">
        {receiverName && (
          <img
            src={profileImg}
            className="rounded-full border-dark-brown border-2 shadow-gray flex-none w-4/12 mt-10 self-center"
          ></img>
        )}
        <span className="text-black md:text-2xl font-bold text-md my-5 self-center">
          {receiverName}
        </span>
        {/*line*/}
        <span className="bg-dark-gray h-0.5 w-full my-5"></span>
        <span className="font-bold">Shared media</span>
        <div className="flex flex-row h-1/6 w-full overflow-x-scroll flex-nowrap">
          <img
            src={mediaImg}
            className="h-5/6 w-screen bg-dark-gray mx-3"
          ></img>
          <img src={mediaImg} className="h-5/6 w-3/6 bg-dark-gray mx-3"></img>
          <img src={mediaImg} className="h-5/6 w-3/6 bg-dark-gray mx-3"></img>
          <img src={mediaImg} className="h-5/6 w-3/6 bg-dark-gray mx-3"></img>
          <img src={mediaImg} className="h-5/6 w-3/6 bg-dark-gray mx-3"></img>
        </div>
        <span className="bg-dark-gray h-0.5 w-full my-5"></span>
        <span className="font-bold">Attachments</span>
        <div className="flex flex-row h-1/6 w-full overflow-x-scroll flex-nowrap">
          <img
            src={mediaImg}
            className="h-5/6 w-screen bg-dark-gray mx-3"
          ></img>
          <img src={mediaImg} className="h-5/6 w-3/6 bg-dark-gray mx-3"></img>
          <img src={mediaImg} className="h-5/6 w-3/6 bg-dark-gray mx-3"></img>
          <img src={mediaImg} className="h-5/6 w-3/6 bg-dark-gray mx-3"></img>
          <img src={mediaImg} className="h-5/6 w-3/6 bg-dark-gray mx-3"></img>
        </div>
      </section>
    </section>
  );
};

export default ChatDetails;
