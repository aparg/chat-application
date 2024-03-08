import { useState } from "react";
import useFriendList from "../../../hooks/useFriendList";
import { AddMembers } from "./AddMembers";

function SearchMembers() {
  const [searchValue, setSearchValue] = useState("");
  const { friends } = useFriendList();
  const filteredList = friends?.filter((friend) =>
    friend?.username.toLowerCase().includes(searchValue?.toLowerCase())
  );

  const handleChange = (e) => {
    let value = e.target.value;
    setSearchValue(value);
  };

  const onOptionSelect = () => {
    setSearchValue("");
  };
  return (
    <div className="">
      <input
        className="bg-white resize-none border-0 w-full rounded-3xl text-black flex items-center px-5 pt-1 focus:outline-0"
        placeholder="Search Contact"
        onChange={handleChange}
        value={searchValue}
      ></input>
      <AddMembers
        itemsList={filteredList}
        show={!searchValue}
        onOptionSelect={onOptionSelect}
      />
    </div>
  );
}

export default SearchMembers;
