import React, { useState } from "react";
import './SearchForm.css'

/** Form for creating a new item to add to a list.
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const SearchForm = ({ search, type }) => {
  const [searchTerm, setSearchTerm] = useState("");

  /** Send {name, quantity} to parent
   *    & clear form. */

  const handleSubmit = evt => {
    evt.preventDefault();
    search(searchTerm);
    setSearchTerm("");
  };

  /** Update local state w/curr state of input elem */

  const handleChange = evt => {
    setSearchTerm(evt.target.value)
  };

  /** render form */

  return (
    <form onSubmit={handleSubmit} className="form-inline d-flex justify-content-center">
      <div className="form-group">
      <input
        id="search"
        name="search"
        type="text"
        className="form-control"
        placeholder={`Search ${type}`}
        value={searchTerm}
        onChange={handleChange}
      />
      </div>
      <button type="submit" class="btn btn-secondary ml-2">Search!</button>
      
    </form>
  );
};

export default SearchForm;