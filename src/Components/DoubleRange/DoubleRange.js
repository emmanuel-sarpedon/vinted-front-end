import "./DoubleRange.scss";

import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import formatPrice from "../../helpers/formatPrice";

const DoubleRange = (props) => {
  const { priceRange, onChange, min, max } = props;

  return (
    <div className="double-range-slider">
      <Range
        step={10}
        min={min}
        max={max}
        value={priceRange}
        onChange={onChange}
        dotStyle={{ backgroundColor: "red" }}
      />
      <span>
        Min : {formatPrice(priceRange[0])} - Max {formatPrice(priceRange[1])}
      </span>
    </div>
  );
};

export default DoubleRange;
