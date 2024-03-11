import ChatTitle from "./ChatTitle";
import ChatTextArea from "./ChatTextArea";
import useReceiver from "../../../hooks/useReceiver";
import { ChatArea } from "./ChatArea";
import Layout from "./Layout";
import { AddFriendsSection } from "./AddFriendsSection/AddFriendsSection";
import useMode from "../../../hooks/useMode";
import { MODES } from "../../../../constants/modes";
import EditProfile from "../../Profile/EditProfile";
import SpamArea from "../LeftPane/Spam/SpamArea";
import EmptyChat from "../../EmptyChat/EmptyChat";
const CenterBox = () => {
  const { receiver } = useReceiver();
  const { mode } = useMode();
  let boxContent = <></>;
  if (mode === MODES.chat) {
    boxContent = receiver ? (
      <>
        <ChatTitle titleValue={receiver?.username} />
        <ChatArea />
        <ChatTextArea />
      </>
    ) : (
      <EmptyChat />
    );
  } else if (mode === MODES.addFriends) {
    boxContent = (
      <>
        <ChatTitle titleValue="Friend Requests" icons={false} />
        <AddFriendsSection />
      </>
    );
  } else if (mode === MODES.editProfile) {
    boxContent = (
      <>
        <ChatTitle titleValue="Edit Profile" icons={false} />
        <EditProfile />
      </>
    );
  } else if (mode === MODES.spam) {
    boxContent = receiver ? (
      <>
        <ChatTitle titleValue={receiver?.username} />
        <SpamArea />
      </>
    ) : (
      <EmptyChat />
    );
  }
  return <Layout>{boxContent}</Layout>;
};

export default CenterBox;
