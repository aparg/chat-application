import Search from "./Search/Search";
import { AddFriends } from "./AddFriends/AddFriends";
import ProfileDetail from "./ProfileDetail";
import ChatList from "./ChatList/ChatList";

const UserDetails = () => {
  return (
    <section className="flex flex-col justify-between w-3/12 h-full relative">
      <ProfileDetail />
      <Search />
      <h1 className="text-black font-bold text-3xl">Inbox</h1>
      <ChatList />
      <AddFriends expandable={true} />
    </section>
  );
};

export default UserDetails;
