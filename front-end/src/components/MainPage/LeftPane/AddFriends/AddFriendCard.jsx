import profileImg from "../../../../assets/images/profile.jpg";
import useReceiverName from "../../../../hooks/useReceiverName";
const AddFriendCard = ({ name }) => {
  const { receiverName, setReceiverName } = useReceiverName();

  const handleClick = async () => {
    setReceiverName(name);
  };
  return (
    <div
      className={`self-center flex items-center my-1.5 w-full rounded-xl p-10 md:p-2 h-20 hover:cursor-pointer items-center  justify-items-stretch ${
        receiverName === name && "bg-white shadow-md"
      }`}
      onClick={handleClick}
    >
      <img className="rounded-full w-1/6" src={profileImg}></img>
      <div className="flex mx-3 items-center">
        <div className="text-black font-bold text-2xl md:text-sm">{name}</div>
        <button className="bg-gray h-3/6">Add Friend</button>
      </div>
    </div>
  );
};
export default AddFriendCard;
