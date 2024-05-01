import React from "react";
import "../../sass/components/reuseable/input.scss";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Input = ({
  labelFor,
  label,
  id,
  ariaDescribedBy,
  placeholder,
  classes,
  withLabel,
  type,
  showPasswordIcon,
  handleTogglePassword,
  value,
  readOnly,
  required = false,
  onChange,
  name,
  labelDisabled,
}) => {
  return (
    <>
      {withLabel && (
        <label
          htmlFor={labelFor}
          className={`form-label common-label ${classes[0]}`}
        >
          {label}
        </label>
      )}
      {labelDisabled ? (
        <input
          type={type}
          className={`form-control disabled-input ${classes[1]}`}
          id={id}
          aria-describedby={ariaDescribedBy}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          required={required}
          onChange={onChange}
          name={name}
          disabled={labelDisabled}
        />
      ) : (
        <input
          type={type}
          className={`form-control common-input ${classes[1]}`}
          id={id}
          aria-describedby={ariaDescribedBy}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
          name={name}
        />
      )}
      {showPasswordIcon && (
        <div
          className={`password-icon  ${classes[2]}`}
          onClick={handleTogglePassword}
        >
          {type === "password" ? (
            <IoEye className={`icon-eye ${classes[3]}`} />
          ) : (
            <IoEyeOff className={`icon-eye ${classes[3]}`} />
          )}
        </div>
      )}
    </>
  );
};

export default Input;
