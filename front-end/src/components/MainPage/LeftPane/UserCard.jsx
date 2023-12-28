import profileImg from "../../../assets/images/profile.jpg";
import useReceiverName from "../../../hooks/useReceiverName";
const UserCard = ({ name }) => {
  const { receiverName, setReceiverName } = useReceiverName();

  const handleClick = async () => {
    setReceiverName(name);
  };
  return (
    <div
      className={`self-center flex items-center my-1.5 w-11/12 rounded-xl p-10 md:p-2 h-20 hover:cursor-pointer ${
        receiverName === name && "bg-white shadow-md"
      }`}
      onClick={handleClick}
    >
      <img className="rounded-full w-1/6" src={profileImg}></img>
      <div className="flex flex-col mx-3">
        <div className="text-black font-bold text-2xl md:text-sm">{name}</div>
        <div className="text-brown-text text-dark-gray md:text-xs">Seen</div>
      </div>
    </div>
  );
};

export default UserCard;
