import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useCallback, useState } from "react";

interface ITitle {
  title: string;
  score: number;
  setScore: any;
}

const RCSlider: React.FC<ITitle> = ({ title, score, setScore }: ITitle) => {
  const { Handle } = Slider;
  // const [value, setValue] = useState(7);

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
          <p>{title}</p>
        </div>
        <div className="col-span-8 mt-1.5 px-6">
          <Slider min={0} max={10} defaultValue={score} handle={handle} />
        </div>
        <div className="ml-5">
          <p>{score}</p>
        </div>
      </div>
    </div>
  );
};

export default RCSlider;
