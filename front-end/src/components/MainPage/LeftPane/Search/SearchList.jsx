import UserCard from "../UserCard";

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
            <UserCard name={data} search={true} key={data} />
          </div>
        );
      })}
    </div>
  );
};
