import profileImg from "../../../assets/images/profile.jpg";
import Search from "./Search/Search";
import { FriendList } from "./AddFriend/FriendList";
import useAuth from "../../../hooks/useAuth";
import { FriendsProvider } from "../../../context/FriendsContext";
import { AddFriends } from "./AddFriends";
const UserDetails = () => {
  const { auth } = useAuth();
  return (
    <FriendsProvider>
      <section className="flex flex-col w-3/12 h-full relative">
        <section className="flex flex-row my-5 items-center">
          <img
            src={profileImg}
            className="rounded-full border-dark-brown border-2 shadow-gray flex-none w-1/5"
          ></img>
          <div className="text-brown-text font-light flex-auto px-5">
            @{auth.name}
          </div>
        </section>
        <Search />
        <FriendList />
        <AddFriends />
      </section>
    </FriendsProvider>
  );
};

export default UserDetails;
