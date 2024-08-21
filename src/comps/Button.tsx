import React from "react";

interface Button {
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ children, onClick }: Button) {
  return (
    // </div>
    // <button
    //   onClick={onClick}
    //   className="group before:block before:absolute before:-inset-1 before:-skew-x-[20deg] before:bg-lime-500 relative inline-block py-1 px-2 before:rounded-sm before:hover:bg-lime-400"
    // >
    //   <span className="relative text-white group-hover:text-black">
    //     {children}
    //   </span>
    // </button>
    <button
      onClick={onClick}
      className="group before:block before:absolute before:-inset-1 before:-skew-x-[20deg] relative inline-block md:py-1 md:px-2 before:rounded-sm before:bg-lime-500 before:hover:bg-lime-300"
    >
      <span className="relative text-white group-hover:text-black text-xs md:text-xl flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}

export default Button;
