import React, { Fragment, useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductSuggestion } from "../actions/productAction";

const Search = ({ handleCloseClick }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, suggestions } = useSelector(
    (state) => state.productSuggestion
  );

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/search/${keyword}`);
    } else {
      navigate("/");
    }
    handleCloseClick();
    dispatch({ type: "CLEAR_SUGGESTION" });
  };

  const handleSuggestionClick = (suggestion) => {
    handleCloseClick();
    navigate(`/product-detail/${suggestion._id}`);
    dispatch({ type: "CLEAR_SUGGESTION" });
    setKeyword("");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (keyword.trim()) {
      dispatch(getProductSuggestion(keyword));
    }
  }, [dispatch, keyword, error, alert]);

  return (
    <Fragment>
      <div className="searchContainer">
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search a Product..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" value="Search">
            <CiSearch className="icon" />
          </button>
        </form>
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion._id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <IoCloseOutline
          className="close-icon"
          onClick={() => {
            handleCloseClick();
          }}
        />
      </div>
    </Fragment>
  );
};

export default Search;
