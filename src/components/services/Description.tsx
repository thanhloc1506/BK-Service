import React from "react";

interface IDescription {
  description: string;
}

const Description: React.FC<IDescription> = ({ description }: IDescription) => {
  return (
    <div className="flex justify-center pl-32 pt-6">
      <p className="font-light text-lg">{description}</p>
    </div>
  );
};

export default Description;
