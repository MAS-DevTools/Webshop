import "./Dropdownlist.css";
import React, { useState } from "react";
import PropTypes from "prop-types";

const Dropdownlist = ({ data, inputValue, onChange }) => {
  Dropdownlist.propTpes = {
    data: PropTypes.array.isRequired,
    selectedValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const [value, setValue] = useState("");

  if (data === undefined || data === null || data.length === 0) {
    return <></>;
  }

  function GetSelectedValue() {
    if (value === undefined || value === null || value === "") {
      return "Maak een keuze";
    }
    return value;
  }

  function OnChange(event) {
    inputValue = event.target.value;
    setValue(inputValue);
  }

  return (
    <select
      className="dropdownlist"
      value={GetSelectedValue()}
      onChange={(e) => {
        OnChange(e);
        onChange(e.target.value);
      }}
    >
      <option value={""}>Maak een keuze</option>;
      {data.map((d, idx) => {
        return (
          <option key={idx} value={d}>
            {d}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdownlist;
