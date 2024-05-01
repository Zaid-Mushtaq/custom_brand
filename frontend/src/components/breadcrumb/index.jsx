import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../sass/components/breadcrumb.scss";
const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <nav
      aria-label="breadcrumb"
      className="product-breadcrumb d-md-block d-none"
    >
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => (
          <li key={index} className="breadcrumb-item">
            <Link
              to={`/product-list/${pathnames.slice(1, index + 1).join("/")}`}
              className="breadcrumb-link"
            >
              {name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumb;
