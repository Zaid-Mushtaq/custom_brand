// LocalsDropdown.js
import React, { useState, useRef, useEffect } from "react";
import Icons from "../static/icons";
import { useLocals } from "../../utils/locals";
import { useIntl } from "react-intl";

const LocalsDropdown = () => {
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);
  const { changeLocale } = useLocals();
  const intl = useIntl();

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setLanguageDropdownOpen(false);
    }
  };

  const handleLanguageChange = (language) => {
    changeLocale(language);
    setLanguageDropdownOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const adjustedWidth = windowWidth < 768 ? 24 : 24;
  const adjustedHeight = windowWidth < 768 ? 24 : 24;

  return (
    <div
      ref={dropdownRef}
      className={`language-dropdown ${isLanguageDropdownOpen ? "open" : ""}`}
    >
      <div
        className="dropdown-toggle"
        onClick={toggleLanguageDropdown}
        aria-expanded={isLanguageDropdownOpen}
      >
        <Icons.FlagIcon width={adjustedWidth} height={adjustedHeight} />
      </div>
      {isLanguageDropdownOpen && (
        <div className="dropdown-menu" aria-expanded={isLanguageDropdownOpen}>
          {/* Language options go here */}
          <div
            className="dropdown-item"
            onClick={() => handleLanguageChange("en")}
          >
            {intl.formatMessage({ id: "locale.en-US" })}
          </div>
          <div
            className="dropdown-item"
            onClick={() => handleLanguageChange("nl")}
          >
            {intl.formatMessage({ id: "locale.nl-NL" })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalsDropdown;
