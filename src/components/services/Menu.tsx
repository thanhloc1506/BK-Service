import React from "react";

interface Action {
  name: string;
  price: number;
}

interface IMenu {
  actions: Action[];
}

const Menu: React.FC<IMenu> = ({ actions }: IMenu) => {
  return (
    <>
      <div className="pb-5 border-b-2 border-b-gray-100 ml-20">
        <p className="font-bold text-3xl ml-16">Dịch vụ</p>
      </div>
      {actions.map((aciton: Action, index: number) => (
        <div
          key={index}
          className="pb-5 border-b-2 border-b-gray-100 ml-20 mt-5 grid grid-cols-2"
        >
          <p className="font-light text-xl ml-16 flex justify-start">
            {aciton.name}
          </p>
          <p className="font-light text-xl ml-16 flex justify-end">
            {aciton.price + "d"}
          </p>
        </div>
      ))}
    </>
  );
};

export default Menu;
