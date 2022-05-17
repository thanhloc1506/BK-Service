import React from "react";

interface IDescription {
  description: string;
}

const Description: React.FC<IDescription> = ({ description }: IDescription) => {
  return (
    <div className="flex justify-start pt-6">
      <p
        className="font-light 2xl:text-lg xl:text-sm lg:text-xs"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default Description;
