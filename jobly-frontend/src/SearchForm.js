import React, { useState } from "react";

/** Form for creating a new item to add to a list.
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const SearchForm = ({ search }) => {
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Search:</label>
      <input
        id="search"
        name="search"
        type="text"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search!</button>
    </form>
  );
};

export default SearchForm;