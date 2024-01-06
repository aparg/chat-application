import profileImg from "../../../../assets/images/profile.jpg";
import useReceiverName from "../../../../hooks/useReceiverName";
const AddFriendCard = ({ name }) => {
  return (
    <div
      className={`flex items-center my-1.5 w-full rounded-xl p-10 md:p-2 h-20 hover:cursor-pointer justify-center 
      }`}
    >
      <img className="rounded-full w-1/6 basis-1/6" src={profileImg}></img>
      {/* <div className="flex items-center justify-left "> */}
      <div className="text-black font-bold text-2xl md:text-sm basis-2/6 w-full text-center">
        {name}
      </div>
      <button className="bg-gray basis-3/6 w-full">Add Friend</button>
      {/* </div> */}
    </div>
  );
};
export default AddFriendCard;
