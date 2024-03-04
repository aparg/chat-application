import Search from "./Search/Search";
import { FriendList } from "./FriendList";
import { FriendsProvider } from "../../../context/FriendsContext";
import { AddFriends } from "./AddFriends/AddFriends";
import ProfileDetail from "./ProfileDetail";

const UserDetails = () => {
  return (
    <FriendsProvider>
      <section className="flex flex-col justify-between w-3/12 h-full relative">
        <ProfileDetail />
        <Search />
        <h1 className="text-black font-bold text-3xl">Inbox</h1>
        <FriendList />
        <AddFriends expandable={true} />
      </section>
    </FriendsProvider>
  );
};

export default UserDetails;
