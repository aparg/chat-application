import ChatTitle from "./ChatTitle";
import ChatTextArea from "./ChatTextArea";
import useReceiverName from "../../../hooks/useReceiverName";
import { ChatArea } from "./ChatArea";
import Layout from "./Layout";
import { AddFriendsSection } from "./AddFriendsSection/AddFriendsSection";
import useMode from "../../../hooks/useMode";
const CenterBox = () => {
  const { receiverName } = useReceiverName();
  const { mode } = useMode();
  return mode === "chat" ? (
    <Layout>
      <ChatTitle titleValue={receiverName} />
      <ChatArea />
      <ChatTextArea />
    </Layout>
  ) : (
    <Layout>
      <ChatTitle titleValue="Friend Requests" icons={false} />
      <AddFriendsSection />
    </Layout>
  );
};

export default CenterBox;
