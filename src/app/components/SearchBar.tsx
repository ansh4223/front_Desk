import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

type SearchBarProps = {
  handleSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center border border-gray-300 p-2 rounded">
      <BsSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search client"
        className="outline-none"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;
