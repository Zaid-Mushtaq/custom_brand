import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "../../sass/pages/notFound/notFound.scss";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon className="notFound-icon" />
      <Typography className="notFound-text">Page Not Found</Typography>
      <Link to="/" className="notFound-button">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
