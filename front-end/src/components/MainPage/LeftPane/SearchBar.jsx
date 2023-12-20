import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchBar() {
  return (
    <>
      {/* <div className="absolute left-0 bg-white text-align-center pt-1 w-3/12 rounded-l-3xl h-full flex items-center">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ color: "#959595" }}
        />
      </div> */}
      <textarea
        className="bg-white resize-none border-0 w-full rounded-3xl text-black flex items-center px-5 pt-1 h-1/20 focus:outline-0"
        placeholder="Search Contact"
      ></textarea>
    </>
  );
}

export default SearchBar;
