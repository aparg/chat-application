import profileImg from "../../../assets/images/profile.jpg";
import Search from "./Search";
import { FriendList } from "./FriendList";
import useAuth from "../../../hooks/useAuth";
import { FriendsProvider } from "../../../context/FriendsContext";
const UserDetails = () => {
  const { auth } = useAuth();
  return (
    <FriendsProvider>
      <section className="flex flex-col w-3/12 h-full">
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
      </section>
    </FriendsProvider>
  );
};

export default UserDetails;
