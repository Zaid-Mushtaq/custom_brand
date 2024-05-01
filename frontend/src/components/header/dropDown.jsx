import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DropDown = ({
  title,
  imageSrc,
  items,
  onSelectCategory,
  setSearchOpen,
  categoryClass,
  mainCategory,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const columns = 3;
  const itemsPerColumn = Math.ceil(items.length / columns);

  useEffect(() => {
    setDropdownOpen(false);
  }, []);

  const handleDropdownClick = () => {
    setDropdownOpen(!isDropdownOpen);
    setSearchOpen(false);
  };
  return (
    <div className={`dropdown custom-dropdown ${categoryClass}`}>
      <div className="down-icon-container">
        <a
          className="btn dropdown-toggle"
          onClick={() => {
            onSelectCategory(title);
            setDropdownOpen(!isDropdownOpen);
            setSearchOpen(false);
          }}
          onMouseEnter={() => setDropdownOpen(true)}
          href="#"
          id="dropdownMenuButton"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          {title}
        </a>
        <FaChevronDown
          onClick={handleDropdownClick}
          className={`md-arrow-down-icon ${isDropdownOpen ? "open" : ""}`}
        />
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div className="row dropdown-main-row">
            <div
              className={`col-12 col-md-6 dropdown-main-columns ${categoryClass}`}
            >
              <div className="row dropdown-internal-row">
                {[...Array(columns)].map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className={`col-6 col-md-4  dropdown-internal-columns`}
                  >
                    <ul>
                      {items
                        .slice(
                          colIndex * itemsPerColumn,
                          (colIndex + 1) * itemsPerColumn
                        )
                        .map((item, index) => (
                          <li key={index}>
                            <Link
                              className="dropdown-item"
                              to={`/product-list/${mainCategory}/${item.toLowerCase()}`}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-md-6 d-md-block d-none dropdown-image-columns">
              <div className="dropdown-img">
                <div className="image-container">
                  <img src={imageSrc} className="img-fluid" alt="..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
