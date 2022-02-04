import React from "react";

interface IBreakcumb {
  addresses: string[];
}

const Breakcumb: React.FC<IBreakcumb> = ({ addresses }: IBreakcumb) => {
  return (
    <div className="flex justify-start mt-6">
      {addresses.map((address: string, index: number) => (
        <p className="font-medium text-gray-400 pr-1" key={index}>
          {address + " >>"}
        </p>
      ))}
    </div>
  );
};

export default Breakcumb;
