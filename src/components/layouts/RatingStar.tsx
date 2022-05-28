import React from "react";
import solidStar from "../../assets/service/star-solid.svg";

interface IRating {
  rating: number | string;
}

const SolidStar = () => {
  return (
    <div className="2xl:mt-[-1.5px] xl:mt-[-1.5px] lg:mt-[-1px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="2xl:w-6 2xl:h-6 xl:h-[1.2rem] xl:w-[1.2rem] lg:h-3.5 lg:w-3.5 text-yellow-300"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
  );
};

const EmptyStar = () => {
  return (
    <div className="2xl:mt-[0.5px] ml-0.5 xl:mt-[0px] lg:mt-[0px]">
      <svg
        className="2xl:h-5 2xl:w-5 xl:w-4 xl:h-4 lg:w-3 lg:h-3 text-yellow-300"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {" "}
        <path stroke="none" d="M0 0h24v24H0z" />{" "}
        <path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
      </svg>
    </div>
  );
};

const RatingStar: React.FC<IRating> = ({ rating }) => {
  if (rating < 0)
    return (
      <>
        <div className="flex">
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
          <EmptyStar />
        </div>
      </>
    );

  if (rating > 8) {
    return (
      <div className="flex">
        <SolidStar />
        <SolidStar />
        <SolidStar />
        <SolidStar />
        <SolidStar />
      </div>
    );
  }

  if (rating > 6) {
    return (
      <div className="flex">
        <SolidStar />
        <SolidStar />
        <SolidStar />
        <SolidStar />
        <EmptyStar />
      </div>
    );
  }

  if (rating > 4) {
    return (
      <div className="flex">
        <SolidStar />
        <SolidStar />
        <SolidStar />
        <EmptyStar />
        <EmptyStar />
      </div>
    );
  }
  if (rating > 2) {
    return (
      <div className="flex">
        <SolidStar />
        <SolidStar />
        <EmptyStar />
        <EmptyStar />
        <EmptyStar />
      </div>
    );
  }

  return (
    <div className="flex">
      <SolidStar />
      <EmptyStar />
      <EmptyStar />
      <EmptyStar />
      <EmptyStar />
    </div>
  );
};

export default RatingStar;
