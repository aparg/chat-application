import { useState } from "react";
import { SearchList } from "./SearchList";
import useFriendList from "../../../../hooks/useFriendList";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const { friends } = useFriendList();
  const filteredList = friends?.filter(
    (friend) =>
      friend?.username.toLowerCase().includes(searchValue?.toLowerCase()) &&
      console.log(friend?.username)
  );

  const handleChange = (e) => {
    let value = e.target.value;
    setSearchValue(value);
  };

  const onOptionSelect = () => {
    setSearchValue("");
  };
  return (
    <>
      <input
        className="bg-white resize-none border-0 w-full rounded-3xl text-black flex items-center px-5 pt-1 focus:outline-0"
        placeholder="Search Contact"
        onChange={handleChange}
        value={searchValue}
      ></input>
      <SearchList
        itemsList={filteredList}
        show={!searchValue}
        onOptionSelect={onOptionSelect}
      />
    </>
  );
}

export default Search;
