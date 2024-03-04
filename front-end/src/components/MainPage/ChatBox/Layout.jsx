import React from "react";

function Layout({ children }) {
  return (
    <section className="flex items-center flex-col relative h-full rounded-4xl border-light-cream w-6/12 bg-light-cream shadow-lg md:rounded-3xl md:w-5/12">
      {children}
    </section>
  );
}

export default Layout;
