import React from "react";

export const SecondaryButton = ({ clicked, text }) => {
  return (
    <button
      className="bg-white basis-2/6 w-full h-1/6 inline-block py-1 px-4 border-gray"
      onClick={clicked}
    >
      <span className="text-black text-xs">{text}</span>
    </button>
  );
};
