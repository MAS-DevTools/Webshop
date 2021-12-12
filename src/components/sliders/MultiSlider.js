import "./MultiSlider.css";
import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames/bind";
import CSSProps from "../../data/constants/CSSProps";

const MultiSlider = ({ min, max, onChange, onMouseUp }) => {
  // Set the type of each prop
  MultiSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired
  };
  
  
  // Creating the state variables
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  // Creating the refs
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  /*
  if(min !== minVal)
  {
    setMinVal(min);
  }
  if(max !== maxVal)
  {
    setMaxVal(max);
  }
*/

  useEffect(()=>{
    setMinVal(min);
    setMaxVal(max);
  },[ min, max])

  
  console.log("Slider min >" + min +" max > "+max);
  console.log("Slider minVal >" + minVal +" maxVal > "+maxVal);
  console.log("Slider minValRef >" + minValRef.current +" maxValRef > "+maxValRef.current);
  // Convert to percentage
  const getPerctent = useCallback(
    (value) => {
      return Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPerctent(minVal);
      const maxPercent = getPerctent(maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
    
    console.log("useEffect1");
  }, [minVal, min, max, getPerctent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPerctent(minValRef.current.value);
      const maxPercent = getPerctent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
    console.log("useEffect2");
  }, [maxVal, min, max, getPerctent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
    console.log("useEffect3");
  }, [minVal, maxVal, onChange]);

  function ValueChanged() {
    console.log("value changed");
    onMouseUp({ min: minVal, max: maxVal });
  }

  return (
    <div className={CSSProps.MultiSlider.Area}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onMouseUp={(event) => {
          ValueChanged();
        }}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classnames(
          CSSProps.MultiSlider.Thumb + CSSProps.MultiSlider.ThumbZIndex3,
          CSSProps.MultiSlider.ThumbZIndex5 +
            {
              "": minVal > max - 100,
            }
        )}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onMouseUp={(event) => {
          ValueChanged();
        }}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className={
          CSSProps.MultiSlider.Thumb + CSSProps.MultiSlider.ThumbZIndex4
        }
      />

      <div className={CSSProps.MultiSlider.Slider}>
        <div className={CSSProps.MultiSlider.SliderTrack} />
        <div ref={range} className={CSSProps.MultiSlider.SliderRange} />
        <div className={CSSProps.MultiSlider.SliderLeftValue}>{minVal}</div>
        <div className={CSSProps.MultiSlider.SliderRightValue}>{maxVal}</div>
      </div>
    </div>
  );
};

export default MultiSlider;
