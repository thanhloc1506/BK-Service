import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useState } from "react";

interface ITitle {
  title: string;
}

const RCSlider: React.FC<ITitle> = ({ title }: ITitle) => {
  const { Handle } = Slider;
  const [value, setValue] = useState(9);

  const handle = (props: any) => {
    const { value, dragging, index, ...restProps } = props;
    setValue(value);
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
          <Slider min={0} max={10} defaultValue={9} handle={handle} />
        </div>
        <div className="ml-5">
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default RCSlider;
