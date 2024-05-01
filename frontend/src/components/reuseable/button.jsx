import React, { useRef } from "react";
import PropTypes from "prop-types";
import "../../sass/components/reuseable/button.scss";
const buttonPropTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  customClasses: PropTypes.string,
  isSpinner: PropTypes.bool,
};
const buttonDefaultProps = {
  // onClick: () => {},
  disabled: false,
  customClasses: "",
  isSpinner: false,
};
const Button = ({
  label,
  onClick,
  disabled = false,
  customClasses,
  baseClasses,
  isSpinner,
  type = "button",
  referece = null,
}) => {
  const allClasses = `${baseClasses} ${customClasses}`;
  const buttonRef = useRef(referece);
  return (
    <button
      type={type}
      className={allClasses}
      onClick={onClick}
      disabled={disabled}
      referece={buttonRef}
    >
      {isSpinner ? <div className="spinner"></div> : label}
    </button>
  );
};

Button.propTypes = buttonPropTypes;
Button.defaultProps = buttonDefaultProps;
export const PrimaryButton = (props) => {
  const baseClasses = "btn primary-btn";
  return (
    <Button
      {...props}
      type={props.type}
      baseClasses={baseClasses}
      isSpinner={props.isSpinner}
    />
  );
};
export const SecondaryButton = (props, referece) => {
  const baseClasses = "btn secondary-btn";
  return <Button {...props} baseClasses={baseClasses} ref={referece} />;
};
export const TransparentButton = (props, referece) => {
  const baseClasses = "btn transparent-btn";
  return <Button {...props} baseClasses={baseClasses} ref={referece} />;
};
export const TransparentHoverButton = (props) => {
  const baseClasses = "btn transparent-hover-btn";
  return <Button {...props} baseClasses={baseClasses} />;
};
export const WhiteButton = (props, referece) => {
  const baseClasses = "btn white--btn";
  return <Button {...props} baseClasses={baseClasses} ref={referece} />;
};
