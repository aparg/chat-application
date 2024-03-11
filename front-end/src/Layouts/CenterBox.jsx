import React, { forwardRef } from "react";

const CenterBox = forwardRef(({ children }, ref) => {
  return (
    <section className="flex flex-col overflow-auto h-5/6 p-3 w-full" ref={ref}>
      {children}
    </section>
  );
});

export default CenterBox;
