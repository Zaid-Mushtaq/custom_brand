import React from "react";
import "../../sass/components/reuseable/checkbox.scss";

const CustomCheckbox = ({
  label,
  checked,
  onChange,
  customCheckboxClasses,
}) => {
  return (
    <div className={`custom-checkbox ${customCheckboxClasses[0]}`}>
      <label className={`__label ${customCheckboxClasses[1]}`}>
        <input
          className={`__input ${customCheckboxClasses[2]}`}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
