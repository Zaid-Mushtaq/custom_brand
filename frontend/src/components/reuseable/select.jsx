import React, { useState, useRef, useEffect } from "react";
import "../../sass/components/reuseable/select.scss";
import { IoIosArrowDown } from "react-icons/io";

const CustomSelect = ({
  labelFor,
  label,
  placeholder,
  options,
  classes,
  withLabel,
  setSelectedQuantity,
  onChange,
}) => {
  const placeholderOption = { label: placeholder, value: null };
  const [selectedOption, setSelectedOption] = useState(placeholderOption.label);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef(null);
  const listRef = useRef(null);
  const liveRegionRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setHighlightedIndex(-1);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    if (setSelectedQuantity) {
      setSelectedQuantity(option);
    }
    if (onChange) {
      onChange(option); // Pass the selected value to the parent component
    }

    // liveRegionRef.current.textContent = `${option} selected`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (isDropdownOpen) {
        if (highlightedIndex !== -1) {
          handleOptionSelect(options[highlightedIndex]);
        }
      } else {
        setIsDropdownOpen(true);
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      if (isDropdownOpen) {
        const direction = e.key === "ArrowDown" ? 1 : -1;
        const newIndex = getValidIndex(
          highlightedIndex + direction,
          options.length
        );

        setHighlightedIndex(newIndex);
        focusOption(newIndex);
      } else {
        setIsDropdownOpen(true);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target) &&
      listRef.current &&
      !listRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const getValidIndex = (index, length) => {
    if (index < 0) {
      return length - 1;
    } else if (index >= length) {
      return 0;
    }
    return index;
  };

  const focusOption = (index) => {
    const option = listRef.current.querySelector(`#option-${index}`);
    if (option) {
      option.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`common-select ${classes[0]}`}
      ref={selectRef}
      aria-labelledby={labelFor}
      role="combobox"
      aria-expanded={isDropdownOpen}
      aria-haspopup="listbox"
    >
      {withLabel && (
        <label
          htmlFor={labelFor}
          className={`form-label common-label ${classes[1]}`}
        >
          {label}
        </label>
      )}
      <div
        className={`custom-select ${isDropdownOpen ? "open" : ""} ${
          classes[2]
        }`}
        onClick={handleToggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-labelledby={labelFor}
        role="button"
      >
        <div className={`selected-option" tabIndex={-1} ${classes[3]}`}>
          {selectedOption}
        </div>
        <div className={`dropdown-icon ${classes[4]}`}>
          <IoIosArrowDown />
        </div>
        {isDropdownOpen && (
          <ul
            className={`options-list ${classes[5]}`}
            role="listbox"
            aria-hidden={!isDropdownOpen}
            ref={listRef}
          >
            {options.map((option, index) => (
              <li
                key={index}
                id={`option-${index}`}
                onClick={() => handleOptionSelect(option.label)}
                // onClick={() => handleValueChange(option.label)}
                className={`option ${
                  index === highlightedIndex ? "highlighted" : ""
                } ${classes[6]}`}
                role="option"
                tabIndex={0}
                aria-selected={selectedOption === option.label}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <div
        ref={liveRegionRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      /> */}
    </div>
  );
};

export default CustomSelect;
