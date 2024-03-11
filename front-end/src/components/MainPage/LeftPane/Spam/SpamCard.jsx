import { MODES } from "../../../../../constants/modes";
import useMode from "../../../../hooks/useMode";
import useReceiver from "../../../../hooks/useReceiver";
import profileImg from "../../../../assets/images/profile.jpg";
const SpamCard = ({ username, profilePhoto }) => {
  const { mode, setMode } = useMode();
  const { receiver, setReceiver } = useReceiver();
  const handleClick = async () => {
    setReceiver({ username, profilePhoto, group: false });
    mode !== MODES.spam && setMode(MODES.spam);
  };
  return (
    <>
      <div
        className={`self-center flex items-center my-1.5 w-11/12 rounded-xl p-10 md:p-2 h-20 hover:cursor-pointer ${
          receiver?.username === username && "bg-white shadow-md"
        }`}
        onClick={handleClick}
      >
        <img
          className="rounded-full w-1/6 clip-circle"
          src={profilePhoto || profileImg}
        ></img>
        <div className="flex flex-col mx-3">
          <div className="text-black font-bold text-2xl md:text-sm">
            {username}[Spam]
          </div>
          <div className="text-brown-text text-dark-gray md:text-xs">Seen</div>
        </div>
      </div>
    </>
  );
};

export default SpamCard;
