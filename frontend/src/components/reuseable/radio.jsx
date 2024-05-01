import React from "react";
import "../../sass/components/reuseable/radio.scss";

const CustomRadio = ({ id, label, value, checked, onChange }) => {
  return (
    <div className="custom-radio">
      <input
        type="radio"
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label className="d-none" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CustomRadio;
