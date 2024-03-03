import profileImg from "../../../assets/images/profile.jpg";
import Search from "./Search/Search";
import { FriendList } from "./FriendList";
import useAuth from "../../../hooks/useAuth";
import { FriendsProvider } from "../../../context/FriendsContext";
import { AddFriends } from "./AddFriends/AddFriends";
import FriendRequests from "./AddFriends/FriendRequests";
const UserDetails = () => {
  const { auth } = useAuth();
  return (
    <FriendsProvider>
      <section className="flex flex-col justify-between w-3/12 h-full relative">
        <section className="flex flex-row basis-2/12 items-center">
          <img
            src={profileImg}
            className="rounded-full border-dark-brown border-2 shadow-gray flex-none w-1/5"
          ></img>
          <div className="text-brown-text font-light flex-auto px-5">
            @{auth.name}
          </div>
        </section>
        <Search />
        <h1 className="text-black font-bold text-3xl">Inbox</h1>
        <FriendList />
        <AddFriends expandable={true} />
      </section>
    </FriendsProvider>
  );
};

export default UserDetails;
