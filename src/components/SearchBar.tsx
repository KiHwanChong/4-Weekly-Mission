import './SearchBar.css';
import searchIcon from '../assets/searchIcon.svg';
import closeIcon from '../assets/close.svg';
import { Dispatch } from 'react';

interface SearchBarProps {
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

function SearchBar({ setSearchQuery, searchQuery }: SearchBarProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  return (
    <div className='search-container'>
      <form className='search-form'>
        <label htmlFor='searchInput' className='hiddenLabel'>
          링크를 검색해 보세요.
        </label>
        <img src={searchIcon} alt='search' className='search' />
        <input
          type='text'
          id='searchInput'
          placeholder='링크를 검색해 보세요.'
          className='search-input'
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery.length > 0 && (
          <img
            src={closeIcon}
            alt='close'
            className='close'
            onClick={handleSearchClear}
          />
        )}
      </form>
    </div>
  );
}

export default SearchBar;
