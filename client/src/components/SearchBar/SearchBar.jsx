import { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ onSearch, placeholder }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <StyledSearchBar>
      <input
        type="search"
        value={name}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <button onClick={() => onSearch(name)}>🔎</button>
    </StyledSearchBar>
  );
};

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  input[type="search"] {
    border-radius: 10px;
    border: none;
    padding: 10px;
    margin-right: 10px;
    font-size: 16px;
    width: 200px;
  }
  input[type="search"]::placeholder {
    font-style: italic;
  }
  button {
    background-color: #630380;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  button:hover {
    background-color: gray;
  }
`;

export default SearchBar;
