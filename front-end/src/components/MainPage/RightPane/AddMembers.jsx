import Member from "./Member";

export const AddMembers = ({ itemsList, show, onOptionSelect }) => {
  return (
    <div
      className={`w-full relative z-10 overflow-auto max-h-44 ${
        show && "hidden"
      }`}
    >
      {itemsList?.map((data) => {
        return (
          <div onClick={onOptionSelect}>
            <Member username={data.username} key={data.username} />
          </div>
        );
      })}
    </div>
  );
};
