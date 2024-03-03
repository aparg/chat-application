import React from "react";

function PrimaryButton({ text, clicked }) {
  return (
    <button
      className="bg-semi-dark-gray basis-2/6 w-full h-3/6 inline-block py-1 px-4"
      onClick={clicked}
    >
      <span className="text-black text-xs">{text}</span>
    </button>
  );
}

export default PrimaryButton;
