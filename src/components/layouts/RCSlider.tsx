import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useCallback, useEffect, useState } from "react";

interface ITitle {
  title: string;
  score: number;
  setScore: any;
}

const RCSlider: React.FC<ITitle> = ({ title, score, setScore }: ITitle) => {
  const { Handle } = Slider;

  useEffect(() => {}, []);

  const handleInputChange = useCallback(
    (value: any) => {
      setScore(value);
    },
    [setScore]
  );

  const handle = (props: any) => {
    const { value, dragging, index, ...restProps } = props;
    handleInputChange(value);
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} %`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };
  return (
    <div>
      <div className="px-5 pt-5 grid grid-cols-10">
        <div>
          <p className="2xl:text-[0.9rem] xl:text-[0.8rem] lg:text-[0.7rem]">
            {title}
          </p>
        </div>
        <div className="col-span-8 mt-1.5 px-6">
          <Slider min={0} max={10} defaultValue={score} handle={handle} />
        </div>
        <div className="ml-5">
          <p className="2xl:text-[1rem] xl:text-sm lg:text-xs">{score}</p>
        </div>
      </div>
    </div>
  );
};

export default RCSlider;
