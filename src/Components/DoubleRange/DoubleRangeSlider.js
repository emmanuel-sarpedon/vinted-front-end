import "./DoubleRangeSlider.scss";

import { makeStyles } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    color: "#2cb1ba",
  },
});

const DoubleRangeSlider = (props) => {
  const { priceRange, onChange, min, max } = props;

  const classes = useStyles();

  return (
    <div className="double-range-slider">
      <Slider
        className={classes.root}
        value={priceRange}
        min={min}
        max={max}
        onChange={onChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
      />
    </div>
  );
};

export default DoubleRangeSlider;
