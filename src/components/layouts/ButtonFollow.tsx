import React from "react";

interface IFollow {
  isFollow: boolean;
}

const ButtonFollow: React.FC<IFollow> = ({ isFollow }: IFollow) => {
  return (
    <div className="mt-6">
      <button
        className={isFollow ? "text-red-500 text-2xl flex" : "text-green-500"}
      >
        {isFollow ? (
          <svg
            className="h-8 w-8 text-red-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <line x1="18" y1="6" x2="6" y2="18" />{" "}
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : null}

        {isFollow ? "Huy theo doi" : "Theo doi"}
      </button>
    </div>
  );
};

interface IFollow {
  isFollow: boolean;
}

export default ButtonFollow;
