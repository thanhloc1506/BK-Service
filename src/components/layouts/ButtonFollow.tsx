import React from "react";

interface IFollow {
  isFollow: boolean;
}

const ButtonFollow: React.FC<IFollow> = ({ isFollow }: IFollow) => {
  console.log(isFollow);
  return (
    <div className="mt-6">
      <button
        className={
          isFollow
            ? "text-red-500 text-xl flex"
            : "text-green-500  text-xl flex"
        }
      >
        {isFollow ? (
          <svg
            className="h-6 w-6 text-red-500 mt-0.5"
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
        ) : (
          <svg
            className="h-6 w-6 text-green-500 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        <p className="ml-2">{isFollow ? "Huy theo doi" : "Theo doi"}</p>
      </button>
    </div>
  );
};

interface IFollow {
  isFollow: boolean;
}

export default ButtonFollow;
