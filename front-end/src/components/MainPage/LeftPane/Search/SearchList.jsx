import UserCard from "../UserCard";
import { v4 as uuidv4 } from "uuid";
export const SearchList = ({ itemsList, show, onOptionSelect }) => {
  return (
    <div
      className={`w-full relative z-10 overflow-auto max-h-44 ${
        show && "hidden"
      }`}
    >
      {itemsList?.map((data) => {
        return (
          <div onClick={onOptionSelect}>
            <UserCard name={data} search={true} key={uuidv4()} />
          </div>
        );
      })}
    </div>
  );
};
