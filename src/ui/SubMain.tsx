import React from "react";

export default function SubMain({ children }) {
  return (
    <div className="p-2 lg:p-8  flex-1">
      <div className={` max-w-300 mx-auto `}>{children}</div>
    </div>
  );
}
