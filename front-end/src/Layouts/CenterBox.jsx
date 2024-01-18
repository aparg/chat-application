import React, { forwardRef } from "react";

const CenterBox = forwardRef(({ children }, ref) => {
  return (
    <section
      className="flex flex-col overflow-y-scroll h-4/5 p-3 w-full"
      ref={ref}
    >
      {children}
    </section>
  );
});

export default CenterBox;
